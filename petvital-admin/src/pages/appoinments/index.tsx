import React, { useEffect, useState, useCallback } from "react";
import debounce from "debounce";
import "./style.scss";
import { Card, Col, Input, message, Row, Tabs, Typography } from "antd";
import DetailTable from "../../components/detailTable";
import { SearchOutlined } from "@ant-design/icons";
import HeaderAvatarCard from "../../components/header-avatar-card";
import AppoinmentImage from "../../assets/images/appoinment.png";
import ConfirmModal from "../../components/confirmModal/ConfirmModal";
import axios from "axios";
import CompletedModal from "../../components/completedModal/completedModal";
import SyncLoader from "react-spinners/SyncLoader";

const columnsTab1 = [
  { title: "Id", dataIndex: "id", key: "id" },
  { title: "Pet Name", dataIndex: "PetName", key: "PetName" },
  { title: "Remarks", dataIndex: "Remarks", key: "Remarks" },
  { title: "Status", dataIndex: "Status", key: "Status" },
];

const columnsTab2 = [
  { title: "Id", dataIndex: "id", key: "id" },
  { title: "Pet Name", dataIndex: "PetName", key: "PetName" },
  { title: "Remarks", dataIndex: "Remarks", key: "Remarks" },
  // { title: "Status", dataIndex: "Status", key: "Status" },
];

