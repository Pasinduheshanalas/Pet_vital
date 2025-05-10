import { Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface EditAccountProps {
  isVisible: boolean;
  setIsEditAccountModalVisible: (visible: boolean) => void;
  handleOk: (formData: any) => Promise<void>;
  petId: string;
}

interface Data {
  petId: string;
  specialRemarks: string;
  upcommingVdates: string;
  vaccinationHistory?: string;
}

const EditPetInformation: React.FC<EditAccountProps> = ({
  isVisible,
  setIsEditAccountModalVisible,
  handleOk,
  petId,
}) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false); // Loader state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3010/api/v1/pet-clinic/pet/by/petid/${petId}`
        );
        setData(response.data);
        form.setFieldsValue(response.data); // Populate form with fetched data
      } catch (error) {
        console.error("Error fetching pet data:", error);
      }
    };

    if (petId && isVisible) {
      fetchData();
    }
  }, [petId, isVisible, form]);

  const handleCancel = () => {
    setIsEditAccountModalVisible(false);
    form.resetFields();
  };

  const onFinish = async (values: Data) => {
    setLoading(true); // Start loader
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
      title={
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              borderBottom: "1px solid #E5E7EB",
              paddingBottom: "16px",
              fontSize: "18px",
            }}
          >
            Edit Pet Information
          </div>
        </div>
      }
      width={"632px"}
      open={isVisible}
      okText="Save Changes"
      cancelText="Close"
      cancelButtonProps={{
        style: { backgroundColor: "transparent", color: "#374151" },
      }}
      okButtonProps={{
        style: { backgroundColor: "#000080" },
        loading, // Attach loader state to button
      }}
      onCancel={handleCancel}
      onOk={() => form.submit()}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="vaccinationHistory" label="Vaccination History">
          <TextArea placeholder="Vaccination History" rows={6} />
        </Form.Item>
        <Form.Item name="specialRemarks" label="Special Remarks">
          <TextArea placeholder="Special Remarks" rows={6} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPetInformation;
