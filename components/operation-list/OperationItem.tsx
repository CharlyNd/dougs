import { View, Text, Pressable } from 'react-native';
import type { Operation } from '../../types/types';
import Colors from '~/constants/Colors';
import { Tag } from '../ui/Tag';

interface OperationItemProps {
  operation: Operation;
  onPress?: () => void;
  mode?: 'operation' | 'category';
}

export function OperationItem({ operation, onPress, mode = 'operation' }: OperationItemProps) {

  const isCredit = operation.amount > 0;
  const category = operation.category;
  const group = category?.group;

  return (
    <Pressable
      onPress={onPress}
      className="px-6 py-3 bg-white"
      accessibilityRole="button"
      accessibilityLabel={`Voir le détail de l'opération ${operation.label}`}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-1">
          <Text className={`${mode === 'operation' ? 'text-lg' : 'text-xl'} font-semibold`} style={{ color: Colors.labelSummary }} numberOfLines={2}>
            {operation.label}
          </Text>
          {!!operation.description && (
            <Text className={`${mode === 'operation' ? 'text-sm' : 'text-md'} text-gray-500 italic`} style={{ color: Colors.labelDescription }} numberOfLines={4}>
              {operation.description}
            </Text>
          )}
        </View>
        {mode === 'operation' && (
          <Text
            className="text-xl font-semibold ml-2"
            style={{ color: isCredit ? Colors.blue.text : Colors.labelSummary }}
          >
            {isCredit ? '+' : '-'} {Math.abs(operation.amount).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </Text>
        )}
      </View>
      {mode === 'operation' && (
        <View className="flex-row justify-end mt-2 gap-2">
          {category ? (
            <Tag label={category.label} color={group?.color} />
          ) : (
            <Tag label="Non catégorisé" isDefault />
          )}
        </View>)}
    </Pressable>
  );
} 