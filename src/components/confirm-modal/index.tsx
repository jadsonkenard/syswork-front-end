// components/ConfirmModal/ConfirmModal.tsx
import styles from "./Confirm-modal.module.css";

type ConfirmModalProps = {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  open,
  title = "Confirmar ação",
  description = "Tem certeza que deseja continuar?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className={styles["cm-overlay"]}>
      <div className={styles["cm-modal"]}>
        <h3>{title}</h3>
        <p>{description}</p>

        <div className={styles["cm-actions"]}>
          <button
            className={styles["cm-cancel"]}
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </button>

          <button
            className={styles["cm-confirm"]}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Processando..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
