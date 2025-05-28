import { Entypo } from '@expo/vector-icons';
import { forwardRef } from 'react';
import { Text, Pressable, PressableProps, View } from 'react-native';
import Colors from '~/constants/Colors';

interface SecondaryButtonProps extends PressableProps {
  title: string;
}

export const SecondaryButton = forwardRef<View, SecondaryButtonProps>(
  ({ title, disabled, ...props }, ref) => {
    return (
      <Pressable
        ref={ref}
        disabled={disabled}
        {...props}
        className={`w-full rounded-2xl py-4 px-4 flex-row items-center ${disabled ? 'opacity-50' : ''} ${props.className || ''}`}
        style={{ backgroundColor: Colors.green.bg }}
      >
        <Text className="font-semibold text-base flex-1" style={{ color: Colors.green.textTag }}>{title}</Text>
        <Entypo name="chevron-thin-right" size={20} color={Colors.labelSummary} />
      </Pressable>
    );
  }
);

SecondaryButton.displayName = 'SecondaryButton';