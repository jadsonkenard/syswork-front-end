import styles from "./Label.module.css";
import { DynamicIcon } from "../dynamic-icon/DynamicIcon";

type LabelProps = {
  title: string;
  value: string | number;
};

export default function Label({ title, value }: LabelProps) {
  return (
    <div className={styles.container}>
      <div>
        <DynamicIcon iconName="user" color="var(--neutral-500)" size={25} />
      </div>
      <strong className={styles.title}>{title}:</strong>
      <p className={styles.value}>{value}</p>
    </div>
  );
}
