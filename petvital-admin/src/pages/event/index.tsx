import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  Modal,
  message,
  Form, // ✅ Import Form
} from "antd";
import HeaderAvatarCard from "../../components/header-avatar-card";
import DetailTable from "../../components/detailTable";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./style.scss";
import AddEvent from "./components/addEvent";
import EditEvent from "./components/editEvent";
import axios from "axios";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import SyncLoader from "react-spinners/SyncLoader";

const Index: React.FC = () => {
  const [form] = Form.useForm(); // ✅ Add form instance here
  const [isAddEventModalVisible, setIsAddEventModalVisible] = useState(false);
  const [isEditEventModalVisible, setIsEditEventModalVisible] = useState(false);
  const [editEventInitialValues, setEditEventInitialValues] =
    useState<any>(null);
  const [eventData, setEventData] = useState([]);
  const [petCenterId, setPetCenterId] = useState<any>();
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState(false);
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);

  const fetchEvents = async (centerId = petCenterId) => {
    if (!centerId) return;
    try {
      const response = await axios.get(
        `http://localhost:3010/api/v1/pet-clinic/event/${centerId}`
      );
      setEventData(response.data);
    } catch (error) {
      message.error("Failed to fetch events");
    }
  };

  // 1. Load petCenterId from localStorage
  useEffect(() => {
    const storedId = localStorage.getItem("petCenterId");
    if (storedId) {
      setPetCenterId(storedId);
    }
  }, []);

  // 2. Fetch events when petCenterId is available
  useEffect(() => {
    if (!petCenterId) return;
    fetchEvents(petCenterId);
  }, [petCenterId]);

  const { Title } = Typography;

  const handleEdit = (row: any) => {
    setEditEventInitialValues(row);
    setIsEditEventModalVisible(true);
  };

  const handleEditEvent = async (payload: any) => {
    try {
      await axios.put(
        `http://localhost:3010/api/v1/pet-clinic/event/update/${payload.id}`,
        payload
      );
      message.success("Event updated successfully");
      setIsEditEventModalVisible(false);
      setEditEventInitialValues(null);
      fetchEvents(petCenterId);
    } catch (error) {
      message.error("Failed to update event");
    }
  };

  const handleDelete = (row: any) => {
    setDeleteEventId(row.id);
    setIsDeleteConfirmationVisible(true);
  };

  const handleDeleteModalOk = async () => {
    if (!deleteEventId) return;
    try {
      await axios.delete(
        `http://localhost:3010/api/v1/pet-clinic/event/delete/${deleteEventId}`
      );
      message.success("Event deleted successfully.");
      setEventData((prevData) =>
        prevData.filter((item: any) => item.id !== deleteEventId)
      );
      setIsDeleteConfirmationVisible(false);
      setDeleteEventId(null);
      fetchEvents(petCenterId);
    } catch (error) {
      message.error("Failed to delete event");
    }
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteConfirmationVisible(false);
    setDeleteEventId(null);
  };

  const handleAddEvent = async (payload: any) => {
    try {
      await axios.post(
        `http://localhost:3010/api/v1/pet-clinic/event/add`,
        payload
      );
      message.success("Event added successfully");
      form.resetFields(); // ✅ Reset the form after submission
      setIsAddEventModalVisible(false); // ✅ Fix the modal state setter name
      fetchEvents(petCenterId); // Always use the latest petCenterId
    } catch (error) {
      message.error("Failed to add event");
    }
  };

  const columns = [
    {
      title: "Event Name",
      dataIndex: "EventName",
      key: "EventName",
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
    },
    {
      title: "Remark",
      dataIndex: "Remark",
      key: "Remark",
    },
  ];

  return (
    <div className="content-container">
      <Row>
        <Col span={12}>
          <HeaderAvatarCard
            title="Events"
            description="Stay updated on upcoming pet-related events!"
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
            onClick={() => setIsAddEventModalVisible(true)}
            style={{
              backgroundColor: "#000080",
              borderRadius: "8px",
              padding: "8px 16px",
              fontSize: "14px",
              height: "auto",
              marginRight: "10px",
              width: "120px",
            }}
          >
            Add Event
          </Button>
        </Col>
      </Row>

      <Card>
        {eventData &&
          eventData.length === 0 &&
          !isAddEventModalVisible &&
          !isEditEventModalVisible &&
          !isDeleteConfirmationVisible && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0",
              }}
            >
              <SyncLoader size={12} />
            </div>
          )}
        {eventData && eventData.length > 0 ? (
          <DetailTable
            columns={columns}
            dataSource={eventData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : null}
      </Card>

      <AddEvent
        setIsEditAccountModalVisible={setIsAddEventModalVisible} // ✅ Corrected prop name
        isVisible={isAddEventModalVisible}
        handleOk={handleAddEvent}
        // form={form} // ✅ Pass form to the modal if needed
      />

      <EditEvent
        isVisible={isEditEventModalVisible}
        setIsEditEventModalVisible={setIsEditEventModalVisible}
        handleOk={handleEditEvent}
        initialValues={editEventInitialValues}
      />

      <DeleteModal
        visible={isDeleteConfirmationVisible}
        onCancel={handleDeleteModalCancel}
        onConfirm={handleDeleteModalOk}
        title="Delete Event"
        description="Are you sure you want to delete this event? This action cannot be undone."
      />
    </div>
  );
};

export default Index;
