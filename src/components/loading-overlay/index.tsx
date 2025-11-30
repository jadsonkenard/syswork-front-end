import styles from "./Loading-overlay.module.css";
import { Dots } from "react-activity";


interface LoadingOverlayProps {
  isLoading: boolean;
}

export function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className={styles["loading-overlay"]}>
      <Dots color="var(--primary-dark)" size={25} />
    </div>
  );
}
