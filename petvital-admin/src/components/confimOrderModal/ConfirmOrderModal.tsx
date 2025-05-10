import React from "react";
import { Modal, Button } from "antd";

interface ConfirmOrderModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
}

const ConfirmOrderModal: React.FC<ConfirmOrderModalProps> = ({
  visible,
  onCancel,
  onConfirm,
  title = "Confirm Order",
  message = "Are you sure you want to confirm this order?",
  confirmText = "Confirm Order",
}) => {
  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      centered
      closable={false}
      width={450}
    >
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontWeight: 600 }}>{title}</h2>
        <p style={{ margin: "16px 0", fontSize: "16px", color: "#6B7280" }}>
          {message}
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
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmOrderModal;
