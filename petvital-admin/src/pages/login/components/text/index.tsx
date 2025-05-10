import React from "react";
import "./index.scss";
import { TextProps } from "./types";

const Text: React.FC<TextProps> = ({ content, type }) => {
  const className = type === "title" ? "title" : "subtitle";
  return <div className={className}>{content}</div>;
};

export default Text;
