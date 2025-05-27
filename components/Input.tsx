import { View, Text, TextInput, TextInputProps } from 'react-native';
import Colors from '~/constants/Colors';

interface InputProps extends TextInputProps {
    label?: string;
    suffix?: React.ReactNode;
}

export function Input({
    label,
    suffix,
    ...props
}: InputProps) {
    return (
        <View className={`relative`}>
            {label && (
                <Text className="absolute left-3 bg-white px-1 text-base z-10" style={{ color: Colors.labelOperation.date }}>
                    {label}
                </Text>
            )}
            <View className="flex-row items-center border border-blue-100 rounded-lg bg-white px-3 py-2 mt-3">
                <TextInput
                    className={`flex-1 text-lg py-1`}
                    style={{ color: Colors.labelOperation.date }}
                    placeholderTextColor={Colors.labelDescription}
                    {...props}
                />
                {suffix && <View className="ml-2">{suffix}</View>}
            </View>
        </View>
    );
}