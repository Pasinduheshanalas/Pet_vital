import React from "react";
import { Modal, Button } from "antd";

interface DeleteModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<DeleteModalProps> = ({
  visible,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      centered
      closable={false}
      width={450}
    >
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontWeight: 600 }}>Confirm</h2>
        <p style={{ margin: "16px 0", fontSize: "16px", color: "#6B7280" }}>
          Are you sure you want to complete the Are you sure to confirm this
          appointment?
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "24px",
        }}
      >
        <Button onClick={onCancel} style={{ fontWeight: 500 }}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          style={{
            backgroundColor: "#000080",
            color: "#fff",
            border: "none",
            fontWeight: 500,
          }}
        >
          Complete & Remove
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
