"use client";
import React, { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import LoadingButton from "./LoadingButton";

const FormSubmitButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { pending } = useFormStatus();

  return (
    <LoadingButton type="submit" loading={pending}>
      Filter a job
    </LoadingButton>
  );
};

export default FormSubmitButton;
