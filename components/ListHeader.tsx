import { View, Text } from 'react-native';
import Colors from '~/constants/Colors';

const GROUP_COLOR_MAP = {
  green: { bg: Colors.green.bg, text: Colors.green.text },
  purple: { bg: Colors.purple.bg, text: Colors.purple.text },
  blue: { bg: Colors.blue.bg, text: Colors.blue.text },
};

function resolveGroupColors(color?: string) {
  return GROUP_COLOR_MAP[color as keyof typeof GROUP_COLOR_MAP] || {
    bg: Colors.gray.bg,
    text: Colors.labelOperation.date,
  };
}

interface OperationListHeaderProps {
  label: string;
  bgColor?: string;
  textColor?: string;
  rightLabel?: string;
  rightLabelColor?: string;
}

export function OperationListHeader({
  label,
  bgColor,
  textColor,
  rightLabel,
  rightLabelColor,
}: OperationListHeaderProps) {
  const { bg, text } = resolveGroupColors(bgColor);

  return (
    <View className="flex-row justify-between items-center px-6 py-2" style={{ backgroundColor: bg }}>
      <Text style={{ color: textColor ? resolveGroupColors(textColor).text : text }}>
        {label}
      </Text>
      {rightLabel && (
        <Text className="text-md" style={{ color: rightLabelColor }}>{rightLabel}</Text>
      )}
    </View>
  );
}