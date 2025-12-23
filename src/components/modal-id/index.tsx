import styles from "./Modal-id.module.css"
import Button from "../button";
import Input from "../input";
import { useState } from "react";

interface ModalIdProps {
  isOpen: boolean;
  route: string;
  onCancel: () => void;
  onConfirm: (value: string, route: string, children: React.ReactNode) => void;
  children: React.ReactNode;
}

export default function ModalId({
  isOpen,
  route,
  onCancel,
  onConfirm,
  children,
}: ModalIdProps) {
  const [value, setValue] = useState("");
  if (!isOpen) return null;

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-container"]}>
        {children}
        <Input
          name="id-for-report"
          placeholder="informe o ID"
          iconName="reports"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className={styles["modal-actions"]}>
          <Button
            title="Cancelar"
            onClick={onCancel}
            height="30px"
            width="100px"
            isLoading={false}
          />
          <Button
            title="Confirmar"
            onClick={() => onConfirm(value, route, children)}
            height="30px"
            width="100px"
            isLoading={false}
          />
        </div>
      </div>
    </div>
  );
}
