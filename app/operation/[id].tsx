import { useLocalSearchParams, useNavigation } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';
import operations from '~/mockData/operations.json';
import categories from '~/mockData/categories.json';
import categoryGroups from '~/mockData/categoriesGroups.json';
import { useState, useEffect } from 'react';
import { Input } from '~/components/Input';
import Colors from '~/constants/Colors';
import { PrimaryButton } from '~/components/PrimaryButton';
import { SecondaryButton } from '~/components/SecondaryButton';

export default function OperationDetailScreen() {
    const { id } = useLocalSearchParams();
    const navigation = useNavigation();
    const operation = operations.find(op => String(op.id) === String(id));

    useEffect(() => {
        if (operation) {
            navigation.setOptions({
                title: operation.label || operation.description || 'Opération',
            });
        }
    }, [operation, navigation]);

    const [amount, setAmount] = useState(operation ? String(operation.amount) : '');
    const [description, setDescription] = useState(operation ? operation.description : '');

    if (!operation) return <Text className="m-6">Opération introuvable</Text>;

    const category = categories.find(cat => String(cat.id) === String(operation.categoryId));
    const group = category ? categoryGroups.find(g => String(g.id) === String((category as any).groupId)) : undefined;

    return (
        <ScrollView className="flex-1 bg-white px-4" contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
            <View className="pt-4 px-2">
                <Text className="text-xl mb-4" style={{ color: Colors.labelOperation.date }}>
                    {new Date(operation.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </Text>
            </View>
            <View className="gap-4">
                <Input
                    label="Montant"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                    placeholder="Ajouter un montant"
                    accessible
                    accessibilityLabel="Montant"
                    suffix={<Text className="text-3xl" style={{ color: Colors.labelOperation.date }}>€</Text>}
                />
                <Input
                    label="Description"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={4}
                    placeholder="Ajouter une description"
                    accessible
                    accessibilityLabel="Description"
                />
            </View>
            <View className="pt-8">
                <SecondaryButton
                    title={category && typeof (category as any).name === 'string'
                        ? (category as any).name
                        : 'Sélectionner une catégorie'}
                    onPress={() => { console.log("selectionner une catégorie") }}
                    className="mb-6"
                />
            </View>
            {/* Spacer */}
            <View className="flex-1" />
            <View className="p-4">
                <PrimaryButton
                    title="Enregistrer"
                    onPress={() => { console.log("enregistrer") }}
                />
            </View>
        </ScrollView>
    );
}