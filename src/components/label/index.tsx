import styles from "./Label.module.css";
import { DynamicIcon } from "../dynamic-icon/DynamicIcon";

type LabelProps = {
  title: string;
  value: string | number;
  valueColor?: string;
};

export default function Label({ title, value, valueColor }: LabelProps) {
  return (
    <div className={styles.container}>
      <div>
        <DynamicIcon iconName="user" color="var(--neutral-500)" size={25} />
      </div>
      <strong className={styles.title}>{title}:</strong>
      <p className={styles.value} style={{ color: valueColor }}>
        {value}
      </p>
    </div>
  );
}
