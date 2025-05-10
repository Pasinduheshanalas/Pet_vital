import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, message, Modal, Upload, UploadProps } from "antd";
import React, { useState } from "react";
import { v4 } from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../../service/firebase/firebase-config"; // Ensure correct path
import { log } from "console";

interface EditAccountProps {
  isVisible: boolean;
  setIsEditAccountModalVisible: (visible: boolean) => void;
  handleOk: (formData: any) => Promise<void>;
}

const storage = getStorage(app); // Ensure Firebase app is passed

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
        Status: "Active",
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

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
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
      const file = info.file.originFileObj;
      try {
        // const storageRef = ref(storage, `images/${file.name + v4()}`);
        // const storageRef = ref(storage, `images/${selectedImage.name + v4()}`);
        // await uploadBytes(storageRef, file);
        // const url = await getDownloadURL(storageRef);
        setImageUrl(
          "https://www.petshopdirect.com.au/auto/thumbnail/auto/sb-plugin-gopix/homeBanner/pet_shop_direct_banner_1.jpg?maxwidth=1480&type=jpeg"
        );
        message.success("Image uploaded successfully!");
      } catch (error) {
        message.error("Upload failed!");
      } finally {
        setLoading(false);
      }
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
            beforeUpload={beforeUpload}
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
