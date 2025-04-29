import { CiLogout } from "react-icons/ci";
import Button from "../../ui/Button";
import { logout } from "../../auth/services/authService";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/auth/login", { replace: true });
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
