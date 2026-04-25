import mediaService from "@/services/media.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useMediaHandling = () => {
  const uploadMedia = async (
    file: File,
    callback: (fileUrl: string) => void,
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    const {
      data: {
        data: { public_id: icon },
      },
    } = await mediaService.uploadFile(formData);
    callback(icon);
  };

  const { mutate: mutateUploadFile, isPending: isPendingMutateUploadFile } =
    useMutation({
      mutationFn: (variables: {
        file: File;
        callback: (publicId: string) => void;
      }) => uploadMedia(variables.file, variables.callback),
      onError(error) {
        toast.error(error.message);
      },
    });

  const deleteMedia = async (publicId: string, callback: () => void) => {
    const res = await mediaService.deleteFile({ publicId });
    if (res.data.meta.status === 200) {
      callback();
    }
  };

  const { mutate: mutateDeleteFile, isPending: isPendingMutateDeleteFile } =
    useMutation({
      mutationFn: (variables: { publicId: string; callback: () => void }) =>
        deleteMedia(variables.publicId, variables.callback),
      onError(error) {
        toast.error(error.message);
      },
    });

  return {
    mutateUploadFile,
    mutateDeleteFile,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
  };
};

export default useMediaHandling;
