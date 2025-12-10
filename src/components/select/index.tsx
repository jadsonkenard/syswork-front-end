import styles from "./Select.module.css";

type Option = {
  value: string | number;
  label: string;
};

type SelectProps = {
  name: string;
  value: string | number;
  title: string;
  width?: string;
  height?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[]; // <-- NEW
};

export default function Select({
  name,
  value,
  title,
  width,
  height,
  onChange,
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
      <select
        name={name}
        className={styles.select}
        value={value}
        onChange={onChange}
      >
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
