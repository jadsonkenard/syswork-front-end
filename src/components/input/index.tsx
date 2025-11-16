import styles from "./Input.module.css";
import { DynamicIcon } from "../dynamic-icon/DynamicIcon";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  iconName: string;
  placeholder: string;
};

export default function Input({
  iconName,
  placeholder,
  ...rest
}: InputProps) {
  return (
    <div className={styles.container}>
      <DynamicIcon name={iconName} color="#2a9a58" size={25} />
      <input
        placeholder={placeholder}
        className={styles.input}
        {...rest}
      />
    </div>
  );
}
