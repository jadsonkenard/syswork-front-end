import { iconMap } from "../../icon/iconMap";

interface DynamicIconProps {
  name: string;
  size?: number;
  color?: string;
}

export function DynamicIcon({ name, size = 24, color = "currentColor" }: DynamicIconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) return null;

  return <IconComponent size={size} color={color} />;
}