const Appoinmets: React.FC = () => {
  const { Title } = Typography;
  const [activeTab, setActiveTab] = useState("1");

  const [isConfirmConfirmationVisible, setIsConfirmConfirmationVisible] =
    useState(false);
  const [isCompletedVisible, setIsCompletedVisible] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [completedId, setCompletedId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [appointmentData, setAppointmentData] = useState([]);
  const [approvedAppointmentData, setApprovedAppointmentData] = useState([]);
  const [filteredAppointmentData, setFilteredAppointmentData] = useState([]);
  const [filteredApprovedData, setFilteredApprovedData] = useState([]);
  const [searchTextTab1, setSearchTextTab1] = useState("");
  const [searchTextTab2, setSearchTextTab2] = useState("");

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleSearchTab1 = useCallback(
    debounce((value: string) => {
      const lowercasedValue = value.toLowerCase();
      setFilteredAppointmentData(
        appointmentData.filter(
          (item: any) =>
            (item.petName || "").toLowerCase().includes(lowercasedValue) ||
            (item.Remarks || "").toLowerCase().includes(lowercasedValue) ||
            (item.Status || "").toLowerCase().includes(lowercasedValue)
        )
      );
    }, 300),
    [appointmentData]
  );

  const handleSearchTab2 = useCallback(
    debounce((value: string) => {
      const lowercasedValue = value.toLowerCase();
      setFilteredApprovedData(
        approvedAppointmentData.filter(
          (item: any) =>
            (item.petName || "").toLowerCase().includes(lowercasedValue) ||
            (item.Remarks || "").toLowerCase().includes(lowercasedValue) ||
            (item.Status || "").toLowerCase().includes(lowercasedValue)
        )
      );
    }, 300),
    [approvedAppointmentData]
  );

  const handleInputChangeTab1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTextTab1(value);
    handleSearchTab1(value);
  };

  const handleInputChangeTab2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTextTab2(value);
    handleSearchTab2(value);
  };

  const fetchData = async () => {
    let list: any = [];
    try {
      const petCenterId = localStorage.getItem("petCenterId");
      setIsLoading(true);
      const querySnapshot = await axios.get(
        `http://localhost:3010/api/v1/pet-clinic/appointment/pending/${petCenterId}`
      );
      if (querySnapshot.status !== 200) {
        message.info(querySnapshot.statusText);
        setAppointmentData([]);
        setIsLoading(false);
      } else {
        querySnapshot.data.forEach((doc: any) => {
          list.push({ ...doc });
        });
        setAppointmentData(list);
        setFilteredAppointmentData(list);
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      setAppointmentData([]);
      setFilteredAppointmentData([]);
      setIsLoading(false);
    }
  };

  const fetchApprovedAppoinmentData = async () => {
    let list: any = [];
    try {
      const petCenterId = localStorage.getItem("petCenterId");
      setIsLoading(true);
      const querySnapshot = await axios.get(
        `http://localhost:3010/api/v1/pet-clinic/appointment/approved/${petCenterId}`
      );
      if (querySnapshot.status !== 200) {
        message.info(querySnapshot.statusText);
        setApprovedAppointmentData([]);
        setFilteredApprovedData([]);
        setIsLoading(false);
      } else {
        querySnapshot.data.forEach((doc: any) => {
          list.push({ ...doc });
        });
        setApprovedAppointmentData(list);
        setFilteredApprovedData(list);
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      setApprovedAppointmentData([]);
      setFilteredApprovedData([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "1") {
      fetchData();
    } else if (activeTab === "2") {
      fetchApprovedAppoinmentData();
    }
  }, [activeTab]);

  const handleConfirm = (record: any) => {
    setSelectedId(record.id);
    setIsConfirmConfirmationVisible(true);
  };

  const handleCompleted = (record: any) => {
    setCompletedId(record.id);
    setIsCompletedVisible(true);
  };

  const handleConfirmModalOk = async () => {
    if (selectedId !== null) {
      try {
        setIsLoading(true);
        const res = await axios.put(
          `http://localhost:3010/api/v1/pet-clinic/appointment/approve/${selectedId}`
        );
        if (res.status === 200) {
          message.success("Appoinment Approved!");
          await fetchData();
          setIsLoading(false);
          setIsConfirmConfirmationVisible(false);
        }
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    }
  };

  const handleCompletedModalOk = () => {
    setIsCompletedVisible(false);
    message.success("Appointment marked as completed!");
  };

  const handleConfirmModalCancel = () => {
    setIsConfirmConfirmationVisible(false);
  };

  const handleCompetedModalCancel = () => {
    setIsCompletedVisible(false);
  };

  return (
    <div className="content-container">
      <HeaderAvatarCard
        title="Appoinments"
        description="Schedule and manage pet’s visits with ease!"
        imageSrc={AppoinmentImage}
      />
      <Card>
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          className="custom-tabs"
          items={[
            {
              key: "1",
              label: "Appoinmets",
              children: (
                <>
                  <Row gutter={[16, 16]}>
                    <Col span={10}>
                      <div
                        className="input-container"
                        style={{
                          display: "flex",
                          gap: "8px",
                          marginBottom: "20px",
                        }}
                      >
                        <Input
                          placeholder="Search Appoinments"
                          value={searchTextTab1}
                          onChange={handleInputChangeTab1}
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
                      columns={columnsTab1}
                      dataSource={filteredAppointmentData}
                      onConfirm={handleConfirm}
                    />
                  )}
                  <ConfirmModal
                    visible={isConfirmConfirmationVisible}
                    onCancel={handleConfirmModalCancel}
                    onConfirm={handleConfirmModalOk}
                  />
                </>
              ),
            },
            {
              key: "2",
              label: "Accepted Appoinmets",
              children: (
                <>
                  <Row gutter={[16, 16]}>
                    <Col span={10}>
                      <div
                        className="input-container"
                        style={{
                          display: "flex",
                          gap: "8px",
                          marginBottom: "20px",
                        }}
                      >
                        <Input
                          placeholder="Search Appoinments"
                          value={searchTextTab2}
                          onChange={handleInputChangeTab2}
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
                      columns={columnsTab2}
                      dataSource={filteredApprovedData}
                      approved={true}
                    />
                  )}
                  <CompletedModal
                    visible={isCompletedVisible}
                    onCancel={handleCompetedModalCancel}
                    onCompleted={handleCompletedModalOk}
                  />
                </>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default Appoinmets;
