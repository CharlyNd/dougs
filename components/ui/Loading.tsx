import { View, ActivityIndicator } from 'react-native';
import Colors from '~/constants/Colors';

interface LoadingProps {
  size?: 'small' | 'large';
  color?: string;
  className?: string;
}

export function Loading({ size = 'large', color = Colors.blue.text, className = '' }: LoadingProps) {
  return (
    <View className={`flex-1 items-center justify-center ${className}`}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
} 