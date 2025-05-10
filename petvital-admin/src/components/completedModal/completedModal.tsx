import React from "react";
import { Modal, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

interface CompletedModalProps {
  visible: boolean;
  onCancel: () => void;
  onCompleted: () => void;
}

const CompletedModal: React.FC<CompletedModalProps> = ({
  visible,
  onCancel,
  onCompleted,
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
        <CheckCircleOutlined style={{ fontSize: "48px", color: "#28a745" }} />
        <h2 style={{ fontWeight: 600, marginTop: "16px" }}>Completed</h2>
        <p style={{ margin: "16px 0", fontSize: "16px", color: "#6B7280" }}>
          The selected vaccine has been successfully completed and removed.
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
          onClick={onCompleted}
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

export default CompletedModal;
