import { View, FlatList } from 'react-native';
import { Item } from '../Item';
import Colors from '~/constants/Colors';
import type { Operation } from '~/types/types';
import { router } from 'expo-router';
import { ListHeader } from '../ListHeader';
import { Loading } from '../ui/Loading';
import { useOperationStore } from '~/store/store';

interface GroupedOperations {
  date: string;
  operations: Operation[];
}

interface OperationListContentProps {
  listItems: GroupedOperations[];
  onRefresh?: () => void;
  refreshing?: boolean;
  onEndReached?: () => void;
  loading?: boolean;
}

export function OperationListContent({ listItems, onRefresh, refreshing, onEndReached, loading }: OperationListContentProps) {
  const { setSelectedCategoryId } = useOperationStore();

  if (loading && !refreshing && listItems.length === 0) {
    return <Loading />;
  }

  return (
    <FlatList
      data={listItems}
      keyExtractor={(item) => item.date}
      renderItem={({ item }) => (
        <View>
          <ListHeader
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
              <Item
                operation={operation}
                onPress={() => {
                  setSelectedCategoryId(operation.categoryId ? String(operation.categoryId) : null);
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
      onRefresh={onRefresh}
      refreshing={!!refreshing}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
} 