import { Link } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import TextInput from "../../ui/TextInput";
import Divider from "../../ui/Divider";
import AuthFormWrapper from "./AuthFormWrapper";
import PasswordTextInput from "../../ui/PasswordTextInput";

import { useState } from "react";
import ThirdPartyLogin from "./ThirdPartyLogin";
import { signUpUser } from "../services/authService";
import { FirebaseError } from "firebase/app";

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
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@_])[A-Za-z\d#@_]{8,20}$/,
        "8-20 chars, upper, lower, digit & #@_"
      ),
  })
  .required();

const Signup = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await signUpUser(data.email, data.password);

      setSuccessMessage(
        "AccountCreated! Check your inbox to verify your email."
      );
      reset();
    } catch (err) {
      const error = err as FirebaseError;
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("This email is already in use.");
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage("Invalid email address.");
      } else if (error.code === "auth/weak-password") {
        setErrorMessage("Weak password. Please choose a stronger one.");
      } else {
        setErrorMessage("Sign-up failed. Please try again.");
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <AuthFormWrapper
        heading="Create Your Account"
        subHeading="Sign up to start organizing your notes and boost productivity"
        buttonText={isSubmitting ? "Submitting..." : "Submit"}
        onFormSubmit={handleSubmit(onSubmit)}
      >
        <div className="h-10">
          {(successMessage || errorMessage) && (
            <div className="w-full max-w-[396px] mx-auto">
              {successMessage && (
                <p className="text-preset-5 text-(--success-color) text-center">
                  {successMessage}
                </p>
              )}
              {errorMessage && (
                <p className="text-preset-5 text-(--warning-color) text-center">
                  {errorMessage}
                </p>
              )}
            </div>
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
              error={error}
            />
          )}
        />
      </AuthFormWrapper>

      {/* Divider */}
      <Divider />

      {/* Social login */}
      <p className="text-preset-5 text-(--subheading-text-1) text-center">
        Or sign up with
      </p>
      <ThirdPartyLogin />

      {/* Divider */}
      <Divider />

      {/* Sign up link */}
      <p className="text-preset-5 text-(--subheading-text-1) text-center">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="
              cursor-pointer 
              text-preset-5 
              text-(--subheading-option-one-text)
              hover:text-(--link-text-hover-color)
              hover:font-medium
            "
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
