import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, message, Modal, Upload, UploadProps } from "antd";
import React, { useState } from "react";
import { v4 } from "uuid";
import { getStorage } from "firebase/storage";
import { app } from "../../../service/firebase/firebase-config"; // Ensure correct path
import { createClient } from "@supabase/supabase-js";

interface EditAccountProps {
  isVisible: boolean;
  setIsEditAccountModalVisible: (visible: boolean) => void;
  handleOk: (formData: any) => Promise<void>;
}

// Replace with your actual Supabase URL and public anon key
const supabase = createClient(
  "https://wkjxjkbsvgchzdvhlpnc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indranhqa2JzdmdjaHpkdmhscG5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3Mjk4MDAsImV4cCI6MjA2MzMwNTgwMH0.rsMbFQSppXMUV4tMAu8ughzAVb73XXXVe45CWq7p94E"
);

async function uploadImage(file: File): Promise<string | undefined> {
  const fileExt = file.name.split(".").pop();
  const filePath = `${Date.now()}.${fileExt}`;
  const { data, error } = await supabase.storage
    .from("images") // Bucket name
    .upload(filePath, file);
  if (error) {
    message.error("Upload error: " + error.message);
    return;
  }
  // Get public URL
  const { data: publicUrlData } = supabase.storage
    .from("images")
    .getPublicUrl(filePath);
  return publicUrlData.publicUrl;
}

const AddProduct: React.FC<EditAccountProps> = ({
  isVisible,
  setIsEditAccountModalVisible,
  handleOk,
}) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsEditAccountModalVisible(false);
  };

  const handleSubmit = async () => {
    const petCenterId = localStorage.getItem("petCenterId");
    try {
      const values = await form.validateFields();
      const formData = {
        ProductName: values.ProductName,
        ProductId: `D7DR${v4().substring(0, 5).toUpperCase()}`, // Example ProductId generation
        ProductImageUrl: imageUrl || "",
        Price: values.Price,
        Quantity: values.quantity,
        Status: "ACTIVE",
        _vpetclinic: petCenterId,
      };
      console.log("Payload:", formData);

      await handleOk(formData);
      setIsEditAccountModalVisible(false);
      form.resetFields();
      setImageUrl(undefined);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handleChange: UploadProps["onChange"] = async (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.originFileObj) {
      setLoading(true);
      const url = await uploadImage(info.file.originFileObj);
      if (url) {
        setImageUrl(url);
        message.success("Image uploaded successfully!");
      }
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add Product"
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
        <Form.Item label="Product Image">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={() => true}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          name="ProductName"
          label="Product Name"
          rules={[{ required: true, message: "Please input product name" }]}
        >
          <Input placeholder="Product Name" />
        </Form.Item>
        <Form.Item
          name="Price"
          label="Price"
          rules={[{ required: true, message: "Please input price" }]}
        >
          <Input placeholder="Price" type="number" />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true, message: "Please input quantity" }]}
        >
          <Input placeholder="Quantity" type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProduct;
