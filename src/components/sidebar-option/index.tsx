import styles from "./Sidebar-option.module.css";
import { ClipboardMinus } from "lucide-react";

type SidebarOptionProps = {
  title: string;
};

export default function SidebarOption({ title }: SidebarOptionProps) {
  return (
    <div className={styles.container}>
      <ClipboardMinus size={30} color="#fff" />
      <p className={styles.title}>{title}</p>
    </div>
  );
}
