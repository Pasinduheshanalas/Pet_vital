import React from "react";
import { Modal, Button } from "antd";

interface RejectOrderModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const RejectOrderModal: React.FC<RejectOrderModalProps> = ({
  visible,
  onCancel,
  onConfirm,
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
        <h2 style={{ fontWeight: 600 }}>Reject Order</h2>
        <p style={{ margin: "16px 0", fontSize: "16px", color: "#6B7280" }}>
          Are you sure you want to reject this order? This action cannot be
          undone.
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
          danger
          style={{
            backgroundColor: "#DC2626", // red for reject
            color: "#fff",
            border: "none",
            fontWeight: 500,
          }}
        >
          Reject Order
        </Button>
      </div>
    </Modal>
  );
};

export default RejectOrderModal;
