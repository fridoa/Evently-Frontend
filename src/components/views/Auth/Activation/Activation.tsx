import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

interface ActivationProps {
  status: "success" | "failed";
}

const Activation = (props: ActivationProps) => {
  const router = useRouter();
  const { status } = props;
  return (
    <div className="flex w-screen flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src="/images/general/logo.svg"
          alt="logo"
          width={180}
          height={180}
        />
        <Image
          src={
            status === "success"
              ? "/images/illustrations/success.svg"
              : "/images/illustrations/pending.svg"
          }
          alt="logo"
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h1 className="text-danger-500 text-3xl font-bold">
          {status === "success" ? "Activation Success" : "Activation Failed"}
        </h1>
        <p className="text-default-500 text-xl font-bold">
          {status === "success"
            ? "Thank you for register account in Evently"
            : "Confirmation code is invalid"}
        </p>
        <Button
          className="mt-4 w-fit"
          variant="bordered"
          color="danger"
          onClick={() => router.push("/")}
        >
          Back To Home
        </Button>
      </div>
    </div>
  );
};

export default Activation;
