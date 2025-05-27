import { View, TextInput } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

interface OperationSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export function OperationSearch({ value, onChange }: OperationSearchProps) {
    return (
        <View className="flex-row items-center py-3 mx-6 rounded-lg border border-gray-200 bg-white">
            <EvilIcons name="search" size={26} color="black" className="absolute left-4" />
            <TextInput
                className="flex-1 text-lg pl-14"
                placeholder="Rechercher un élément"
                value={value}
                onChangeText={onChange}
                accessibilityLabel="Recherche"
            />
        </View>
    );
} 