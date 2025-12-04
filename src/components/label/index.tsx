import styles from "./Label.module.css";
import { DynamicIcon } from "../dynamic-icon/DynamicIcon";

type LabelProps = {
  title: string;
  text: string;
};

export default function Label({ title, text }: LabelProps) {
  return (
    <div className={styles.container}>
      <DynamicIcon iconName="user" color="var(--neutral-500)" size={25} />
      <strong className={styles.title}>{title}:</strong>
      <p className={styles.text}>{text}</p>
    </div>
  );
}
