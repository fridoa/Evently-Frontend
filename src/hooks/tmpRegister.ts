import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/Auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import authServices from "@/services/auth.service";

const registerSchema = yup.object().shape({
  fullName: yup.string().required("Fullname wajib diisi"),
  username: yup
    .string()
    .required("Username wajib diisi")
    .min(3, "Username minimal 3 karakter"),
  email: yup
    .string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
  password: yup
    .string()
    .min(6, "Password minimal 6 karakter")
    .max(20, "Paddword maksimal 20 karakter")
    .required("Password wajib diisi"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), " "], "Konfirmasi password tidak sesuai")
    .required("Konfirmasi password wajib diisi"),
});

export const useRegister = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerService = async (payload: IRegister) => {
    return await authServices.register(payload);
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onError(error) {
      setError("root", {
        message: error.message,
      });
    },
    onSuccess: () => {
      router.push("/auth/register/success");
      reset();
    },
  });

  const handleRegister = (data: IRegister) => mutateRegister(data);

  return {
    control,
    handleSubmit,
    handleRegister,
    errors,
    isPendingRegister,
  };
};
