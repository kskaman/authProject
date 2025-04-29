import { Link, useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import TextInput from "../../ui/TextInput";
import Divider from "../../ui/Divider";
import AuthFormWrapper from "./AuthFormWrapper";
import PasswordTextInput from "../../ui/PasswordTextInput";

import { useState } from "react";
import ThirdPartyLogin from "./ThirdPartyLogin";
import { useAuth } from "../hooks/useAuth";
import {
  login as loginApi,
  me,
  resendVerification,
} from "../services/authService";
import { isAxiosError } from "axios";
import Button from "../../ui/Button";

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

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [msg, setMsg] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showVerifyLink, setShowVerifyLink] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setErrorMessage(null);
    setShowVerifyLink(false);
    setMsg(null);
    try {
      await loginApi(data);
      const { data: user } = await me();
      setUser(user);
      navigate("/app/dashboard", { replace: true });
    } catch (err) {
      if (isAxiosError(err)) {
        // backend sends { message: string }
        setErrorMessage(err.response?.data?.message ?? "Server error");
        // if 403 or 400 for unverified email:
        if (err.response?.status === 403) {
          setShowVerifyLink(true);
        }
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    }
  };

  const handleResend = async () => {
    try {
      await resendVerification(getValues("email"));
      setShowVerifyLink(false);
      setMsg("If your email is registered, a verification link has been sent.");
    } catch {
      setErrorMessage("Could not send verification email.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <AuthFormWrapper
        heading="Welcome"
        subHeading="Please log in to continue"
        buttonText={isSubmitting ? "Submitting..." : "Submit"}
        onFormSubmit={handleSubmit(onSubmit)}
      >
        <div className="h-8">
          {msg && (
            <p className="text-preset-5 text-(--warning-color) text-center">
              {msg}
            </p>
          )}
          {errorMessage && (
            <p className="text-preset-5 text-(--warning-color) text-center">
              {errorMessage}
            </p>
          )}
          {showVerifyLink && (
            <Button
              variant="text"
              onClick={handleResend}
              disabled={!getValues("email")}
            >
              Resend verification email
            </Button>
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

        {/* Password with “Forgot?” link */}
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PasswordTextInput
              value={field.value}
              onChange={field.onChange}
              label="Password"
              subLabel={
                <Link
                  to="/auth/forgot-password"
                  className="underline cursor-pointer 
                  text-preset-7 text-(--subheading-text-1)
                  hover:text-(--link-text-hover-color)"
                >
                  Forgot
                </Link>
              }
              error={error}
            />
          )}
        />
      </AuthFormWrapper>

      {/* Divider */}
      <Divider />

      {/* Social login */}
      <p className="text-preset-5 text-(--subheading-text-1) text-center">
        Or log in with
      </p>
      <ThirdPartyLogin />

      {/* Divider */}
      <Divider />

      {/* Sign up link */}
      <p className="text-preset-5 text-(--subheading-text-1) text-center">
        No account yet?{" "}
        <Link
          to="/auth/signup"
          className="
              cursor-pointer 
              text-preset-5 
              text-(--subheading-text-1)
              hover:text-(--link-text-hover-color)
              hover:font-medium
            "
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
