import { View } from 'react-native';
import { useState } from 'react';
import { OperationSearch } from './OperationSearch';
import { OperationSummary } from './OperationSummary';

export function OperationList() {
  const [search, setSearch] = useState('');

  return (
    <View className="flex-1 bg-white">
      <OperationSearch value={search} onChange={setSearch} />
      <OperationSummary credit={1000.35} debit={220} balance={500} />
    </View>
  );
}