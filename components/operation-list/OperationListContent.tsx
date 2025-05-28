import { View, FlatList } from 'react-native';
import { OperationItem } from './OperationItem';
import Colors from '../../constants/Colors';
import type { Operation } from '../../types/types';
import { router } from 'expo-router';
import { OperationListHeader } from './OperationListHeader';

interface GroupedOperations {
  date: string;
  operations: Operation[];
}

interface OperationListContentProps {
  listItems: GroupedOperations[];
}

export function OperationListContent({ listItems }: OperationListContentProps) {
  return (
    <FlatList
      data={listItems}
      keyExtractor={(item) => item.date}
      renderItem={({ item }) => (
        <View>
          <OperationListHeader
            label={new Date(item.date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
            bgColor={Colors.gray.bg}
            textColor={Colors.labelOperation.date}
            rightLabel={`${item.operations.length} ${item.operations.length === 1 ? 'opération' : 'opérations'}`}
            rightLabelColor={Colors.labelOperation.numberOperation}
          />
          {item.operations.map((operation, index) => (
            <View key={operation.id}>
              <OperationItem
                operation={operation}
                onPress={() => {
                  router.push(`/operation/${operation.id}`);
                }}
              />
              {index < item.operations.length - 1 && (
                <View className="h-[1px] mx-4" style={{ backgroundColor: Colors.divider.bg }} />
              )}
            </View>
          ))}
        </View>
      )}
    />
  );
} 