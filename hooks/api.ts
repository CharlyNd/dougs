import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import type { Operation, Category, CategoriesGroup } from '~/types/types';
import { useOperationStore } from '~/store/store';

const PAGE_SIZE = 10;

export function usePaginatedOperations(search: string) {
    const {
        operations,
        setOperations,
        appendOperations,
        hasMore,
        setHasMore,
        offset,
        setOffset,
    } = useOperationStore();

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchOperations = useCallback(
        async (reset = false) => {
            setLoading(true);
            const currentOffset = reset ? 0 : offset;
            try {
                const res = await fetch(
                    `http://localhost:3000/operations?offset=${currentOffset}&limit=${PAGE_SIZE}${search ? `&search=${encodeURIComponent(search)}` : ''}`
                );
                const data = await res.json();
                if (reset) {
                    setOperations(data);
                } else {
                    appendOperations(data);
                }
                setHasMore(data.length === PAGE_SIZE);
                setOffset(currentOffset + PAGE_SIZE);
            } catch (error) {
                Alert.alert('Une erreur est survenue lors de la récupération des opérations:', error instanceof Error ? error.message : String(error));
                setOperations([]);
            } finally {
                setLoading(false);
                setRefreshing(false);
            }
        },
        [offset, search, setOperations, appendOperations, setHasMore, setOffset]
    );

    useEffect(() => {
        fetchOperations(true);
    }, [search]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchOperations(true);
    };

    const onEndReached = () => {
        if (!loading && hasMore) fetchOperations();
    };

    return { operations, loading, refreshing, onRefresh, onEndReached };
}

export function useCategories() {
    const { categories, setCategories } = useOperationStore();

    useEffect(() => {
        fetch('http://localhost:3000/categories')
            .then(res => res.json())
            .then(setCategories)
            .catch(error => {
                Alert.alert('Une erreur est survenue lors de la récupération des catégories:', error.message);
                setCategories([]);
            });
    }, [setCategories]);

    return categories;
}

export function useCategoryGroups() {
    const { groups, setGroups } = useOperationStore();

    useEffect(() => {
        fetch('http://localhost:3000/categories-groups')
            .then(res => res.json())
            .then(setGroups)
            .catch(error => {
                Alert.alert('Une erreur est survenue lors de la récupération des groupes de catégories:', error.message);
                setGroups([]);
            });
    }, [setGroups]);

    return groups;
}
