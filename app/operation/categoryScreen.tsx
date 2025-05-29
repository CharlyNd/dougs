import { View, FlatList, RefreshControl } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Item } from '~/components/Item';
import { HeaderFilter } from '~/components/HeaderFilter';
import { OperationListHeader } from '~/components/ListHeader';
import { useOperationStore } from '~/store/store';
import { fetchApi } from '~/hooks/api';
import type { Category, CategoriesGroup } from '~/types/types';

type SortOption = 'group' | 'az' | 'za';

interface GroupedCategory extends CategoriesGroup {
  categories: Category[];
}

type ListItem = GroupedCategory | Category;

export default function SelectCategoryScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [sort, setSort] = useState<SortOption>('group');
  const [refreshing, setRefreshing] = useState(false);

  const { categories, groups, setCategories, setGroups, setSelectedCategoryId } = useOperationStore();

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const [categoriesData, groupsData] = await Promise.all([
        fetchApi<Category[]>('/categories'),
        fetchApi<CategoriesGroup[]>('/categories-groups')
      ]);
      if (categoriesData) setCategories(categoriesData);
      if (groupsData) setGroups(groupsData);
    } catch (error) {
      console.error('Error refreshing categories:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    if (!id) return;
    setSelectedCategoryId(categoryId);
    router.back();
  };

  const getSortedCategories = (): Category[] => {
    const sortedCategories = [...categories];
    if (sort === 'az' || sort === 'za') {
      sortedCategories.sort((a, b) =>
        sort === 'az'
          ? a.label.localeCompare(b.label)
          : b.label.localeCompare(a.label)
      );
    }
    return sortedCategories;
  };

  const getGroupedCategories = (): GroupedCategory[] => {
    return groups.map(group => ({
      ...group,
      categories: categories.filter(cat => String(cat.groupId) === String(group.id)),
    }));
  };

  const renderCategory = ({ item: cat, group }: { item: Category; group?: CategoriesGroup }) => (
    <View>
      <Item
        operation={{
          id: Number(`${group?.id || 0}${cat.id}`),
          label: cat.label,
          description: cat.description,
          amount: 0,
          date: new Date().toISOString(),
        }}
        mode="category"
        onPress={() => handleCategorySelect(String(cat.id))}
      />
    </View>
  );

  const renderGroup = ({ item: group }: { item: GroupedCategory }) => (
    <View>
      <OperationListHeader
        label={group.label}
        bgColor={group.color}
        textColor={group.color}
      />
      {group.categories.map((cat, index) => (
        <View key={`${group.id}-${cat.id}`}>
          {renderCategory({ item: cat, group })}
          {index < group.categories.length - 1 && (
            <View className="h-[1px] bg-gray-200 mx-4" />
          )}
        </View>
      ))}
    </View>
  );

  const renderFlatCategory = ({ item: cat, index }: { item: Category; index: number }) => (
    <View>
      {renderCategory({ item: cat })}
      {index < getSortedCategories().length - 1 && (
        <View className="h-[1px] bg-gray-200 mx-4" />
      )}
    </View>
  );

  const renderItem = ({ item, index }: { item: ListItem; index: number }) => {
    if (sort === 'group') {
      return renderGroup({ item: item as GroupedCategory });
    }
    return renderFlatCategory({ item: item as Category, index });
  };

  return (
    <View className="flex-1 bg-white">
      <HeaderFilter
        value={sort}
        onChange={setSort}
        options={[
          { value: 'group', label: 'Groupes' },
          { value: 'az', label: 'A - Z' },
          { value: 'za', label: 'Z - A' }
        ]}
      />
      <FlatList
        data={sort === 'group' ? getGroupedCategories() : getSortedCategories()}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        removeClippedSubviews
        maxToRenderPerBatch={5}
        windowSize={5}
      />
    </View>
  );
}