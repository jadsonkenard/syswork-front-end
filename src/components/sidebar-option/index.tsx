import styles from "./Sidebar-option.module.css";
import { DynamicIcon } from "../dynamic-icon/DynamicIcon";

type SidebarOptionProps = {
  iconName: string;
  title: string;
  onClick: () => void;
};

export default function SidebarOption({ iconName, title, onClick }: SidebarOptionProps) {
  return (
    <div className={styles.container} onClick={onClick}>
      <DynamicIcon name={iconName} size={30} color="#FFF"/>
      <p className={styles.title}>{title}</p>
    </div>
  );
}
