import { FormEventHandler, ReactNode } from "react";
import Button from "../../ui/Button";

interface Props {
  heading?: string;
  subHeading?: string;
  children: ReactNode;
  buttonText: string;
  onFormSubmit: FormEventHandler<HTMLFormElement>;
}
const AuthFormWrapper = ({
  heading,
  subHeading,
  children,
  buttonText,
  onFormSubmit,
}: Props) => {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Heading */}
      {heading && (
        <h1 className="text-preset-1 text-(--heading-text)">{heading}</h1>
      )}

      {/* Subheading */}
      {subHeading && (
        <h3 className="text-preset-5 text-(--subheading-text-1)">
          {subHeading}
        </h3>
      )}

      {/* Form */}
      <form className="w-full flex flex-col mt-4" onSubmit={onFormSubmit}>
        {children}

        {/* Login button */}
        <Button variant="primary" width="100%">
          {buttonText}
        </Button>
      </form>
    </div>
  );
};

export default AuthFormWrapper;
