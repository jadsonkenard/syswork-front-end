import styles from "./Input.module.css";
import { DynamicIcon } from "../dynamic-icon/DynamicIcon";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  iconName: string;
  placeholder: string;
  width?: string;
  height?: string;
};

export default function Input({
  iconName,
  placeholder,
  width,
  height,
  ...rest
}: InputProps) {
  return (
    <div
      className={styles.container}
      style={{
        ["--btn-width" as string]: width,
        ["--btn-height" as string]: height,
      }}
    >
      <DynamicIcon iconName={iconName} color="var(--primary-dark)" size={25} />
      <input placeholder={placeholder} className={styles.input} {...rest} />
    </div>
  );
}
