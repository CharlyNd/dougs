import { View, Text } from 'react-native';
import Colors from '~/constants/Colors';

interface TagProps {
  label: string;
  color?: string;
  isDefault?: boolean;
}

export function Tag({ label, color, isDefault }: TagProps) {
  const getGroupStyle = (colorName: string) => {
    switch (colorName) {
      case 'green':
        return { bg: Colors.green.bg, text: Colors.green.textTag };
      case 'blue':
        return { bg: Colors.blue.bg, text: Colors.blue.text };
      case 'purple':
        return { bg: Colors.purple.bg, text: Colors.purple.text };
      default:
        return { bg: Colors.white.bg, text: Colors.labelSummary };
    }
  };

  const style = color ? getGroupStyle(color) : { bg: Colors.white.bg, text: Colors.labelSummary };

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