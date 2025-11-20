import styles from "./Button.module.css";
import { Dots } from "react-activity";

type ButtonProps = {
  title: string;
  disabled?: boolean;
  isLoading: boolean;
  onClick?: () => void;
  width?: string;
  height?: string;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  title,
  disabled = false,
  isLoading = false,
  onClick,
  width,
  height,
  type = "button"
}: ButtonProps) {
  return (
    <button
      className={styles.container}
      disabled={disabled}
      onClick={onClick}
      type={type}
      style={{
        ["--btn-width" as string]: width,
        ["--btn-height" as string]: height,
      }}
    >
      {isLoading ? <Dots color="#FFF" size={16} /> : title}
    </button>
  );
}
