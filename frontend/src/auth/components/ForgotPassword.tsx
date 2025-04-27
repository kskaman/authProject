import { Link } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import TextInput from "../../ui/TextInput";
import Divider from "../../ui/Divider";
import AuthFormWrapper from "./AuthFormWrapper";
import { useState } from "react";
import { forgotPassword } from "../services/authService";

interface FormValues {
  email: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Must be a valid email"),
  })
  .required();

const ForgotPassword = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setMessage(null);
    setErrorMessage(null);

    try {
      await forgotPassword(data.email);
      setMessage("If your email was registered, a reset link was sent");
      reset();
    } catch {
      setErrorMessage("Unable to process right now. Please try again.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <AuthFormWrapper
        heading="Forgotten your password?"
        subHeading="Enter your email below, and we'll send you a link to reset it."
        buttonText={isSubmitting ? "Sending..." : "Send Reset Link"}
        onFormSubmit={handleSubmit(onSubmit)}
      >
        <div className="h-10 w-full max-w-[396px] mx-auto text-center">
          {message && (
            <p className="text-preset-5 text-(--success-color)">{message}</p>
          )}
          {errorMessage && (
            <p className="text-preset-5 text-(--warning-color)">
              {errorMessage}
            </p>
          )}
        </div>

        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextInput
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              label="Email Address"
              placeholder="Enter your email"
              error={error}
            />
          )}
        />
      </AuthFormWrapper>

      {/* Divider */}
      <Divider />

      {/* Sign up link */}
      <p className="text-preset-5 text-(--subheading-text-1) text-center">
        Got The Password?{" "}
        <Link
          to="/auth/login"
          className="
              cursor-pointer 
              text-preset-5 
              text-(--subheading-text-1)
              hover:font-medium
              hover:text-(--link-text-hover-color)
            "
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
