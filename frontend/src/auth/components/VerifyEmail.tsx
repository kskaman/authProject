import { Link } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import TextInput from "../../ui/TextInput";
import Divider from "../../ui/Divider";
import AuthFormWrapper from "./AuthFormWrapper";
import { useEffect, useState } from "react";
import {
  logout,
  resendEmailVerification,
  signInUser,
} from "../services/authService";
import PasswordTextInput from "../../ui/PasswordTextInput";

interface FormValues {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Must be a valid email"),
    password: yup.string().required("Password is required"),
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
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: { email: "" },
  });

  useEffect(() => {
    if (secondsLeft > 0) {
      const t = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [secondsLeft]);

  const onSubmit = async (data: FormValues) => {
    if (isSending || secondsLeft > 0) return;
    setErrorMessage(null);
    setMessage(null);
    setIsSending(true);

    try {
      const uc = await signInUser(data.email, data.password);
      if (uc.user.emailVerified) {
        setMessage("Your email is already verified. You can sign in now.");
        await logout();
      } else {
        await resendEmailVerification(uc.user);
        setMessage("Verification email sent! Check your inbox.");
        setSecondsLeft(RESEND_TIMEOUT);
        await logout();
      }
    } catch {
      setErrorMessage("Unable to send verification. Try again later.");
    } finally {
      setIsSending(false);
    }
  };

  let buttonText = "Send Verification Email";
  if (isSending) buttonText = "Sending...";
  else if (secondsLeft > 0) buttonText = `Wait ${secondsLeft}s to resend`;

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <AuthFormWrapper
        heading="Resend Verification Email"
        subHeading="Enter your email below, and we'll resend verification link."
        buttonText={isSubmitting ? "Sending..." : buttonText}
        onFormSubmit={handleSubmit(onSubmit)}
      >
        {(errorMessage || message) && (
          <div className="w-full max-w-[396px] mx-auto text-center h-10">
            {errorMessage && (
              <p className="text-preset-5 text-red-600">{errorMessage}</p>
            )}
            {message && (
              <p className="text-preset-5 text-green-600">{message}</p>
            )}
          </div>
        )}
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

        {/* Password */}
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PasswordTextInput
              value={field.value}
              onChange={field.onChange}
              label="Password"
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
