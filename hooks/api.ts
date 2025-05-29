import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import type { Operation, Category, CategoriesGroup, Stats } from '~/types/types';
import { useOperationStore } from '~/store/store';

const API_URL = 'http://localhost:3000';
const PAGE_SIZE = 10;

// Fonction utilitaire pour gérer les appels API
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            headers: { 'Content-Type': 'application/json' },
            ...options
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Une erreur est survenue';
        Alert.alert('Erreur', message);
        return null;
    }
}

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

    const fetchOperations = useCallback(async (reset = false) => {
        setLoading(true);
        const currentOffset = reset ? 0 : offset;
        const query = `?offset=${currentOffset}&limit=${PAGE_SIZE}${search ? `&search=${encodeURIComponent(search)}` : ''}`;

        const data = await fetchApi<Operation[]>(`/operations${query}`);

        if (data) {
            if (reset) {
                setOperations(data);
            } else {
                appendOperations(data);
            }
            setHasMore(data.length === PAGE_SIZE);
            setOffset(currentOffset + PAGE_SIZE);
        } else {
            setOperations([]);
        }

        setLoading(false);
        setRefreshing(false);
    }, [offset, search, setOperations, appendOperations, setHasMore, setOffset]);

    useEffect(() => {
        fetchOperations(true);
    }, [search]);

    return {
        operations,
        loading,
        refreshing,
        onRefresh: () => {
            setRefreshing(true);
            fetchOperations(true);
        },
        onEndReached: () => {
            if (!loading && hasMore) fetchOperations();
        }
    };
}

export function useCategories() {
    const { categories, setCategories } = useOperationStore();

    useEffect(() => {
        fetchApi<Category[]>('/categories').then(data => {
            if (data) setCategories(data);
        });
    }, [setCategories]);

    return categories;
}

export function useCategoryGroups() {
    const { groups, setGroups } = useOperationStore();

    useEffect(() => {
        fetchApi<CategoriesGroup[]>('/categories-groups').then(data => {
            if (data) setGroups(data);
        });
    }, [setGroups]);

    return groups;
}

export const getOperation = (id: string) =>
    fetchApi<Operation>(`/operations/${id}`);

export const getOperationStats = () =>
    fetchApi<Stats>('/operations/stats');

export const updateOperation = async (
    id: string,
    updates: { amount?: number; description?: string; categoryId?: number }
) => {
    const updatedOperation = await fetchApi<Operation>(`/operations/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
    });

    if (updatedOperation) {
        useOperationStore.getState().updateOperation(id, updatedOperation);
    }

    return updatedOperation;
};

// Alias pour la mise à jour de catégorie
export const updateOperationCategory = (operationId: string, categoryId: string) =>
    updateOperation(operationId, { categoryId: Number(categoryId) });

export function useLoadCategoriesAndGroups() {
    const { setCategories, setGroups } = useOperationStore();

    useEffect(() => {
        const loadData = async () => {
            const [categoriesData, groupsData] = await Promise.all([
                fetchApi<Category[]>('/categories'),
                fetchApi<CategoriesGroup[]>('/categories-groups')
            ]);
            if (categoriesData) setCategories(categoriesData);
            if (groupsData) setGroups(groupsData);
        };

        loadData();
    }, [setCategories, setGroups]);
}

export function useOperationStats() {
    const { stats, setStats } = useOperationStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await fetchApi<Stats>('/operations/stats');
                if (data) setStats(data);
            } catch (error) {
                console.error('Error fetching operation stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [setStats]);

    return { stats, loading };
}
