import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '~/constants/Colors';

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
  color?: string;
}

export function Toast({ message, visible, onClose, color = Colors.green.textTag }: ToastProps) {
  if (!visible) return null;
  return (
    <View className="absolute top-0 left-4 right-4 z-50 flex-row items-center px-4 py-3 rounded-xl" style={{ backgroundColor: color, elevation: 10 }}>
      <Ionicons name="checkmark-circle-outline" size={24} color={Colors.white.bg} style={{ marginRight: 8 }} />
      <Text className="flex-1  text-lg" style={{ color: Colors.white.bg }}>{message}</Text>
      <Pressable onPress={onClose} className="ml-2">
        <Ionicons name="close" size={22} color={Colors.white.bg} />
      </Pressable>
    </View>
  );
} 