import Button from "../../ui/Button";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router";
import { signInWithGithub, signInWithGoogle } from "../services/authService";
import { FirebaseError } from "firebase/app";

const ThirdPartyLogin = () => {
  const navigate = useNavigate();

  const handle = async (provider: "google" | "github") => {
    try {
      if (provider === "google") await signInWithGoogle();
      else await signInWithGithub();

      //  go straight to dashboard
      navigate("/app/dashboard");
    } catch (err) {
      const error = err as FirebaseError;
      console.error(error);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center gap-4 w-full">
      <Button
        variant="outlined"
        width="100%"
        onClick={() => handle("google")}
        icon={<FaGoogle />}
      >
        Google
      </Button>
      <Button
        variant="outlined"
        width="100%"
        onClick={() => handle("github")}
        icon={<FaGithub />}
      >
        Github
      </Button>
    </div>
  );
};

export default ThirdPartyLogin;
