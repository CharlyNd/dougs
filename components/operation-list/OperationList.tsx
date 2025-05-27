import { View } from 'react-native';
import { OperationSummary } from './OperationSummary';
import operations from '~/mockData/operations.json';
import categories from '~/mockData/categories.json';
import categoryGroups from '~/mockData/categoriesGroups.json';
import { OperationSearch } from './OperationSearch';
import { useState } from 'react';
import type { Operation } from '../../types/types';
import { OperationListContent } from './OperationListContent';

interface GroupedOperations {
  date: string;
  operations: Operation[];
}

export function OperationList() {
  const [search, setSearch] = useState('');

  // Enrich operations with category and group information
  const enrichedOperations = operations.map(operation => {
    const category = categories.find(cat => cat.id === operation.categoryId);
    const group = category ? categoryGroups.find(group => group.id === category.groupId) : undefined;

    return {
      ...operation,
      category: category ? { ...category, group } : undefined
    };
  });

  // Group operations by date
  const groupedByDate = enrichedOperations.reduce<Record<string, Operation[]>>((acc, operation) => {
    const date = operation.date;
    acc[date] = [...(acc[date] || []), operation];
    return acc;
  }, {});

  const listItems: GroupedOperations[] = Object.entries(groupedByDate)
    .map(([date, operations]) => ({ date, operations }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Calculate totals using array methods
  const creditOperations = enrichedOperations.filter(op => op.amount > 0);
  const debitOperations = enrichedOperations.filter(op => op.amount < 0);

  const totals = {
    credit: creditOperations.reduce((sum, op) => sum + op.amount, 0),
    debit: debitOperations.reduce((sum, op) => sum + Math.abs(op.amount), 0),
    balance: enrichedOperations.reduce((sum, op) => sum + op.amount, 0)
  };

  return (
    <View className='bg-white flex-1'>
      <OperationSearch value={search} onChange={setSearch} />
      <OperationSummary
        credit={totals.credit}
        debit={totals.debit}
        balance={totals.balance}
      />
      <OperationListContent listItems={listItems} />
    </View>
  );
}