import { View, Text, FlatList } from 'react-native';
import { OperationItem } from './OperationItem';
import Colors from '../../constants/Colors';
import type { Operation } from '../../types/types';

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
          <View className="flex-row justify-between items-center px-4 py-1" style={{backgroundColor: Colors.gray.bg}}>
            <Text className='text-base' style={{color: Colors.labelOperation.date}}>
              {new Date(item.date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </Text>
            <Text className="text-md" style={{color: Colors.labelOperation.numberOperation}}>
              {item.operations.length} {item.operations.length === 1 ? 'opération' : 'opérations'}
            </Text>
          </View>
          {item.operations.map((operation, index) => (
            <View key={operation.id}>
              <OperationItem
                operation={operation}
                onPress={() => {
                  console.log('operation');
                }}
              />
              {index < item.operations.length - 1 && (
                <View className="h-[1px] mx-4" style={{backgroundColor: Colors.divider.bg}} />
              )}
            </View>
          ))}
        </View>
      )}
    />
  );
} 