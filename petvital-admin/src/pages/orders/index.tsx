import React, { useEffect, useState } from "react";
import "./style.scss";
import { Card, message, Spin, Tabs, Typography } from "antd";
import DetailTable from "../../components/detailTable";
import HeaderAvatarCard from "../../components/header-avatar-card";
import OrderImage from "../../assets/images/order-img.png";
import axios from "axios";
import ConfirmOrderModal from "../../components/confimOrderModal/ConfirmOrderModal";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../service/firebase/firebase-config";
import ProcessingOrderCompleteModal from "../../components/processingOrderCompleteModal/ProcessingOrderCompleteModal";
import OnDeliveryConfirmModal from "../../components/onDeliveryConfirmModal/OnDeliveryConfirmModal";
import RejectOrderModal from "../../components/rejectOrderModal/RejectOrderModal";

interface OrderType {
  id: string;
  [key: string]: any;
}

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Order Details",
    dataIndex: "orderDetails",
    key: "orderDetails",
    render: (text: string) => <span>{text}</span>,
  },
  {
    title: "Price",
    dataIndex: "Price",
    key: "Price",
  },
  {
    title: "Delivery Information",
    dataIndex: "type",
    key: "type",
  },
];

const Orders: React.FC = () => {
  const { Title } = Typography;

  const [activeKey, setActiveKey] = useState("1");
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [waitingOrders, setWaitingOrders] = useState<OrderType[]>([]);
  const [processingOrders, setProcessingOrders] = useState<OrderType[]>([]);
  const [readyOrders, setReadyOrders] = useState<OrderType[]>([]);
  const [completedOrders, setCompletedOrders] = useState<OrderType[]>([]);
  const [closedOrders, setClosedOrders] = useState<OrderType[]>([]);

  const [isOrderConfirmationVisible, setIsOrderConfirmationVisible] =
    useState(false);
  const [isOrderRejectVisible, setIsOrderRejectVisible] = useState(false);
  const [isOnDeliveryConfirmationVisible, setIsOnDeliveryConfirmationVisible] =
    useState(false);
  const [
    isOrderProcessingConfirmationVisible,
    setIsOrderProcessingConfirmationVisible,
  ] = useState(false);

  const getPetCenterId = () => localStorage.getItem("petCenterId");

  const formatOrders = (orders: any[]) => {
    return orders.map((order) => ({
      ...order,
      orderDetails:
        order.Details?.map((detail: any) => detail.ProductName).join(", ") ||
        "No products",
    }));
  };

  const fetchData = async (key: string) => {
    const petCenterId = getPetCenterId();
    if (!petCenterId) {
      message.error("Pet Center ID not found in local storage");
      return;
    }

    setLoading(true);

    try {
      const url = `http://localhost:3010/api/v1/pet-clinic/orders`;
      let response;

      switch (key) {
        case "1":
          response = await axios.get(`${url}/WAITING/${petCenterId}`);
          setWaitingOrders(formatOrders(response.data));

          break;
        case "2":
          response = await axios.get(`${url}/PROCESSING/${petCenterId}`);
          setProcessingOrders(formatOrders(response.data));
          break;
        case "3":
          response = await axios.get(`${url}/READY_TO_DELIVER/${petCenterId}`);
          setReadyOrders(formatOrders(response.data));
          break;
        case "4":
          response = await axios.get(`${url}/COMPLETED/${petCenterId}`);
          setCompletedOrders(formatOrders(response.data));
          break;
        case "5":
          response = await axios.get(`${url}/CLOSED/${petCenterId}`);
          setClosedOrders(formatOrders(response.data));
          break;
        default:
          break;
      }
    } catch (err) {
      message.error("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (key: string) => {
    setActiveKey(key);

    switch (key) {
      case "1":
        if (!waitingOrders.length) fetchData("1");
        break;
      case "2":
        if (!processingOrders.length) fetchData("2");
        break;
      case "3":
        if (!readyOrders.length) fetchData("3");
        break;
      case "4":
        if (!completedOrders.length) fetchData("4");
        break;
      case "5":
        if (!closedOrders.length) fetchData("5");
        break;
    }
  };

  const handleConfirmOrderModalOk = async () => {
    await updateDoc(doc(db, "Order", selectedOrderId), { State: "PROCESSING" });
    setIsOrderConfirmationVisible(false);
    fetchData(activeKey);
  };

  const handleConfirmProcessingOrderModalOk = async () => {
    await updateDoc(doc(db, "Order", selectedOrderId), {
      State: "READY_TO_DELIVER",
    });
    setIsOrderProcessingConfirmationVisible(false);
    fetchData(activeKey);
  };

  const handleConfirmOnDeliveryOrderModalOk = async () => {
    await updateDoc(doc(db, "Order", selectedOrderId), { State: "COMPLETED" });
    setIsOnDeliveryConfirmationVisible(false);
    fetchData(activeKey);
  };

  const handleRejectOrderModalOk = async () => {
    await updateDoc(doc(db, "Order", selectedOrderId), { State: "CLOSED" });
    setIsOrderRejectVisible(false);
    fetchData(activeKey);
  };

  const handleOrderActions = {
    onNew: (row: any) => {
      setIsOrderConfirmationVisible(true);
      setSelectedOrderId(row.id);
    },
    onProcessing: (row: any) => {
      setIsOrderProcessingConfirmationVisible(true);
      setSelectedOrderId(row.id);
    },
    onDelivery: (row: any) => {
      setIsOnDeliveryConfirmationVisible(true);
      setSelectedOrderId(row.id);
    },
    onReject: (row: any) => {
      setIsOrderRejectVisible(true);
      setSelectedOrderId(row.id);
    },
  };

  useEffect(() => {
    fetchData(activeKey);
  }, [activeKey]);

  console.log({ activeKey });

  return (
    <div className="content-container">
      <HeaderAvatarCard
        title="Orders"
        description="Track and manage your pet’s purchases seamlessly!"
        imageSrc={OrderImage}
      />
      <Card>
        <Tabs
          activeKey={activeKey}
          onChange={handleTabChange}
          className="custom-tabs"
          items={[
            {
              key: "1",
              label: "New Orders",
              children: (
                <Spin spinning={loading && activeKey === "1"}>
                  <DetailTable
                    columns={columns}
                    dataSource={waitingOrders}
                    onConfirm={handleOrderActions.onNew}
                    onReject={handleOrderActions.onReject}
                  />
                </Spin>
              ),
            },
            {
              key: "2",
              label: "Processing Orders",
              children: (
                <Spin spinning={loading && activeKey === "2"}>
                  <DetailTable
                    columns={columns}
                    dataSource={processingOrders}
                    onConfirm={handleOrderActions.onProcessing}
                    onReject={handleOrderActions.onReject}
                  />
                </Spin>
              ),
            },
            {
              key: "3",
              label: "On Delivery Orders",
              children: (
                <Spin spinning={loading && activeKey === "3"}>
                  <DetailTable
                    columns={columns}
                    dataSource={readyOrders}
                    onConfirm={handleOrderActions.onDelivery}
                    onReject={handleOrderActions.onReject}
                  />
                </Spin>
              ),
            },
            {
              key: "4",
              label: "Completed Orders",
              children: (
                <Spin spinning={loading && activeKey === "4"}>
                  <DetailTable
                    columns={columns}
                    dataSource={completedOrders}
                    onSuccuss={true}
                  />
                </Spin>
              ),
            },
            {
              key: "5",
              label: "Closed Orders",
              children: (
                <Spin spinning={loading && activeKey === "5"}>
                  <DetailTable
                    columns={columns}
                    dataSource={closedOrders}
                    onClose={true}
                  />
                </Spin>
              ),
            },
          ]}
        />
      </Card>

      {/* Modals */}
      <ConfirmOrderModal
        visible={isOrderConfirmationVisible}
        onConfirm={handleConfirmOrderModalOk}
        onCancel={() => setIsOrderConfirmationVisible(false)}
      />
      <ProcessingOrderCompleteModal
        visible={isOrderProcessingConfirmationVisible}
        onComplete={handleConfirmProcessingOrderModalOk}
        onCancel={() => setIsOrderProcessingConfirmationVisible(false)}
      />
      <OnDeliveryConfirmModal
        visible={isOnDeliveryConfirmationVisible}
        onConfirm={handleConfirmOnDeliveryOrderModalOk}
        onCancel={() => setIsOnDeliveryConfirmationVisible(false)}
      />
      <RejectOrderModal
        visible={isOrderRejectVisible}
        onConfirm={handleRejectOrderModalOk}
        onCancel={() => setIsOrderRejectVisible(false)}
      />
    </div>
  );
};

export default Orders;
