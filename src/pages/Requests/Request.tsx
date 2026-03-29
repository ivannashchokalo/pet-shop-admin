import {
  AllCommunityModule,
  type CellClassParams,
  type CellValueChangedEvent,
  type ICellRendererParams,
  type RowSelectionOptions,
  type ValueFormatterParams,
} from "ag-grid-community";
import { AgGridProvider } from "ag-grid-react";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "./Request.module.scss";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import type { Request } from "../../types/request";
import Modal from "../../components/Modal/Modal";
import {
  useDeleteRequestMutation,
  useGetRequestsQuery,
  useUpdateRequestMutation,
} from "../../services/requestsApi";
import Icon from "../../components/Icon/Icon";
import clsx from "clsx";

export default function Requests() {
  const modules = [AllCommunityModule];
  const gridRef = useRef<AgGridReact<Request>>(null);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const { data, isLoading, isError } = useGetRequestsQuery();
  const [updateRequest] = useUpdateRequestMutation();
  const [deleteRequest] = useDeleteRequestMutation();
  const [deletedId, setDeletedId] = useState<string | null>(null);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (data) {
      setRowData(data.map((item) => ({ ...item })));
    }
  }, [data]);

  const colDefs = [
    {
      field: "createdAt",

      sortable: true,
      valueFormatter: (params: ValueFormatterParams) =>
        new Date(params.value).toLocaleString(),
      comparator: (a: string, b: string) =>
        new Date(a).getTime() - new Date(b).getTime(),
    },
    { field: "customerName", filter: true },
    { field: "phone" },
    {
      field: "status",
      sortable: true,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["new", "contacted", "closed"],
      },

      filter: true,
      cellStyle: (params: CellClassParams) => {
        if (params.value === "new") {
          return { color: "blue", fontWeight: "bold" };
        }
        if (params.value === "contacted") {
          return { color: "orange", fontWeight: "bold" };
        }
        if (params.value === "closed") {
          return { color: "green", fontWeight: "bold" };
        }
      },
    },
    {
      headerName: "Detailes",
      cellRenderer: (params: ICellRendererParams) => {
        return (
          <button
            className={styles.viewDetailsBtn}
            type="button"
            disabled={!params.data.message}
            onClick={() => handleViewDetails(params.data.message)}
          >
            Message
          </button>
        );
      },
    },

    {
      headerName: "Actions",
      cellRenderer: (params: ICellRendererParams) => {
        return (
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={() => setDeletedId(params.data._id)}
          >
            Delete
          </button>
        );
      },
    },
  ];

  const defaultColDef = {
    flex: 1,
    resizable: false,
  };

  const handleViewDetails = (message?: string) => {
    if (!message) return;

    setSelectedMessage(message);
  };

  const handleValueChange = async (params: CellValueChangedEvent) => {
    if (params.colDef.field !== "status") return;
    if (params.oldValue === params.newValue) return;

    try {
      await updateRequest({
        _id: params.data._id,
        status: params.newValue,
      }).unwrap();

      toast.success("Updated successfully");
    } catch {
      toast.error("Update failed");
    }
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

  const rowSelection: RowSelectionOptions = {
    mode: "multiRow",
  };

  const handleBulkContacted = async () => {
    if (!gridRef.current) return;

    const selectedRows = gridRef.current.api.getSelectedRows();

    if (selectedRows.length === 0) {
      toast.error("No rows selected");
      return;
    }

    try {
      toast.loading("Updating...");

      await Promise.all(
        selectedRows.map((row) => {
          if (row.status === "contacted") return Promise.resolve();

          return updateRequest({
            _id: row._id,
            status: "contacted",
          }).unwrap();
        }),
      );

      toast.dismiss();
      toast.success("Updated successfully");
    } catch {
      toast.dismiss();
      toast.error("Some updates failed");
    }
  };

  const handleBulkClosed = async () => {
    if (!gridRef.current) return;

    const selectedRows = gridRef.current.api.getSelectedRows();

    if (selectedRows.length === 0) {
      toast.error("No rows selected");
      return;
    }

    try {
      toast.loading("Updating...");

      await Promise.all(
        selectedRows.map((row) => {
          if (row.status === "closed") return Promise.resolve();

          return updateRequest({
            _id: row._id,
            status: "closed",
          }).unwrap();
        }),
      );

      toast.dismiss();
      toast.success("Updated successfully");
    } catch {
      toast.dismiss();
      toast.error("Some updates failed");
    }
  };
  const handleBulkDelete = async () => {
    if (!gridRef.current) return;

    const selectedRows = gridRef.current.api.getSelectedRows();

    if (selectedRows.length === 0) {
      toast.error("No rows selected");
      return;
    }

    try {
      toast.loading("Deleting...");

      await Promise.all(
        selectedRows.map((row) => deleteRequest(row._id).unwrap()),
      );

      toast.dismiss();
      toast.success("Deleted successfully");
    } catch {
      toast.dismiss();
      toast.error("Some deletes failed");
    }
  };

  return (
    <>
      <Section>
        <Container>
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error!</p>}
          <Toaster />
          {data && (
            <AgGridProvider modules={modules}>
              <ul className={styles.btnsList}>
                <li className={styles.btnsItem}>
                  <button
                    className={styles.deleteBtn}
                    onClick={handleBulkDelete}
                  >
                    Delete
                  </button>
                </li>
                <li className={styles.btnsItem}>
                  <button onClick={handleBulkContacted}>
                    Mark as Contacted
                  </button>
                </li>
                <li className={styles.btnsItem}>
                  <button onClick={handleBulkClosed}>Mark as Closed</button>
                </li>
              </ul>
              <div
                className={styles["ag-theme-alpine"]}
                style={{ height: 700 }}
              >
                <AgGridReact
                  rowData={rowData}
                  columnDefs={colDefs}
                  defaultColDef={defaultColDef}
                  onCellValueChanged={handleValueChange}
                  rowSelection={rowSelection}
                  ref={gridRef}
                />
              </div>
            </AgGridProvider>
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
        <Modal onModalClose={() => setDeletedId(null)}>
          <Icon name="warning" size={40} className={styles.modalIcon} />
          <h2 className={styles.modalTitle}>Delete row</h2>
          <p className={styles.modalText}>
            Are you sure you want to delete this row?
          </p>
          <div className={styles.modalBtnsWrapper}>
            <button
              className={clsx(styles.modalBtn, styles.modalBtnCancel)}
              onClick={() => setDeletedId(null)}
            >
              Cancel
            </button>
            <button
              className={clsx(styles.modalBtn, styles.modalBtnDelete)}
              onClick={() => handleDelete(deletedId)}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
