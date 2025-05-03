import Button from "./Button";
import Divider from "./Divider";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  isWarning?: boolean;
}

const Modal = ({
  isOpen,
  title = "Are you sure?",
  description,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isWarning = false,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 
        flex items-center justify-center
        bg-(--modal-overlay)"
    >
      <div
        className="rounded-[12px] 
          max-w-sm w-full p-5 
          bg-(--modal-bg)
          border border-[1px] border-solid
          border-(--modal-border)
          space-y-5
          "
      >
        <div>
          <h3 className="text-preset-3 mb-2 text-(--heading-text)">{title}</h3>
          {description && (
            <p className="text-preset-5 text-(--body-text-2)">{description}</p>
          )}
        </div>

        <Divider />

        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={onClose}>
            {cancelText}
          </Button>
          <Button
            variant={isWarning ? "warning" : "primary"}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
