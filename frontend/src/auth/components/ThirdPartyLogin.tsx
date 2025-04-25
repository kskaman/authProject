import Button from "../../ui/Button";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const ThirdPartyLogin = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-4 w-full">
      <Button
        variant="outlined"
        width="100%"
        onClick={() => console.log("Google")}
        icon={<FaGoogle />}
      >
        Google
      </Button>
      <Button
        variant="outlined"
        width="100%"
        onClick={() => console.log("Github")}
        icon={<FaGithub />}
      >
        Github
      </Button>
    </div>
  );
};

export default ThirdPartyLogin;
