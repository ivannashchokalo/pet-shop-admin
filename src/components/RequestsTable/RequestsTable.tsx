import { AllCommunityModule } from "ag-grid-community";
import type {
  CellClassParams,
  CellValueChangedEvent,
  ICellRendererParams,
  RowSelectionOptions,
  ValueFormatterParams,
} from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  useDeleteRequestMutation,
  useUpdateRequestMutation,
} from "../../services/requestsApi";
import styles from "./RequestsTable.module.scss";
import type { Request } from "../../types/request";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

interface RequestTableProps {
  data: Request[];
  onViewDetails: (message: string) => void;
  onDeleteRequest: (id: string) => void;
}

export default function RequestsTable({
  data,
  onViewDetails,
  onDeleteRequest,
}: RequestTableProps) {
  const modules = [AllCommunityModule];
  const gridRef = useRef<AgGridReact<Request>>(null);

  const [updateRequest] = useUpdateRequestMutation();
  const [deleteRequest] = useDeleteRequestMutation();

  // RTK Query data can be readonly in development.
  // Create mutable copies for AG Grid editing.
  const rowData = useMemo(() => data.map((item) => ({ ...item })), [data]);

  const [selectedCount, setSelectedCount] = useState(0);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);

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
          return { color: "#3b82f6", fontWeight: "bold" };
        }
        if (params.value === "contacted") {
          return { color: "#ffc107", fontWeight: "bold" };
        }
        if (params.value === "closed") {
          return { color: "#64748b", fontWeight: "bold" };
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
            onClick={() => onViewDetails(params.data.message)}
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
            onClick={() => onDeleteRequest(params.data._id)}
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

  const rowSelection: RowSelectionOptions = {
    mode: "multiRow",
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
        selectedRows
          .filter((row) => row.status !== "contacted")
          .map((row) =>
            updateRequest({
              _id: row._id,
              status: "contacted",
            }).unwrap(),
          ),
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

  const getSelectedRows = () => {
    if (!gridRef.current) return [];

    return gridRef.current.api.getSelectedRows();
  };

  return (
    <>
      {isBulkDeleteOpen && (
        <ConfirmModal
          title="Delete selected requests"
          message={`Are you sure you want to delete ${selectedCount} selected requests?`}
          onCancel={() => setIsBulkDeleteOpen(false)}
          onConfirm={async () => {
            await handleBulkDelete();
            setIsBulkDeleteOpen(false);
          }}
        />
      )}
      <AgGridProvider modules={modules}>
        <ul className={styles.btnsList}>
          <li className={styles.btnsItem}>
            <button
              className={styles.deleteBtn}
              onClick={() => {
                const selectedRows = getSelectedRows();

                if (selectedRows.length === 0) {
                  toast.dismiss();
                  toast.error("No rows selected");
                  return;
                }

                setSelectedCount(selectedRows.length);
                setIsBulkDeleteOpen(true);
              }}
            >
              Delete
            </button>
          </li>
          <li className={styles.btnsItem}>
            <button onClick={handleBulkContacted}>Mark as Contacted</button>
          </li>
          <li className={styles.btnsItem}>
            <button onClick={handleBulkClosed}>Mark as Closed</button>
          </li>
        </ul>
        <div className={styles["ag-theme-alpine"]} style={{ height: 700 }}>
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
    </>
  );
}
