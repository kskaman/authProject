import { Link } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import TextInput from "../../ui/TextInput";
import Divider from "../../ui/Divider";
import AuthFormWrapper from "./AuthFormWrapper";
import { useEffect, useState } from "react";

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

const VerifyEmail = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const RESEND_TIMEOUT = 120;
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { email: "" },
  });

  useEffect(() => {
    if (secondsLeft > 0) {
      const t = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [secondsLeft]);

  const onSubmit = (data: FormValues) => {
    console.log("Verify Email", data);
  };

  let buttonText = "Send Verification Email";
  if (isSending) buttonText = "Sending...";
  else if (secondsLeft > 0) buttonText = `Wait ${secondsLeft}s`;

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {(errorMessage || message) && (
        <div className="w-full max-w-[396px] mx-auto mb-2 text-center">
          {errorMessage && (
            <p className="text-preset-5 text-red-600">{errorMessage}</p>
          )}
          {message && <p className="text-preset-5 text-green-600">{message}</p>}
        </div>
      )}

      <AuthFormWrapper
        heading="Forgotten your password?"
        subHeading="Enter your email below, and we'll send you a link to reset it."
        buttonText={isSubmitting ? "Sending..." : buttonText}
        onFormSubmit={handleSubmit(onSubmit)}
      >
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
        Already verified?{" "}
        <Link
          to="/auth/login"
          className="
              cursor-pointer 
              text-preset-5 
              text-(--subheading-option-one-text)
            "
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default VerifyEmail;
