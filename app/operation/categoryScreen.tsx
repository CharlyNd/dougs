import { View, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Item } from '~/components/Item';
import { HeaderFilter } from '~/components/HeaderFilter';
import { OperationListHeader } from '~/components/ListHeader';
import { useOperationStore } from '~/store/store';

export default function SelectCategoryScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [sort, setSort] = useState<'group' | 'az' | 'za'>('group');
  const { categories, groups, setSelectedCategoryId } = useOperationStore();

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

  const handleCategorySelect = (categoryId: string) => {
    if (!id) return;
    setSelectedCategoryId(categoryId);
    router.back();
  };

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
          {group.categories.map((cat) => (
            <View key={`${group.id}-${cat.id}`}>
              <Item
                operation={{
                  id: Number(`${group.id}${cat.id}`),
                  label: cat.label,
                  description: cat.description,
                  amount: 0,
                  date: new Date().toISOString(),
                }}
                mode="category"
                onPress={() => handleCategorySelect(String(cat.id))}
              />
              {cat !== group.categories[group.categories.length - 1] && (
                <View className="h-[1px] bg-gray-200 mx-4" />
              )}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}