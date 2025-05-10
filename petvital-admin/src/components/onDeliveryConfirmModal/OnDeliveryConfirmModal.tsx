import React from "react";
import { Modal, Button } from "antd";

interface OnDeliveryConfirmModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const OnDeliveryConfirmModal: React.FC<OnDeliveryConfirmModalProps> = ({
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
        <h2 style={{ fontWeight: 600 }}>Confirm Delivery</h2>
        <p style={{ margin: "16px 0", fontSize: "16px", color: "#6B7280" }}>
          Are you sure you want to mark this order as out for delivery?
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
            backgroundColor: "#F59E0B", // amber/delivery-themed color
            color: "#fff",
            border: "none",
            fontWeight: 500,
          }}
        >
          Confirm Delivery
        </Button>
      </div>
    </Modal>
  );
};

export default OnDeliveryConfirmModal;
