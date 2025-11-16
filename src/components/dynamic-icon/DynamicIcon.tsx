import { iconMap } from "../../icon/iconMap";

interface DynamicIconProps {
  iconName: string;
  size?: number;
  color?: string;
}

export function DynamicIcon({
  iconName,
  size = 24,
  color = "currentColor",
}: DynamicIconProps) {
  const IconComponent = iconMap[iconName];

  if (!IconComponent) return null;

  return <IconComponent size={size} color={color} />;
}
