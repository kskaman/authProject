import { FormEventHandler, ReactNode } from "react";
import Button from "../../ui/Button";
import logoSrc from "../../assets/logoIcon.png";

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
      <div className="flex flex-row items-center justify-center gap-4">
        {/* logo on first line */}
        <img src={logoSrc} alt="Logo" className="w-16 md:w-16 h-auto" />
        <div className="flex flex-col items-center gap-2">
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
        </div>
      </div>

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
