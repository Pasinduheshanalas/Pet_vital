import React, { useEffect, useState } from "react";
import "./style.scss";
import { Button, Card, Col, message, Row, Typography } from "antd";
import DetailTable from "../../components/detailTable";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchDataRequest } from "./redux/reducer/productSlice";
import { useDispatch } from "react-redux";
import AddProduct from "./components/addProduct";
import HeaderAvatarCard from "../../components/header-avatar-card";
import ProductImage from "../../assets/images/product-img.png";
import axios from "axios";
import EditProduct from "./components/editProduct";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import { log } from "node:console";
import SyncLoader from "react-spinners/SyncLoader";

const Products: React.FC = () => {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.product
  );

  const [isLoading, setIsLoading] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [product, setProduct] = useState([]);
  const [isEditVisible, setISEditVisible] = useState(false);
  const [productName, setIsProductName] = useState<string>("");
  const [productId, setIsProductId] = useState<string>("");
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState<boolean>(false);

  const [isAddProductModalVisible, setIsAddProductModalVisible] =
    useState<boolean>(false);
  const dispatch = useDispatch();
  const { Title } = Typography;
  const handleEdit = (row: any) => {
    console.log({ row });

    setISEditVisible(true);
    setIsProductName(row.ProductName);
    setIsProductId(row.id);
    // fetchProductsByName();
  };
  const handleDelete = (record: any) => {
    setIsDeleteConfirmationVisible(true);
    setIsProductId(record.id);
  };
  const handleDeleteModalCancel = () => {
    setIsDeleteConfirmationVisible(false);
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "ProductName",
      key: "ProductName",
    },
    {
      title: "Product Image",
      dataIndex: "ProductImageUrl",
      key: "ProductImageUrl",
      render: (url: string) =>
        url ? (
          <img
            src={url}
            alt="Product"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
          />
        ) : (
          <span>No Image</span>
        ),
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",
    },
  ];

  const handleDeleteModalOk = async () => {
    console.log("Product ID:", productId);

    if (productId) {
      try {
        setIsLoading(true);
        const res = await axios.delete(
          `http://localhost:3010/api/v1/pet-clinic/product/delete/${productId}`
        );
        if (res.status === 200) {
          message.success("Product deleted successfully.");
          await fetchProductsData();
          setIsDeleteConfirmationVisible(false);
        }
      } catch (err) {
        console.error("Delete Error:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const data1 = [
    {
      id: 1,
      productName: "Dog Shampoo",
      productImage: "https://example.com/dog-shampoo.jpg",
      price: 12.99,
      quentity: 50,
    },
    {
      id: 2,
      productName: "Cat Food - Chicken Flavor",
      productImage: "https://example.com/cat-food.jpg",
      price: 19.99,
      quentity: 100,
    },
    {
      id: 3,
      productName: "Pet Carrier Bag",
      productImage: "https://example.com/pet-carrier.jpg",
      price: 35.99,
      quentity: 20,
    },
    {
      id: 4,
      productName: "Rabbit Hay Feeder",
      productImage: "https://example.com/rabbit-hay.jpg",
      price: 15.49,
      quentity: 30,
    },
    {
      id: 5,
      productName: "Fish Tank Filter",
      productImage: "https://example.com/fish-filter.jpg",
      price: 22.89,
      quentity: 15,
    },
    {
      id: 6,
      productName: "Bird Cage Swing",
      productImage: "https://example.com/bird-swing.jpg",
      price: 8.99,
      quentity: 40,
    },
  ];

  console.log("Product:", product);

  //get data
  const fetchProductsData = async () => {
    let list: any = [];
    try {
      const petCenterId = localStorage.getItem("petCenterId");
      setIsLoading(true);
      const querySnapshot = await axios.get(
        `http://localhost:3010/api/v1/pet-clinic/products/${petCenterId}`
      );
      if (querySnapshot.status != 200) {
        message.info(querySnapshot.statusText);
        setProductsData([]);
        setIsLoading(false);
      } else {
        querySnapshot.data.forEach((doc: any) => {
          list.push({ ...doc });
        });
        setProductsData(list);
        setIsLoading(false);
      }
    } catch (err) {
      console.log("*************");
      console.log(err);
      console.log("*************");
      setProductsData([]);
      // toast.info("There are no pending appointments", {
      //   position: "bottom-right",
      // });
      setIsLoading(false);
    }
  };

  const handleEditOk = async (formData: any) => {
    try {
      const petCenterId = localStorage.getItem("petCenterId");
      const payload = {
        ...formData,
        _vpetclinic: petCenterId,
      };
      console.log("Payload:", payload);
      const response = await axios.put(
        `http://localhost:3010/api/v1/pet-clinic/product/update/${productId}`,
        payload
      );
      if (response.status == 200) {
        message.success("Product updated successfully");
        fetchProductsData();
      } else {
        message.error("Failed to update product");
      }
    } catch (error) {
      console.error("Failed to update product:", error);
      message.error("Failed to update product");
    }
    setISEditVisible(false);
  };

  const handleAddProduct = async (formData: any) => {
    try {
      const petCenterId = localStorage.getItem("petCenterId");
      const payload = {
        ...formData,
        _vpetclinic: petCenterId,
      };
      console.log("Payload:", payload);
      const response = await axios.post(
        `http://localhost:3010/api/v1/pet-clinic/product/create`,
        payload
      );
      if (response.status == 200) {
        message.success("Product added successfully");
        fetchProductsData();
      } else {
        message.error("Failed to add product");
      }
    } catch (error) {
      console.error("Failed to add product:", error);
      message.error("Failed to add product");
    }
    setIsAddProductModalVisible(false);
  };

  useEffect(() => {
    fetchProductsData();
  }, []);
  console.log({ data });

  console.log({ product });

  return (
    <div className="content-container">
      <Row>
        <Col span={12}>
          <HeaderAvatarCard
            title="Products"
            description="Find the best essentials for your pet!"
            imageSrc={ProductImage}
          />
        </Col>
        <Col
          span={12}
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            type="primary"
            // icon={<PlusOutlined />}
            onClick={() => setIsAddProductModalVisible(true)}
            style={{
              backgroundColor: "#000080",
              // borderColor: "#ffffff",
              // color: "#000000",
              borderRadius: "8px",
              padding: "8px 16px",
              fontSize: "14px",
              height: "auto",
              marginRight: "10px",
              width: "120px",
            }}
          >
            Add Product
          </Button>
        </Col>
      </Row>
      <Card>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0",
            }}
          >
            <SyncLoader size={12} />
          </div>
        ) : (
          <DetailTable
            columns={columns}
            dataSource={productsData}
            onEdit={handleEdit}
            onDelete={handleDelete}
            // onDelete={handleDelete}
            // onDownload={handleDownload}
            // onRowClick={handleRowClick}
          />
        )}
      </Card>
      <AddProduct
        setIsEditAccountModalVisible={setIsAddProductModalVisible}
        isVisible={isAddProductModalVisible}
        // selectedAccountId={1}
        handleOk={handleAddProduct}
      />
      <EditProduct
        isVisible={isEditVisible}
        setIsEditProductModalVisible={setISEditVisible}
        handleOk={handleEditOk}
        productName={productName}
      />
      <DeleteModal
        visible={isDeleteConfirmationVisible}
        onCancel={handleDeleteModalCancel}
        onConfirm={handleDeleteModalOk}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
      />
    </div>
  );
};

export default Products;
