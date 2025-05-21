import React, { useEffect, useState } from "react";

import "./style.scss";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Image,
  Input,
  List,
  message,
  Row,
  Table,
  Typography,
} from "antd";
import DetailTable from "../../components/detailTable";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { FiEdit } from "react-icons/fi";
import type { DescriptionsProps } from "antd";
import EditPetInformation from "./components/editPetInformation";
import AddVaccine from "./components/addVaccine";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import { SyncLoader } from "react-spinners";
import HeaderAvatarCard from "../../components/header-avatar-card";
import HomeIcon from "../../assets/images/petinfo-icon.png";
import { useParams } from "react-router";

interface PetBasicData {
  Category: string;
  PetName: string;
  Type: string;
  email: string;
  id: string;
  _vpetclinic: string;
  image: string;
}

interface PetData {
  petId: string;
  specialRemarks: string;
  upcommingVdates: string;
  vaccinationHistory?: any; // Update this with a more specific type if possible
}

interface VaccineData {
  id: string;
  Date: string;
  PetId: string;
  PetName: string;
  Vaccine: string;
}

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Pet Name",
    dataIndex: "petName",
    key: "petName",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
];

const Orders: React.FC = () => {
  const [isEditAccountModalVisible, setIsEditAccountModalVisible] =
    useState<boolean>(false);
  const [isAddVaccineModalVisible, setIsAddVaccineModalVisible] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [petCenterId, setPetCenterId] = useState<any>();
  const [petBasicData, setPetBasicData] = useState<PetBasicData>();
  const [vaccineData, setVaccineData] = useState<VaccineData[]>();
  const [petData, setPetData] = useState<PetData>();
  // const [petId, setPetId] = useState("");
  const { Title } = Typography;
  const { petId } = useParams<{ petId: any }>();
  const handleEditOk = async (formData: any) => {
    console.log({ formData });

    try {
      const res = await axios.put(
        `http://localhost:3010/api/v1/pet-clinic/pet-info/update/${petId}`,
        {
          vaccinationHistory: formData.vaccinationHistory,
          specialRemarks: formData.specialRemarks,
        }
      );
      if (res.status == 200) {
        message.success("Pet info updated successfully!");
        fetchPetBasicData();
      }
      // handleFunc();
    } catch (err) {
      console.log(`There is an error when updating pet info: ${err}`);
    }
  };

  useEffect(() => {
    setPetCenterId(localStorage.getItem("petCenterId"));
  }, [petId]);

  useEffect(() => {
    fetchPetBasicData();
  }, [petCenterId]);

  console.log({ petCenterId });

  const handleAddVaccine = async (formData: any) => {
    console.log({ formData });

    const data = {
      PetId: petId,
      PetName: petBasicData?.PetName,
      Date: formData.date.format("YYYY-MM-DD"),
      Vaccine: formData.vaccineName,
      Status: "UPCOMING",
      _vpetclinic: petCenterId,
      Email: petBasicData?.email,
    };

    try {
      const res = await axios.post(
        `http://localhost:3010/api/v1/pet-clinic/vaccination/add`,
        data
      );
      if (res.status === 200) {
        message.success("New vaccination date added successfully!");
        fetchPetBasicData();
        // handleFunc();
        // resetForm();
      }
    } catch (err) {
      console.log(
        `There is an error when adding upcoming vaccine date: ${err}`
      );
    }
  };

  //get data
  const fetchPetBasicData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:3010/api/v1/pet-clinic/pet/${petId}`
      );
      // list.push(response.data);
      setPetBasicData({
        ...response.data,
        image:
          "https://img.freepik.com/free-photo/portrait-cute-labrador-sitting-grass_23-2148345981.jpg?t=st=1739551081~exp=1739554681~hmac=e67c45d130ff00d171a1ade9ff7704e21a7b7d30ec1a2538b506381431c20a50&w=996",
      });
      console.log({ petBasicData });

      const response1 = await axios.get(
        `http://localhost:3010/api/v1/pet-clinic/pet/by/petid/${petId}`
      );
      // list1.push(response1.data);
      setPetData(response1.data);
      console.log({ petData });

      console.log({ petData });

      if (petCenterId) {
        const response2 = await axios.get(
          `http://localhost:3010/api/v1/pet-clinic/vaccination/${petCenterId}/${petId}`
        );

        setVaccineData(response2.data);
        console.log({ vaccineData });
      }

      setIsLoading(false);
    } catch (err) {
      console.log("*************");
      console.log(err);
      console.log("*************");
    }
  };

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Name",
      children: petBasicData?.PetName,
    },
    {
      key: "2",
      label: "Category",
      children: petBasicData?.Category,
    },
    {
      key: "3",
      label: "Type",
      children: petBasicData?.Type,
    },
    {
      key: "3",
      label: "Email",
      children: petBasicData?.email,
    },
  ];
  console.log({ vaccineData });

  return (
    <div className="content-container">
      {/* <Row> */}
      {/* <Title level={2}>Pet Information</Title> */}
      {/* </Row> */}

      <Row>
        <Col span={12}>
          <HeaderAvatarCard
            title="Pet Information"
            description="Keep track of pet’s details effortlessly!"
            imageSrc={HomeIcon}
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
            onClick={(e) => {
              // e.stopPropagation(); // Prevent row click from firing
              // onEdit(record);
              setIsEditAccountModalVisible(true);
            }}
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
            Edit Pet Details
          </Button>
        </Col>
      </Row>

      <Card style={{ marginTop: "16px" }}>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0",
            }}
          >
            <SyncLoader size={12} color="#000080" />
          </div>
        ) : (
          <Row>
            <Col span={12}>
              <Descriptions
                // style={{ fontWeight: "500" }}
                title="Pet Information"
                column={1}
                items={items}
              />
            </Col>
            <Col
              span={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Image
                style={{ borderRadius: "15px" }}
                width={400}
                src={petBasicData?.image}
              />
            </Col>
          </Row>
        )}
      </Card>
      <Row style={{ marginTop: "16px" }} gutter={16}>
        <Col span={10}>
          <Card title={"Vaccination History"} style={{ height: "100%" }}>
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "40px 0",
                }}
              >
                <SyncLoader size={12} color="#000080" />
              </div>
            ) : petData?.vaccinationHistory ? (
              <List
                dataSource={petData?.vaccinationHistory?.split(".")}
                renderItem={(item: any) => (
                  <List.Item>
                    <Typography.Text strong>{item}</Typography.Text>
                  </List.Item>
                )}
              />
            ) : (
              <Typography.Text strong>No vaccination history</Typography.Text>
            )}
          </Card>
        </Col>
        <Col span={14}>
          <Card title={"Special Remarks"} style={{ marginBottom: "10px" }}>
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "20px 0",
                }}
              >
                <SyncLoader size={12} color="#000080" />
              </div>
            ) : petData?.specialRemarks ? (
              <List
                dataSource={petData?.specialRemarks?.split(",")}
                renderItem={(item: any) => (
                  <List.Item>
                    <Typography.Text strong>{item}</Typography.Text>
                  </List.Item>
                )}
              />
            ) : (
              <Typography.Text strong>No special remarks</Typography.Text>
            )}
          </Card>
          <Card
            title={"UpComming Vaccination Dates"}
            extra={
              <Button
                type="primary"
                // icon={<PlusOutlined />}
                onClick={() => setIsAddVaccineModalVisible(true)}
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
                Add Vaccine
              </Button>
            }
          >
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "20px 0",
                }}
              >
                <SyncLoader size={12} color="#000080" />
              </div>
            ) : vaccineData ? (
              <List
                dataSource={vaccineData}
                renderItem={(data: any) => (
                  <List.Item>
                    <Typography.Text strong>{data.Vaccine}</Typography.Text>
                    <Typography.Text strong>{data.Date}</Typography.Text>
                  </List.Item>
                )}
              />
            ) : (
              <Typography.Text strong>
                No upcoming vaccination dates
              </Typography.Text>
            )}
          </Card>
        </Col>
      </Row>

      <EditPetInformation
        petId={petId}
        setIsEditAccountModalVisible={setIsEditAccountModalVisible}
        isVisible={isEditAccountModalVisible}
        // selectedAccountId={1}
        handleOk={handleEditOk}
      />
      <AddVaccine
        setIsEditAccountModalVisible={setIsAddVaccineModalVisible}
        isVisible={isAddVaccineModalVisible}
        // selectedAccountId={1}
        handleOk={handleAddVaccine}
      />
    </div>
  );
};

export default Orders;
