import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { api } from '../services/api';
import { colors } from '../theme/colors';

const HistoryScreen = ({ navigation }) => {
  const [historyList, setHistoryList] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [histRes, sumRes] = await Promise.all([
        api.getHistory(),
        api.getHistorySummary(),
      ]);
      setHistoryList(histRes.history || []);
      setSummary(sumRes);
    } catch (err) {
      console.log('Error fetching history:', err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation, fetchData]);

  const renderItem = ({ item }) => {
    const c = item.course;
    if (!c) return null;
    const cm = item.completedModules || {};

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('CourseDetail', { id: c._id, title: c.title })}
      >
        <View style={styles.cardHeader}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{c.category}</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              item.isCompleted ? styles.statusDone : styles.statusProgress,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                item.isCompleted ? styles.statusTextDone : styles.statusTextProgress,
              ]}
            >
              {item.isCompleted ? 'Selesai 100%' : `${item.progressPercent}% Selesai`}
            </Text>
          </View>
        </View>

        <Text style={styles.cardTitle}>{c.title}</Text>

        {/* Progress Bar */}
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${item.progressPercent}%`,
                backgroundColor: item.isCompleted ? colors.success : colors.primary,
              },
            ]}
          />
        </View>

        {/* Completed Modules Chips */}
        <View style={styles.modulesRow}>
          <View style={[styles.moduleChip, cm.article && styles.moduleChipDone]}>
            <Text style={[styles.moduleText, cm.article && styles.moduleTextDone]}>
              Artikel {cm.article ? '✓' : ''}
            </Text>
          </View>
          <View style={[styles.moduleChip, cm.video && styles.moduleChipDone]}>
            <Text style={[styles.moduleText, cm.video && styles.moduleTextDone]}>
              Video {cm.video ? '✓' : ''}
            </Text>
          </View>
          <View style={[styles.moduleChip, cm.quiz && styles.moduleChipDone]}>
            <Text style={[styles.moduleText, cm.quiz && styles.moduleTextDone]}>
              Kuis: {item.quizScore !== null ? `${item.quizScore}` : '-'}
            </Text>
          </View>
          <View style={[styles.moduleChip, cm.practice && styles.moduleChipDone]}>
            <Text style={[styles.moduleText, cm.practice && styles.moduleTextDone]}>
              Praktik {cm.practice ? '✓' : ''}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topHeader}>
        <Text style={styles.headerTitle}>Riwayat Pembelajaran</Text>
        <Text style={styles.headerSubtitle}>Pantau perkembangan belajar mandiri Anda</Text>
      </View>

      {/* Summary Stats Row */}
      {summary && (
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{summary.totalCourses}</Text>
            <Text style={styles.statLabel}>Diakses</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: colors.success }]}>
              {summary.completedCourses}
            </Text>
            <Text style={styles.statLabel}>Selesai</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{summary.avgQuizScore}</Text>
            <Text style={styles.statLabel}>Rata-Rata Kuis</Text>
          </View>
        </View>
      )}

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.centerText}>Memuat riwayat belajar...</Text>
        </View>
      ) : historyList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="clock" size={40} color={colors.textMuted} />
          <Text style={styles.emptyTitle}>Belum ada riwayat pembelajaran</Text>
          <Text style={styles.emptySubtitle}>
            Mulai pelajari materi di tab Home untuk melihat progres Anda di sini.
          </Text>
        </View>
      ) : (
        <FlatList
          data={historyList}
          renderItem={renderItem}
          keyExtractor={(item) => item._id || item.course?._id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                fetchData();
              }}
              colors={[colors.primary]}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topHeader: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#DBEAFE',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    padding: 16,
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  list: {
    padding: 16,
    paddingTop: 0,
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
  },
  categoryBadgeText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  statusProgress: {
    backgroundColor: '#F1F5F9',
  },
  statusDone: {
    backgroundColor: colors.successLight,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusTextProgress: {
    color: colors.primary,
  },
  statusTextDone: {
    color: colors.success,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
    lineHeight: 18,
  },
  progressBarBg: {
    height: 5,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: {
    height: '100%',
  },
  modulesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  moduleChip: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  moduleChipDone: {
    backgroundColor: colors.successLight,
    borderColor: '#BBF7D0',
  },
  moduleText: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '600',
  },
  moduleTextDone: {
    color: colors.success,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  centerText: {
    marginTop: 8,
    fontSize: 13,
    color: colors.primary,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginTop: 10,
  },
  emptySubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },
});

export default HistoryScreen;
