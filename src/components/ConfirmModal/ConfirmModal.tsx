import styles from "./ConfirmModal.module.scss";
import Modal from "../../components/Modal/Modal";
import Icon from "../Icon/Icon";

interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal onModalClose={onCancel}>
      <Icon name="warning" size={40} className={styles.modalIcon} />

      <h2 className={styles.modalTitle}>{title}</h2>

      <p className={styles.modalText}>{message}</p>

      <div className={styles.modalBtnsWrapper}>
        <button className={styles.modalBtnCancel} onClick={onCancel}>
          Cancel
        </button>

        <button className={styles.modalBtnDelete} onClick={onConfirm}>
          Delete
        </button>
      </div>
    </Modal>
  );
}
