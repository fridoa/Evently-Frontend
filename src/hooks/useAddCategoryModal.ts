import categoryService from "@/services/category.service";
import mediaService from "@/services/media.service";
import { ICategory, ICategoryForm } from "@/types/Category";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const addCategorySchema = yup.object().shape({
  name: yup.string().required("Nama kategori wajib diisi"),
  description: yup.string().required("Deskripsi kategori wajib diisi"),
  icon: yup.mixed().required("Icon kategori wajib diisi"),
});

const useAddCategoryModal = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addCategorySchema),
  });

  const uploadIcon = async (data: ICategoryForm) => {
    const formData = new FormData();
    formData.append("file", data.icon[0]);
    const {
      data: {
        data: { public_id: icon },
      },
    } = await mediaService.uploadFile(formData);

    return { name: data.name, description: data.description, icon };
  };

  const addCategory = async (payload: ICategory) => {
    const res = await categoryService.addCategory(payload);
    return res;
  };

  const {
    mutate: mutateAddCategory,
    isPending: isPendingMutateAddCategory,
    isSuccess: isSuccessMutateAddCategory,
  } = useMutation({
    mutationFn: addCategory,
    onError(error) {
      toast.error(error.message);
    },

    onSuccess: () => {
      toast.success("Kategori berhasil ditambahkan");
      reset();
    },
  });

  const { mutate: mutateAddFile, isPending: isPendingMutateAddFile } =
    useMutation({
      mutationFn: uploadIcon,
      onError(error) {
        toast.error(error.message);
      },

      onSuccess: (payload) => {
        mutateAddCategory(payload);
      },
    });

  const handleAddCategory = (data: ICategoryForm) => mutateAddFile(data);
  return {
    control,
    errors,
    handleAddCategory,
    handleSubmit,
    isPendingMutateAddCategory,
    isPendingMutateAddFile,
    isSuccessMutateAddCategory,
    reset,
  };
};

export default useAddCategoryModal;
