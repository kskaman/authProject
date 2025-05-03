import { useNavigate } from "react-router";
import Button from "../../ui/Button";
import { FaRegTrashCan } from "react-icons/fa6";
import { deleteAccount } from "../../auth/services/authService";
import { useAuth } from "../../auth/hooks/useAuth";
import useModal from "../../hooks/useModal";
import Modal from "../../ui/Modal";

const DeleteAccountButton = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const { isOpen, openModal, closeModal } = useModal();

  const handleDelete = async () => {
    try {
      await deleteAccount();
      setUser(null);
      navigate("/auth/login", { replace: true });
    } catch (err) {
      console.error("Error deleting account", err);
      alert("Failed to delete account.");
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <Button
        onClick={openModal}
        variant="warning"
        icon={
          <span className="rounded-[50%] p-2">
            <FaRegTrashCan size={24} />
          </span>
        }
      >
        <span>Delete Account</span>
      </Button>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          title="Delete Account?"
          description={`Are you sure you want to permanently 
            delete this note? This action cannot be undone.`}
          confirmText="Confirm"
          cancelText="Cancel"
          onConfirm={handleDelete}
          onClose={closeModal}
          isWarning={true}
        />
      )}
    </>
  );
};

export default DeleteAccountButton;
