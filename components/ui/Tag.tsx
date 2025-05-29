import { View, Text } from 'react-native';
import Colors from '~/constants/Colors';
import { useGroupStyle } from '~/hooks/useGroupStyle';

interface TagProps {
  label: string;
  color?: string;
  isDefault?: boolean;
}

export function Tag({ label, color, isDefault }: TagProps) {
  const style = useGroupStyle(color);

  return (
    <View
      className={`px-3 py-1 rounded-md ${isDefault ? 'border border-gray-200 bg-white py-2' : ''}`}
      style={!isDefault ? { backgroundColor: style.bg } : undefined}
    >
      <Text
        className="text-sm italic"
        style={{ color: isDefault ? Colors.labelSummary : style.text }}
      >
        {label}
      </Text>
    </View>
  );
} 