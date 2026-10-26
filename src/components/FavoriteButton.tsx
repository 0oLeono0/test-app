import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  active: boolean;
  onPress: () => void;
  matchLabel?: string;
};

// Звёздочка «в избранное».
export function FavoriteButton({ active, onPress, matchLabel }: Props) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={12}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      aria-pressed={active}
      style={styles.button}
      accessibilityLabel={`${active ? 'Убрать из избранного' : 'Добавить в избранное'}${matchLabel ? `: ${matchLabel}` : ''}`}
    >
      <Text style={[styles.star, active && styles.active]}>{active ? '★' : '☆'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { minWidth: 44, minHeight: 44, justifyContent: 'center', alignItems: 'center' },
  star: {
    fontSize: 22,
    color: '#9ca3af',
  },
  active: {
    color: '#ef3124',
  },
});
