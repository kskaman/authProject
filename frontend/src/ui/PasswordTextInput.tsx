import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import TextInput from "./TextInput";
import type { TextInputProps } from "./TextInput";

type PasswordTextInputProps = Omit<
  TextInputProps,
  "type" | "endIcon" | "placeholder"
>;

const PasswordTextInput = (props: PasswordTextInputProps) => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow((s) => !s);

  return (
    <TextInput
      {...props}
      type={show ? "text" : "password"}
      placeholder="Password"
      endIcon={
        show ? (
          <IoEyeOffOutline
            size={20}
            onClick={toggle}
            className="cursor-pointer"
          />
        ) : (
          <IoEyeOutline size={24} onClick={toggle} className="cursor-pointer" />
        )
      }
    />
  );
};

export default PasswordTextInput;
