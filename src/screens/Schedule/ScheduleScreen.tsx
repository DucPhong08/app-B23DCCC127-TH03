import React, { useMemo, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AppIcon } from '../../components/AppIcon';
import { EmptyState } from '../../components/EmptyState';
import { useApp } from '../../context/AppContext';
import { ScheduleItem } from '../../data/mockData';
import { RootStackNavigationProp } from '../../navigation/types';

const DAYS_FILTER = [
  { key: 0, label: 'Tất cả' },
  { key: 2, label: 'Thứ 2' },
  { key: 3, label: 'Thứ 3' },
  { key: 4, label: 'Thứ 4' },
  { key: 5, label: 'Thứ 5' },
  { key: 6, label: 'Thứ 6' },
  { key: 7, label: 'Thứ 7' },
];

export const ScheduleScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<RootStackNavigationProp>();
  const { schedule } = useApp();
  const [selectedDay, setSelectedDay] = useState<number>(0); // 0 = Tất cả

  // Lọc lịch học theo ngày được chọn
  const filteredSchedule = useMemo(() => {
    if (selectedDay === 0) {
      return schedule;
    }
    return schedule.filter(item => item.dayOfWeek === selectedDay);
  }, [schedule, selectedDay]);

  const renderScheduleCard = ({ item }: { item: ScheduleItem }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('ScheduleDetail', { scheduleItem: item })}>
        {/* Left Indicator Stripe */}
        <View style={styles.timeColumn}>
          <Text style={styles.dayBadgeText}>{item.dayName}</Text>
          <Text style={styles.periodText}>{item.periods}</Text>
        </View>

        {/* Right Info */}
        <View style={styles.contentColumn}>
          <View style={styles.cardHeader}>
            <View style={styles.codePill}>
              <Text style={styles.codePillText}>{item.subjectCode}</Text>
            </View>
            <View style={styles.roomPill}>
              <AppIcon name="location" size={12} color="#059669" />
              <Text style={styles.roomPillText}>Phòng {item.room}</Text>
            </View>
          </View>

          <Text style={styles.subjectTitle} numberOfLines={2}>
            {item.subjectName}
          </Text>

          <View style={styles.detailsRow}>
            <View style={styles.timeRow}>
              <AppIcon name="clock" size={13} color="#64748B" />
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
            <View style={styles.teacherRow}>
              <AppIcon name="user" size={13} color="#64748B" />
              <Text style={styles.teacherText} numberOfLines={1}>
                {item.teacher}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.arrowBox}>
          <AppIcon name="chevron-right" size={16} color="#94A3B8" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Screen Header */}
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Thời khóa biểu</Text>
        <Text style={styles.screenSubtitle}>
          Lịch học và địa điểm trong tuần
        </Text>

        {/* Horizontal Days Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daysScroll}>
          {DAYS_FILTER.map(day => {
            const isSelected = selectedDay === day.key;
            return (
              <TouchableOpacity
                key={day.key}
                style={[styles.dayTab, isSelected && styles.dayTabSelected]}
                onPress={() => setSelectedDay(day.key)}>
                <Text
                  style={[
                    styles.dayTabText,
                    isSelected && styles.dayTabTextSelected,
                  ]}>
                  {day.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Schedule List */}
      <FlatList
        data={filteredSchedule}
        keyExtractor={item => item.id}
        renderItem={renderScheduleCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="calendar"
            title="Không có lịch học"
            description={
              selectedDay === 0
                ? 'Chưa có lịch học nào trong hệ thống.'
                : 'Bạn không có buổi học nào vào ngày này. Hãy tận hưởng ngày nghỉ hoặc ôn bài nhé!'
            }
            actionText={selectedDay !== 0 ? 'Xem tất cả các ngày' : undefined}
            onAction={() => setSelectedDay(0)}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    paddingHorizontal: 16,
  },
  screenSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
    paddingHorizontal: 16,
  },
  daysScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  dayTab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  dayTabSelected: {
    backgroundColor: '#2563EB',
  },
  dayTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  dayTabTextSelected: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  timeColumn: {
    width: 68,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    paddingVertical: 10,
    marginRight: 12,
  },
  dayBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2563EB',
  },
  periodText: {
    fontSize: 11,
    color: '#3B82F6',
    marginTop: 3,
    fontWeight: '600',
  },
  contentColumn: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  codePill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  codePillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  roomPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 3,
  },
  roomPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#065F46',
  },
  subjectTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
    lineHeight: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#64748B',
  },
  teacherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  teacherText: {
    fontSize: 12,
    color: '#64748B',
  },
  arrowBox: {
    width: 20,
    alignItems: 'flex-end',
  },
});
