import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "./Request.module.scss";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import Modal from "../../components/Modal/Modal";
import {
  useDeleteRequestMutation,
  useGetRequestsQuery,
} from "../../services/requestsApi";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import RequestsTable from "../../components/RequestsTable/RequestsTable";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

export default function Requests() {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const { data, isLoading, isError } = useGetRequestsQuery();
  const [deletedId, setDeletedId] = useState<string | null>(null);
  const [deleteRequest] = useDeleteRequestMutation();

  const handleViewDetails = (message?: string) => {
    if (!message) return;

    setSelectedMessage(message);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteRequest(id).unwrap();
      setDeletedId(null);
      toast.success("Deleted successfully");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <Section>
        <Container>
          {isLoading && <Loader />}
          {isError && <ErrorMessage />}
          <Toaster />
          {data && (
            <RequestsTable
              data={data}
              onViewDetails={handleViewDetails}
              onDeleteRequest={setDeletedId}
            />
          )}
        </Container>
      </Section>
      {selectedMessage && (
        <Modal onModalClose={() => setSelectedMessage(null)}>
          <h2 className={styles.modalTitle}>Customer message</h2>
          <p className={styles.modalText}>{selectedMessage}</p>
          <button
            className={styles.modalCloseBtn}
            type="button"
            onClick={() => setSelectedMessage(null)}
          >
            Close
          </button>
        </Modal>
      )}
      {deletedId && (
        <ConfirmModal
          title="Delete row"
          message="Are you sure you want to delete this row?"
          onConfirm={() => handleDelete(deletedId)}
          onCancel={() => setDeletedId(null)}
        />
      )}
    </>
  );
}
