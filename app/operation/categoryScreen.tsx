import { View, ScrollView, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { OperationItem } from '~/components/operation-list/OperationItem';
import { HeaderFilter } from '~/components/operation-list/HeaderFilter';
import { OperationListHeader } from '~/components/operation-list/OperationListHeader';
import { useOperationStore } from '~/store/store';
import { useCategories, useCategoryGroups } from '~/hooks/api';

export default function SelectCategoryScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [sort, setSort] = useState<'group' | 'az' | 'za'>('group');
  const { categories, groups } = useOperationStore();

  // Charger les données au démarrage
  useCategories();
  useCategoryGroups();

  // Group categories by groupId
  const grouped = groups.map(group => ({
    ...group,
    categories: categories.filter(cat => String(cat.groupId) === String(group.id)),
  }));

  // Sorting logic (A-Z, Z-A)
  if (sort === 'az' || sort === 'za') {
    grouped.forEach(g => {
      g.categories.sort((a, b) =>
        sort === 'az'
          ? a.label.localeCompare(b.label)
          : b.label.localeCompare(a.label)
      );
    });
  }

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Filtres */}
      <HeaderFilter 
        value={sort} 
        onChange={setSort} 
        options={[
          { value: 'group', label: 'Groupes' }, 
          { value: 'az', label: 'A - Z' }, 
          { value: 'za', label: 'Z - A' }
        ]} 
      />
      {/* Liste groupée */}
      {grouped.map(group => (
        <View key={group.id}>
          <OperationListHeader
            label={group.label}
            bgColor={group.color}
            textColor={group.color}
          />
          {group.categories.map((cat, idx) => (
            <View key={cat.id}>
              <Pressable
                onPress={() => {
                  router.replace({
                    pathname: '/operation/[id]',
                    params: { id: String(id), categoryId: cat.id }
                  });
                }}
                className="px-4 py-3"
              >
                <OperationItem
                  operation={{
                    id: cat.id,
                    label: cat.label,
                    description: cat.description,
                    amount: 0,
                    date: new Date().toISOString(),
                  }}
                  mode="category"
                />
              </Pressable>
              {idx < group.categories.length - 1 && (
                <View className="h-[1px] bg-gray-200 mx-4" />
              )}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}