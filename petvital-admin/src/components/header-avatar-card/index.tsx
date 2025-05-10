import React, { useEffect, useState } from "react";

import type { MenuProps } from "antd";
import { GoDotFill } from "react-icons/go";
import SportifyIcon from "../../assets/images/sportify.png";

interface description {
  title?: string; // title will now be optional
  description?: string;
  status?: any;
  imageSrc?: string; // added imageSrc to handle the image source
}

const HeaderAvatarCard: React.FC<description> = ({
  title,
  description,
  status,
  imageSrc, // destructure the imageSrc prop
}) => {
  // Define menu items for dropdown
  const menu: MenuProps["items"] = [
    {
      key: "1",
      label: "New",
    },
    {
      key: "2",
      label: "In Progress",
    },
    {
      key: "3",
      label: "Completed",
    },
  ];

  // State to track the selected menu item
  const [selectedKey, setSelectedKey] = useState<string>("1"); // Initially select 'New'

  //////status////////
  const leadStatuses = [
    { name: "New", color: "#22C55E" },
    { name: "Qualified", color: "#3B82F6" },
    { name: "Quotation", color: "#F59E0B" },
    { name: "Proposal", color: "#6B7280" },
    { name: "Converted", color: "#10B981" },
    { name: "Lost", color: "#EF4444" },
  ];

  const [currentStatus, setCurrentStatus] = useState<any | null>(null);

  // Find the current status from the predefined leadStatuses array that matches the prop
  useEffect(() => {
    if (leadStatuses.length > 0 && status) {
      const matchedStatus = leadStatuses.find(
        (leadStatus) => leadStatus.name === status
      );
      setCurrentStatus(matchedStatus || null);
    }
  }, [status]);

  // Function to get background color based on the status
  const getStatusColor = (statusName: string) => {
    const statusItem = leadStatuses.find((item) => item.name === statusName);
    return statusItem ? statusItem.color : "#6B7280"; // Default to gray
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "20px",
        justifyContent: "flex-start",
      }}
    >
      {/* <div
        style={{
          backgroundColor: "#ffffff",
          height: "80px",
          width: "80px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          fontWeight: "500",
          marginRight: "12px",
          // border: "2px solid #232D42",
        }}
      >
        <img src={imageSrc} width={45} />
      </div> */}
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              fontSize: "30px",
              fontWeight: "600",
              lineHeight: "36px",
              color: "#232D42",
              fontFamily: "Inter",
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            color: "#374151",
            fontSize: "16px",
            fontWeight: "500",
            lineHeight: "28px",
            maxWidth: "600px",
            fontFamily: "Inter",
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export default HeaderAvatarCard;
