import styles from "./Select.module.css";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  name: string;
  title: string;
  width?: string;
  height?: string;
  options: Option[]; // <-- NEW
};

export default function Select({
  name,
  title,
  width,
  height,
  options,
}: SelectProps) {
  return (
    <div
      className={styles.container}
      style={{
        ["--btn-width" as string]: width,
        ["--btn-height" as string]: height,
      }}
    >
      <label>{title}</label>
      <select name={name} className={styles.select}>
        <option value="">Selecione</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
