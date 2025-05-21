import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Upload,
  UploadProps,
} from "antd";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../../service/firebase/firebase-config"; // Ensure correct path
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import dayjs from "dayjs";

const API_BASE_URL = "http://localhost:3010/api/v1/pet-clinic"; // Replace with actual API

interface EditEventProps {
  isVisible: boolean;
  setIsEditEventModalVisible: (visible: boolean) => void;
  handleOk: (formData: any) => Promise<void>;
  initialValues: {
    id: string;
    EventName: string;
    Date: string;
    Remark: string;
  } | null;
}

const storage = getStorage(app);

const EditEvent: React.FC<EditEventProps> = ({
  isVisible,
  setIsEditEventModalVisible,
  handleOk,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const dateFormat = "YYYY/MM/DD";
  const [petCenterId, setPetCenterId] = useState<any>();

  useEffect(() => {
    setPetCenterId(localStorage.getItem("petCenterId"));
  }, []);

  useEffect(() => {
    if (isVisible && initialValues) {
      form.setFieldsValue({
        eventName: initialValues.EventName,
        date: initialValues.Date ? dayjs(initialValues.Date) : undefined,
        remark: initialValues.Remark,
      });
    } else {
      form.resetFields();
    }
  }, [isVisible, initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        id: initialValues?.id,
        EventName: values.eventName,
        Date: values.date.format("YYYY-MM-DD"),
        Remark: values.remark,
        _vpetclinic: petCenterId,
      };
      await handleOk(payload);
    } catch (error: any) {
      if (error.response) {
        message.error(
          `Error: ${error.response.data.message || "Failed to update event"}`
        );
      } else if (error.name === "Error") {
        // Form validation error
      } else {
        message.error("Unexpected error occurred");
      }
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsEditEventModalVisible(false);
  };

  return (
    <Modal
      title="Edit Event"
      width={"632px"}
      open={isVisible}
      okText="Save Changes"
      cancelText="Close"
      cancelButtonProps={{
        style: { backgroundColor: "transparent", color: "#374151" },
      }}
      okButtonProps={{ style: { backgroundColor: "#000080" } }}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          name="eventName"
          label="Event Name"
          rules={[{ required: true, message: "Please input event name" }]}
        >
          <Input placeholder="Event Name" />
        </Form.Item>
        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker format={dateFormat} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="remark" label="Special Remarks">
          <TextArea placeholder="Remarks" rows={6} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditEvent;
