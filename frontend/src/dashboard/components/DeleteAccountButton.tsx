import { useNavigate } from "react-router";
import Button from "../../ui/Button";
import { FaRegTrashCan } from "react-icons/fa6";
import { deleteAccount } from "../../auth/services/authService";
import { useAuth } from "../../auth/hooks/useAuth";

const DeleteAccountButton = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirm) return;

    try {
      await deleteAccount();
      setUser(null);
      navigate("/auth/login", { replace: true });
    } catch (err) {
      console.error("Error deleting account", err);
      alert("Failed to delete account.");
    }
  };

  return (
    <Button
      onClick={handleDelete}
      variant="warning"
      icon={
        <span className="rounded-[50%] p-2">
          <FaRegTrashCan size={24} />
        </span>
      }
    >
      <span>Delete Account</span>
    </Button>
  );
};

export default DeleteAccountButton;
