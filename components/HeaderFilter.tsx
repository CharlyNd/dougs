import { View, Text, Pressable } from 'react-native';
import Colors from '~/constants/Colors';

export interface HeaderFilterOption<T = string> {
  value: T;
  label: string;
}

interface HeaderFilterProps<T = string> {
  value: T;
  options: HeaderFilterOption<T>[];
  onChange: (value: T) => void;
  className?: string;
}

export function HeaderFilter<T = string>({
  value,
  options,
  onChange,
  className = '',
}: HeaderFilterProps<T>) {
  return (
    <View className={`flex-row items-center px-4 my-4 ${className}`}>
      <Text className="mr-6 text-lg">Trier par</Text>
      {options.map(option => (
        <Pressable
          key={String(option.value)}
          className={`px-4 py-2 rounded-lg mr-4 `}
          style={{ backgroundColor: value === option.value ? Colors.button.primary : Colors.gray.bg }}
          onPress={() => onChange(option.value)}
        >
          <Text className={`${value === option.value ? 'font-semibold' : 'font-base'} text-lg`} style={{ color: value === option.value ? Colors.white.bg : Colors.labelOperation.numberOperation }}>
            {option.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
} 