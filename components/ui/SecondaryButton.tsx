import { Entypo } from '@expo/vector-icons';
import { forwardRef } from 'react';
import { Text, Pressable, PressableProps, View } from 'react-native';
import { useGroupStyle } from '~/hooks/useGroupStyle';

interface SecondaryButtonProps extends PressableProps {
  title: string;
  color?: string;
}

export const SecondaryButton = forwardRef<View, SecondaryButtonProps>(
  ({ title, disabled, color, ...props }, ref) => {
    const style = useGroupStyle(color);

    return (
      <Pressable
        ref={ref}
        disabled={disabled}
        {...props}
        className={`w-full rounded-2xl py-4 px-4 flex-row items-center ${disabled ? 'opacity-50' : ''} ${props.className || ''}`}
        style={{ backgroundColor: style.bg }}
      >
        <Text className="font-semibold text-base flex-1" style={{ color: style.text }}>{title}</Text>
        <Entypo name="chevron-thin-right" size={20} color={style.text} />
      </Pressable>
    );
  }
);

SecondaryButton.displayName = 'SecondaryButton';