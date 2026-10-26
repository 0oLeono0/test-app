import { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { MatchCard } from '../components/MatchCard';
import { useMatches } from '../hooks/useMatches';
import { type MatchFilter, filterMatches } from '../matches';

const filters: { value: MatchFilter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'upcoming', label: 'Предстоящие' },
  { value: 'finished', label: 'Завершённые' },
];

export function MatchesScreen() {
  const { state, retry } = useMatches();
  const [filter, setFilter] = useState<MatchFilter>('all');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Матчи тура</Text>
      {state.status === 'loading' && (
        <View style={styles.message}>
          <ActivityIndicator color="#1d4ed8" accessibilityLabel="Загрузка матчей" />
          <Text style={styles.body}>Загрузка матчей…</Text>
        </View>
      )}
      {state.status === 'error' && (
        <View style={styles.message}>
          <Text style={styles.error}>Не удалось загрузить матчи</Text>
          <Text style={styles.body}>Проверьте подключение к интернету и попробуйте ещё раз.</Text>
          <Pressable accessibilityRole="button" onPress={retry} style={styles.button}>
            <Text style={styles.buttonText}>Повторить</Text>
          </Pressable>
        </View>
      )}
      {state.status === 'success' && (
        <>
          <Text style={styles.round}>Тур {state.data.round}</Text>
          <View style={styles.filters}>
            {filters.map(({ value, label }) => (
              <Pressable
                key={value}
                accessibilityRole="button"
                accessibilityState={{ selected: filter === value }}
                aria-pressed={filter === value}
                onPress={() => setFilter(value)}
                style={[styles.filter, filter === value && styles.filterSelected]}
              >
                <Text style={[styles.filterText, filter === value && styles.buttonText]}>{label}</Text>
              </Pressable>
            ))}
          </View>
          <FlatList
            data={filterMatches(state.data.matches, filter)}
            keyExtractor={(match) => match.id}
            renderItem={({ item }) => <MatchCard match={item} />}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.message}>
                <Text style={styles.emptyTitle}>
                  {state.data.matches.length === 0 ? 'Матчей пока нет' : 'Нет матчей по этому фильтру'}
                </Text>
                <Text style={styles.body}>
                  {state.data.matches.length === 0
                    ? 'Матчи появятся здесь, когда будет опубликовано расписание.'
                    : 'Выберите другой фильтр, чтобы увидеть матчи.'}
                </Text>
              </View>
            }
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    color: '#111827',
  },
  round: { fontSize: 16, lineHeight: 24, color: '#4b5563', marginVertical: 16 },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  filter: { minHeight: 44, padding: 12, borderRadius: 8, backgroundColor: '#f3f4f6', justifyContent: 'center' },
  filterSelected: { backgroundColor: '#1d4ed8' },
  filterText: { fontSize: 16, lineHeight: 24, color: '#111827' },
  listContent: { paddingBottom: 16 },
  message: { gap: 12, paddingVertical: 24, alignItems: 'flex-start' },
  body: { fontSize: 16, lineHeight: 24, color: '#4b5563' },
  error: { fontSize: 16, lineHeight: 24, fontWeight: '600', color: '#b91c1c' },
  emptyTitle: { fontSize: 16, lineHeight: 24, fontWeight: '600', color: '#111827' },
  button: {
    minHeight: 44, paddingHorizontal: 16, paddingVertical: 12,
    backgroundColor: '#1d4ed8', borderRadius: 8, justifyContent: 'center',
  },
  buttonText: { fontSize: 16, lineHeight: 24, fontWeight: '600', color: '#ffffff' },
});
