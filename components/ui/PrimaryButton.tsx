import { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import Colors from '~/constants/Colors';

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
}

export const PrimaryButton = forwardRef<View, PrimaryButtonProps>(
  ({ title, disabled, ...props }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        activeOpacity={0.8}
        disabled={disabled}
        {...props}
        style={{backgroundColor: Colors.button.primary}}
        className={`w-full rounded-xl py-4 px-4 items-center ${disabled ? 'opacity-50' : ''} ${props.className || ''}`}
      >
        <Text className="text-white text-lg font-semibold text-center">{title}</Text>
      </TouchableOpacity>
    );
  }
);

PrimaryButton.displayName = 'PrimaryButton';