import React from "react";
import { Table, Pagination, Avatar, Button, Tag } from "antd";
import { ColumnType } from "antd/es/table";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GoTrash } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { DownloadOutlined } from "@ant-design/icons";

interface ReusableTableProps<T> {
  columns: ColumnType<T>[];
  dataSource?: T[];
  sortableColumns?: string[];
  pageSize?: number;
  onEdit?: (record: T) => void;
  onDelete?: (record: T) => void;
  onConfirm?: any;
  icon?: React.ReactNode;
  onRowClick?: (record: T) => void;
  dollar?: React.ReactNode;
  page?: number;
  handlePaginationChange?: () => void;
  total?: number;
  tableOnchange?: any;
  yScrollBar?: boolean | undefined;
  onDownload?: (record: T) => void;
  loading?: boolean;
  permissionName?: string;
  onReject?: any;
  onReadyToDiliver?: (record: T) => void;
  onCompleted?: (record: T) => void;
  onSuccuss?: boolean;
  onClose?: boolean;
  approved?: boolean;
}

const DetailTable = <T extends { id: string | number }>({
  columns,
  dataSource,
  sortableColumns = [],
  pageSize,
  onEdit,
  onDelete,
  icon,
  dollar,
  onRowClick,
  page,
  handlePaginationChange,
  total,
  tableOnchange,
  yScrollBar,
  loading,
  onDownload,
  onConfirm,
  onReject,
  onReadyToDiliver,
  onCompleted,
  onSuccuss,
  approved,
  onClose,
}: ReusableTableProps<T>) => {
  const processedColumns: ColumnType<T>[] = columns.map((col, index) => ({
    ...col,
    sorter: sortableColumns.includes(col.dataIndex as string)
      ? (a: T, b: T) => {
          if (a[col.dataIndex as keyof T] < b[col.dataIndex as keyof T])
            return -1;
          if (a[col.dataIndex as keyof T] > b[col.dataIndex as keyof T])
            return 1;
          return 0;
        }
      : false,
    render: col.render ? col.render : (text) => (text ? text : "-"),
    fixed: index === 0 ? "left" : undefined,
  }));

  const actionColumn: ColumnType<T> = {
    title: "Actions",
    key: "actions",
    width: 100,
    render: (_, record) => (
      <div style={{ display: "flex", gap: "8px", cursor: "pointer" }}>
        {onEdit && (
          <FiEdit
            onClick={() => onEdit(record)}
            style={{ color: "#000080", fontSize: "15px" }}
          />
        )}
        {onDownload && (
          <DownloadOutlined
            style={{ fontSize: "20px" }}
            onClick={() => onDownload(record)}
          />
        )}
        {onDelete && (
          <GoTrash
            onClick={() => onDelete(record)}
            style={{ color: "red", fontSize: "15px" }}
          />
        )}
        {onConfirm && (
          <Button
            type="primary"
            style={{ backgroundColor: "#000080" }}
            onClick={() => onConfirm(record)}
          >
            Confirm
          </Button>
        )}
        {onReadyToDiliver && (
          <Button
            type="primary"
            style={{ backgroundColor: "#000080" }}
            onClick={() => onReadyToDiliver(record)}
          >
            Ready To Deliver
          </Button>
        )}
        {onReject && (
          <Button
            type="primary"
            style={{
              color: "#000080",
              background: "transparent",
              fontWeight: "500",
            }}
            onClick={() => onReject(record)}
          >
            Reject
          </Button>
        )}
        {onCompleted && (
          <Button
            type="primary"
            onClick={() => onCompleted(record)}
            style={{ backgroundColor: "#000080" }}
          >
            Complete
          </Button>
        )}
        {onSuccuss && <Tag color="success">Order Completed</Tag>}
        {onClose && <Tag color="error">Order Closed</Tag>}
        {approved && <Tag color="success">Approved</Tag>}
      </div>
    ),
  };

  const hasActions =
    onEdit ||
    onDelete ||
    onDownload ||
    onConfirm ||
    onReject ||
    onReadyToDiliver ||
    onCompleted ||
    onSuccuss ||
    onClose ||
    approved;

  const finalColumns: ColumnType<T>[] = [...processedColumns];
  if (hasActions) finalColumns.push(actionColumn);

  return (
    <div style={{ overflowX: "auto", overflowY: "hidden" }}>
      <Table<T>
        columns={finalColumns}
        dataSource={dataSource}
        pagination={false}
        rowKey="id"
        scroll={{ x: "max-content", y: yScrollBar ? 400 : undefined }}
        onRow={(record) => ({
          onClick: () => onRowClick?.(record),
          style: { cursor: "pointer" },
        })}
        onChange={tableOnchange}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <Pagination
          current={page}
          pageSize={pageSize}
          total={(total || 0) * 5}
          onChange={handlePaginationChange}
          showLessItems
          prevIcon={<IoIosArrowBack />}
          nextIcon={<IoIosArrowForward />}
        />
      </div>
    </div>
  );
};

export default DetailTable;
