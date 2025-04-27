import { CiLogout } from "react-icons/ci";
import Button from "../../ui/Button";
import { logout } from "../../auth/services/authService";
import { useNavigate } from "react-router";

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/auth/login");
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outlined"
      height="56px"
      icon={
        <span className="rounded-[50%] p-2">
          <CiLogout size={24} />
        </span>
      }
    >
      <span className="hidden sm:inline">Logout</span>
    </Button>
  );
};

export default LogoutButton;
