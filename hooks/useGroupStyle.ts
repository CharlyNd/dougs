import Colors from '~/constants/Colors';

interface GroupStyle {
  bg: string;
  text: string;
}

export function useGroupStyle(colorName?: string): GroupStyle {
  const getGroupStyle = (color: string): GroupStyle => {
    switch (color) {
      case 'green':
        return { bg: Colors.green.bg, text: Colors.green.textTag };
      case 'blue':
        return { bg: Colors.blue.bg, text: Colors.blue.text };
      case 'purple':
        return { bg: Colors.purple.bg, text: Colors.purple.text };
      default:
        return { bg: Colors.gray.bg, text: Colors.labelSummary };
    }
  };

  return colorName ? getGroupStyle(colorName) : { bg: Colors.gray.bg, text: Colors.labelSummary };
} 