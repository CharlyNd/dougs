import { Entypo } from '@expo/vector-icons';
import { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import Colors from '~/constants/Colors';

interface SecondaryButtonProps extends TouchableOpacityProps {
  title: string;
}

export const SecondaryButton = forwardRef<View, SecondaryButtonProps>(
  ({ title, disabled, ...props }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        activeOpacity={0.8}
        disabled={disabled}
        {...props}
        style={{ backgroundColor: Colors.green.bg }}
        className={`
          w-full
          rounded-2xl
          py-4
          px-4
          flex-row
          items-center
          ${disabled ? 'opacity-50' : ''}
          ${props.className || ''}
        `}
      >
        <Text className="font-semibold text-lg flex-1" style={{ color: Colors.green.textTag }}>{title}</Text>
        <Entypo name="chevron-thin-right" size={20} color={Colors.labelSummary} />
      </TouchableOpacity>
    );
  }
);

SecondaryButton.displayName = 'SecondaryButton';