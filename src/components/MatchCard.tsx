import { StyleSheet, Text, View } from 'react-native';
import { type Match, formatKickoff, formatScore, getStatusLabel } from '../matches';

export function MatchCard({ match }: { match: Match }) {
  return (
    <View style={styles.card}>
      <Text style={styles.status}>{getStatusLabel(match.status)}</Text>
      <View style={styles.team}>
        <Text style={styles.role}>Хозяева</Text>
        <Text style={styles.name}>{match.home.name}</Text>
      </View>
      <View style={styles.team}>
        <Text style={styles.role}>Гости</Text>
        <Text style={styles.name}>{match.away.name}</Text>
      </View>
      <Text style={match.score === null ? styles.metadata : styles.score}>
        {formatScore(match.score)}
      </Text>
      <Text style={styles.metadata}>{formatKickoff(match.startsAt)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16, gap: 8, borderWidth: 1, borderColor: '#d1d5db',
    borderRadius: 12, backgroundColor: '#f9fafb', marginBottom: 12,
  },
  status: { fontSize: 14, lineHeight: 20, fontWeight: '600', color: '#111827' },
  team: { gap: 4, minWidth: 0 },
  role: { fontSize: 14, lineHeight: 20, color: '#4b5563' },
  name: { fontSize: 16, lineHeight: 24, fontWeight: '600', color: '#111827', flexShrink: 1 },
  score: { fontSize: 20, lineHeight: 28, fontWeight: '700', color: '#111827' },
  metadata: { fontSize: 14, lineHeight: 20, color: '#4b5563' },
});
