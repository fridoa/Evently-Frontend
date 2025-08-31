import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILogin } from "@/types/Auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useState } from "react";

const loginSchema = yup.object().shape({
  identifier: yup.string().required("Email atau username wajib diisi"),
  password: yup.string().required("Password wajib diisi"),
});

export const useLogin = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const toogleVisibility = () => setIsVisible(!isVisible);

  const callbackUrl: string = (router.query.callbackUrl as string) || "/";

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginService = async (payload: ILogin) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl,
    });
    if (result?.error && result?.status === 401) {
      throw new Error("Email atau username salah");
    }
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError(error) {
      setError("root", {
        message: error.message,
      });
    },
    onSuccess: () => {
      router.push(callbackUrl);
      reset();
    },
  });

  const handleLogin = (data: ILogin) => mutateLogin(data);

  return {
    control,
    handleSubmit,
    handleLogin,
    errors,
    isPendingLogin,
    isVisible,
    toogleVisibility,
  };
};
