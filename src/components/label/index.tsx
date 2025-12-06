import styles from "./Label.module.css";
import { DynamicIcon } from "../dynamic-icon/DynamicIcon";

type LabelProps = {
  iconName: string;
  title: string;
  value: string | number;
  valueColor?: string;
};

export default function Label({
  iconName,
  title,
  value,
  valueColor,
}: LabelProps) {
  return (
    <div className={styles.container}>
      <div>
        <DynamicIcon iconName={iconName} color="var(--neutral-500)" size={25} />
      </div>
      <strong className={styles.title}>{title}:</strong>
      <p className={styles.value} style={{ color: valueColor }}>
        {value}
      </p>
    </div>
  );
}
