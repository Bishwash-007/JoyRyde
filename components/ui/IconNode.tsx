import { icons } from "lucide-react-native";

const IconsMap = icons as Record<string, React.ComponentType<any>>;

interface IconsProps {
  name: keyof typeof IconsMap;
  color?: string;
  size?: number;
}

const Icon: React.FC<IconsProps> = ({ name, color = "black", size = 20 }) => {
  const LucideIcon = IconsMap[name];
  return <LucideIcon color={color} size={size} />;
};

export default Icon;
