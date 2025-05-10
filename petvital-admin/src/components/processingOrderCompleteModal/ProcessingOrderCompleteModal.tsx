import React from "react";
import { Modal, Button } from "antd";

interface ProcessingOrderCompleteModalProps {
  visible: boolean;
  onCancel: () => void;
  onComplete: () => void;
  title?: string;
  message?: string;
  completeText?: string;
}

const ProcessingOrderCompleteModal: React.FC<
  ProcessingOrderCompleteModalProps
> = ({
  visible,
  onCancel,
  onComplete,
  title = "Complete Order",
  message = "Are you sure you want to mark this order as completed?",
  completeText = "Mark as Completed",
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
          onClick={onComplete}
          style={{
            backgroundColor: "#000080",
            color: "#fff",
            border: "none",
            fontWeight: 500,
          }}
        >
          {completeText}
        </Button>
      </div>
    </Modal>
  );
};

export default ProcessingOrderCompleteModal;
