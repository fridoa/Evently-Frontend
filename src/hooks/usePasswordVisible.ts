import { useState } from "react";

export const usePasswordVisible = () => {
  const [visiblePassword, setVisiblePassword] = useState({
    password: "false",
    confirmPassword: "false",
  });

  const handleVisiblePassword = (key: "password" | "confirmPassword") => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };
  return {
    visiblePassword,
    handleVisiblePassword,
  };
};
