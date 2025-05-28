import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, message, Modal, Upload, UploadProps } from "antd";
import React, { useEffect, useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../../service/firebase/firebase-config";
import axios from "axios";

interface EditProductProps {
  isVisible: boolean;
  setIsEditProductModalVisible: (visible: boolean) => void;
  handleOk: (formData: any) => Promise<void>;

  productName: string;
}

interface productData {
  ProductName: string;
  Price: string;
  Quantity: string;
  Status: string;
}

const storage = getStorage(app);

const EditProduct: React.FC<EditProductProps> = ({
  isVisible,
  setIsEditProductModalVisible,
  handleOk,
  productName,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<productData[]>([]);

  console.log({ productName });

  console.log({ product });

  //get data
  const fetchProductsByName = async () => {
    let list: any = [];
    try {
      console.log("===================fetchProductsByName===================");

      const petCenterId = localStorage.getItem("petCenterId");
      setIsLoading(true);
      const querySnapshot = await axios.get(
        `http://localhost:3010/api/v1/pet-clinic/product/${productName}`
      );
      if (querySnapshot.status != 200) {
        message.info(querySnapshot.statusText);
        setProduct([]);
        setIsLoading(false);
      } else {
        querySnapshot.data.forEach((doc: any) => {
          list.push({ ...doc });
        });
        setProduct(list);
        setIsLoading(false);
      }
    } catch (err) {
      console.log("*************");
      console.log(err);
      console.log("*************");
      setProduct([]);
      // toast.info("There are no pending appointments", {
      //   position: "bottom-right",
      // });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsByName();
  }, [productName]);

  console.log({ product });

  useEffect(() => {
    if (product && product.length > 0) {
      form.setFieldsValue({
        ProductName: product[0].ProductName,
        Price: product[0].Price,
        Quantity: product[0].Quantity,
      });
    }
  }, [product, form]);

  const handleCancel = () => {
    setIsEditProductModalVisible(false);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = {
        ProductName: values.ProductName,
        Price: values.Price,
        Quantity: values.Quantity,
        Status: "ACTIVE",
      };
      await handleOk(formData);
      setIsEditProductModalVisible(false);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title="Edit Product"
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
          name="Quantity"
          label="Quantity"
          rules={[{ required: true, message: "Please input quantity" }]}
        >
          <Input placeholder="Quantity" type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProduct;
