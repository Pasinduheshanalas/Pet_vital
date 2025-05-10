import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import "./style.scss";
import { Button, Card, Col, Input, Row, DatePicker, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { SyncLoader } from "react-spinners";
import HeaderAvatarCard from "../../components/header-avatar-card";
import HomeIcon from "../../assets/images/home-img.png";
import DetailTable from "../../components/detailTable";
import { useNavigate } from "react-router";
import { routeNames } from "../../routes/configuration";
import { auth } from "../../service/firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import debounce from "debounce"; // Import debounce from lodash

const { RangePicker } = DatePicker;

const NewFieldView: React.FC = () => {
  const { t } = useTranslation();

  const [userId, setUserId] = useState("");
  const [petList, setPetList] = useState([]);
  const [filteredPetList, setFilteredPetList] = useState([]); // State for filtered data
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState(""); // State for search input
  const { Title } = Typography;

  const navigate = useNavigate();

  const columns = [
    {
      title: "Pet Name",
      dataIndex: "PetName",
      key: "PetName",
    },
    {
      title: "Category",
      dataIndex: "Category",
      key: "Category",
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "Type",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  // Fetch data
  const fetchData = async () => {
    const petCenterId = localStorage.getItem("petCenterId");
    let list: any = [];
    try {
      setIsLoading(true);
      const querySnapshot = await axios.get(
        `http://localhost:3010/api/v1/pet-clinic/${petCenterId}`
      );
      querySnapshot.data.forEach((doc: any) => {
        list.push({ ...doc });
      });
      setPetList(list);
      setFilteredPetList(list); // Initialize filtered data
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  // Debounce function for search
  const handleSearch = useCallback(
    debounce((value: string) => {
      const lowercasedValue = value.toLowerCase();
      setFilteredPetList(
        petList.filter(
          (item: any) =>
            item.PetName.toLowerCase().includes(lowercasedValue) ||
            item.Category.toLowerCase().includes(lowercasedValue) ||
            item.Type.toLowerCase().includes(lowercasedValue) ||
            item.email.toLowerCase().includes(lowercasedValue)
        )
      );
    }, 300),
    [petList]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    handleSearch(value); // Call debounce function
  };

  useEffect(() => {
    // Check if the user is logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // If no user is logged in, navigate to the login page
        navigate(routeNames.LOGIN);
      }
    });

    fetchData();
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  const handleRowClick = (record: any) => {
    const petId = record.id; // Assuming record has an id field
    navigate(`${routeNames.PET_INFORMATION.replace(":petId", petId)}`);
  };

  return (
    <div className="content-container">
      <HeaderAvatarCard
        title="Home"
        description="Best home for pets!"
        imageSrc={HomeIcon}
      />
      <Row>
        <Col span={24}>
          <Card>
            <Row gutter={[16, 16]}>
              <Col span={10}>
                <div
                  className="input-container"
                  style={{ display: "flex", gap: "8px", marginBottom: "20px" }}
                >
                  <Input
                    placeholder="Search by Pet Name, Category, Type, or Email"
                    value={searchText}
                    onChange={handleInputChange}
                    prefix={<SearchOutlined />}
                    allowClear
                  />
                </div>
              </Col>
            </Row>
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
                dataSource={filteredPetList} // Use filtered data
                onRowClick={handleRowClick}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default NewFieldView;
