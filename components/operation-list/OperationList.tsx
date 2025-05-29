import { View } from 'react-native';
import { OperationSummary } from './OperationSummary';
import { OperationSearch } from './OperationSearch';
import { useState, useMemo } from 'react';
import { OperationListContent } from './OperationListContent';
import type { Operation } from '../../types/types';
import { usePaginatedOperations, useLoadCategoriesAndGroups, useOperationStats } from '~/hooks/api';
import { useOperationStore } from '~/store/store';

interface GroupedOperations {
  date: string;
  operations: Operation[];
}

export function OperationList() {
  const [search, setSearch] = useState('');
  const { operations, loading, refreshing, onRefresh, onEndReached } = usePaginatedOperations(search);
  const { categories, groups } = useOperationStore();
  const { stats, loading: statsLoading } = useOperationStats();

  // Charger les données une seule fois au montage du composant
  useLoadCategoriesAndGroups();

  // Enrich operations with category and group information
  const enrichedOperations = useMemo(() => operations.map(operation => {
    const category = categories.find(cat => cat.id === operation.categoryId);
    const group = category ? groups.find(group => group.id === category.groupId) : undefined;
    return {
      ...operation,
      category: category ? { ...category, group } : undefined
    };
  }), [operations, categories, groups]);

  // Group operations by date
  const groupedByDate = useMemo(() => {
    return enrichedOperations.reduce<Record<string, Operation[]>>((acc, operation) => {
      const date = operation.date;
      acc[date] = [...(acc[date] || []), operation];
      return acc;
    }, {});
  }, [enrichedOperations]);

  const listItems: GroupedOperations[] = useMemo(() => Object.entries(groupedByDate)
    .map(([date, operations]) => ({ date, operations }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), [groupedByDate]);

  return (
    <View className="flex-1 bg-white">
      <OperationSearch value={search} onChange={setSearch} />
      <OperationSummary
        credit={stats?.incomesTotal || 0}
        debit={stats?.outcomesTotal || 0}
        balance={stats?.balanceTotal || 0}
        loading={statsLoading}
      />
      <OperationListContent
        listItems={listItems}
        loading={loading}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
      />
    </View>
  );
}