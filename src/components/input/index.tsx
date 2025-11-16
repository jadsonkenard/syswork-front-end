import styles from "./Input.module.css";
import { DynamicIcon } from "../dynamic-icon/DynamicIcon";

type InputProps = {
  name: string;
  iconName: string;
  placeholder: string;
};

export default function Input({
  name,
  iconName,
  placeholder,
}: InputProps) {
  return (
    <div className={styles.container}>
      <DynamicIcon name={iconName} color="#2a9a58" size={25} />
      <input name={name} placeholder={placeholder} className={styles.input}/>
    </div>
  );
}
