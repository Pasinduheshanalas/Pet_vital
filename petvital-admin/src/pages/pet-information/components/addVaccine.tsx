import { DatePicker, Form, Input, Modal } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";

interface EditAccountProps {
  isVisible: boolean;
  setIsEditAccountModalVisible: (visible: boolean) => void;
  handleOk: (formData: any) => Promise<void>;
}

const AddVaccine: React.FC<EditAccountProps> = ({
  isVisible,
  setIsEditAccountModalVisible,
  handleOk,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); // Loader state

  const handleCancel = () => {
    setIsEditAccountModalVisible(false);
  };

  const dateFormat = "YYYY/MM/DD";

  const onFinish = async (values: any) => {
    setLoading(true); // Start loader
    console.log("Form Values:", values);
    try {
      await handleOk(values);
      form.resetFields();
      setIsEditAccountModalVisible(false);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <Modal
      title={<div style={{ marginBottom: "24px" }}>Add Vaccine</div>}
      width={"632px"}
      open={isVisible}
      okText="Add Vaccine"
      cancelText="Close"
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okButtonProps={{
        style: { backgroundColor: "#000080", color: "#FFFFFF" },
        loading, // Attach loader state to button
      }}
      cancelButtonProps={{
        style: { backgroundColor: "transparent", color: "#374151" },
      }}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker format={dateFormat} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="vaccineName"
          label="Vaccine Name"
          rules={[{ required: true, message: "Please enter a vaccine name" }]}
        >
          <Input
            placeholder="Vaccine Name"
            style={{ fontSize: "14px", borderRadius: "5px" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddVaccine;
