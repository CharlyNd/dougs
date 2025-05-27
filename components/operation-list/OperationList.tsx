import { View } from 'react-native';
import { useState } from 'react';
import { OperationSearch } from './OperationSearch';

export function OperationList() {
  const [search, setSearch] = useState('');

  return (
    <View className="flex-1 bg-white">
      <OperationSearch value={search} onChange={setSearch} />
    </View>
  );
}