export type InputFieldProps = {
  label?: string;
  name?: any;
  placeholder: string;
  type: "text" | "password";
  width?: string; // Optional width prop
  height?: string; // Optional height prop
  darkMode?: boolean; // Optional dark mode prop
  customClass?: string; // Optional custom class for additional customization
  value?: string; // Optional pass initial value
  style?: React.CSSProperties;
  onChange?: (e: any) => void; // Optional pass on change function to extract the values
  maxLength?: any;
};
