import { View, Text } from 'react-native';
import { OperationSummary } from './OperationSummary';
import { OperationSearch } from './OperationSearch';
import { useState, useMemo } from 'react';
import { OperationListContent } from './OperationListContent';
import type { Operation } from '../../types/types';
import { usePaginatedOperations, useCategories, useCategoryGroups } from '~/hooks/api';

interface GroupedOperations {
  date: string;
  operations: Operation[];
}

export function OperationList() {
  const [search, setSearch] = useState('');
  const { operations, loading, refreshing, onRefresh, onEndReached } = usePaginatedOperations(search);
  const categories = useCategories();
  const categoryGroups = useCategoryGroups();

  // Enrich operations with category and group information
  const enrichedOperations = useMemo(() => operations.map(operation => {
    const category = categories.find(cat => cat.id === operation.categoryId);
    const group = category ? categoryGroups.find(group => group.id === category.groupId) : undefined;
    return {
      ...operation,
      category: category ? { ...category, group } : undefined
    };
  }), [operations, categories, categoryGroups]);

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

  // Calculate totals using array methods
  const creditOperations = enrichedOperations.filter(op => op.amount > 0);
  const debitOperations = enrichedOperations.filter(op => op.amount < 0);

  const totals = {
    credit: creditOperations.reduce((sum, op) => sum + op.amount, 0),
    debit: debitOperations.reduce((sum, op) => sum + Math.abs(op.amount), 0),
    balance: enrichedOperations.reduce((sum, op) => sum + op.amount, 0)
  };

  if (loading && !refreshing && operations.length === 0) return <Text className="m-6">Chargement...</Text>;

  return (
    <View className='bg-white flex-1'>
      <OperationSearch value={search} onChange={setSearch} />
      <OperationSummary
        credit={totals.credit}
        debit={totals.debit}
        balance={totals.balance}
      />
      <OperationListContent
        listItems={listItems}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReached={onEndReached}
      />
    </View>
  );
}