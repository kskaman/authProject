import { Navigate, useNavigate, useSearchParams } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isAxiosError } from "axios";

import TextInput from "../../ui/TextInput";
import AuthFormWrapper from "./AuthFormWrapper";

import { useState } from "react";
import { resetPassword as resetApi } from "../services/authService";

interface FormValues {
  newPassword: string;
  confirmPassword: string;
}

const schema = yup
  .object({
    newPassword: yup
      .string()
      .required("New password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@_])[A-Za-z\d#@_]{8,20}$/,
        "8-20 chars, upper, lower, digit & #@_"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Passwords must match")
      .required("Please confirm your password"),
  })
  .required();

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const sid = searchParams.get("sid") ?? "";
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  if (!sid) {
    return <Navigate to="/invalid" replace />;
  }

  const onSubmit = async (data: FormValues) => {
    setMessage(null);
    setErrorMessage(null);
    try {
      const res = await resetApi({ sid, newPassword: data.newPassword });
      setMessage(res.data.message);
      setTimeout(() => navigate("/auth/login"), 5000);
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setErrorMessage(err.response?.data?.message ?? "Reset failed");
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <AuthFormWrapper
        heading="Reset Your Password"
        subHeading="Enter a new password below"
        buttonText={isSubmitting ? "Resetting..." : "Reset Password"}
        onFormSubmit={handleSubmit(onSubmit)}
      >
        <div className="h-8">
          {message && (
            <p className="text-preset-5 text-(--success-color) text-center">
              {message}
            </p>
          )}
          {errorMessage && (
            <p className="text-preset-5 text-(--warning-color) text-center">
              {errorMessage}
            </p>
          )}
        </div>

        {/* New Password */}
        <Controller
          name="newPassword"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextInput
              {...field}
              type="password"
              label="New Password"
              placeholder="Enter new password"
              error={error}
            />
          )}
        />

        {/* Confirm */}
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextInput
              {...field}
              type="password"
              label="Confirm Password"
              placeholder="Confirm new password"
              error={error}
            />
          )}
        />
      </AuthFormWrapper>
    </div>
  );
};

export default ResetPassword;
