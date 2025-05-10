import React, { useEffect, useState } from "react";
import "./style.scss";
import { Button, Card, Col, Input, message, Row, Typography } from "antd";
import DetailTable from "../../components/detailTable";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { increment } from "../../redux/reducer/counterReducer";
import axios from "axios";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import { SyncLoader } from "react-spinners";
import HeaderAvatarCard from "../../components/header-avatar-card";
import ManageVaccineImage from "../../assets/images/manage-vaccine.png";
import { SearchOutlined } from "@ant-design/icons";
import debounce from "debounce";

const ManageVaccine: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const [vaccinationData, setVaccinationData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  const dispatch = useDispatch();
  const { Title } = Typography;

  const handleComplete = async (record: any) => {
    setSelectedId(record.id);
    setIsDeleteConfirmationVisible(true);
  };

  const handleDeleteModalOk = async () => {
    if (selectedId !== null) {
      try {
        setIsLoading(true);
        const res = await axios.delete(
          `http://localhost:3010/api/v1/pet-clinic/vaccination/delete/${selectedId}`
        );
        if (res.status === 200) {
          message.success("Vaccine done and removed.");
          await fetchData();
          setIsLoading(false);
          setIsDeleteConfirmationVisible(false);
        }
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    }
  };

  const fetchData = async () => {
    let list: any[] = [];
    try {
      const petCenterId = localStorage.getItem("petCenterId");
      setIsLoading(true);
      const querySnapshot = await axios.get(
        `http://localhost:3010/api/v1/pet-clinic/vaccination/${petCenterId}`
      );
      querySnapshot.data.forEach((doc: any) => {
        list.push({ ...doc });
      });
      setVaccinationData(list);
      setFilteredData(list);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteConfirmationVisible(false);
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "Pet Name",
      dataIndex: "PetName",
      key: "PetName",
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
    },
    {
      title: "Vaccine",
      dataIndex: "Vaccine",
      key: "Vaccine",
    },
  ];

  const debouncedSearch = debounce((value: string, allData: any[]) => {
    const filtered = allData.filter(
      (item: any) =>
        item.Email.toLowerCase().includes(value.toLowerCase()) ||
        item.PetName.toLowerCase().includes(value.toLowerCase()) ||
        item.Vaccine.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    debouncedSearch(value, vaccinationData);
  };

  useEffect(() => {
    fetchData();

    return () => {
      debouncedSearch.clear(); // Cleanup debounce on unmount
    };
  }, []);

  return (
    <div className="content-container">
      <HeaderAvatarCard
        title="Manage Vaccine"
        description="Keep your pet’s vaccinations up to date!"
        imageSrc={ManageVaccineImage}
      />

      <Card>
        <Row gutter={[16, 16]}>
          <Col span={10}>
            {/* <Card> */}
            <div
              className="input-container"
              style={{ display: "flex", gap: "8px", marginBottom: "20px" }}
            >
              <Input
                placeholder="Search by Email, Pet Name, or Vaccine"
                value={searchText}
                onChange={handleInputChange}
                prefix={<SearchOutlined />}
                allowClear
              />
            </div>
            {/* </Card> */}
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
            dataSource={filteredData}
            onCompleted={handleComplete}
          />
        )}
      </Card>

      <DeleteModal
        visible={isDeleteConfirmationVisible}
        onCancel={handleDeleteModalCancel}
        onConfirm={handleDeleteModalOk}
        title="Complete & Remove"
        description="Are you sure you want to mark this vaccination as done and remove it from the list?"
      />
    </div>
  );
};

export default ManageVaccine;
