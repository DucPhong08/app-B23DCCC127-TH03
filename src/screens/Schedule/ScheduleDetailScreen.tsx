import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppIcon } from '../../components/AppIcon';
import { RootStackNavigationProp, ScheduleDetailRouteProp } from '../../navigation/types';

export const ScheduleDetailScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<ScheduleDetailRouteProp>();
  const { scheduleItem } = route.params;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Bar with Back Button */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <AppIcon name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle} numberOfLines={1}>
          Chi tiết buổi học
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.dayBadge}>
            <Text style={styles.dayBadgeText}>
              {scheduleItem.dayName} • {scheduleItem.periods}
            </Text>
          </View>
          <Text style={styles.subjectName}>{scheduleItem.subjectName}</Text>
          <View style={styles.timeTag}>
            <AppIcon name="clock" size={14} color="#FFFFFF" />
            <Text style={styles.timeTagText}>{scheduleItem.time}</Text>
          </View>
        </View>

        {/* Địa điểm & Giảng viên */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>Địa điểm & Giảng đường</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaIcon}>
              <AppIcon name="location" size={18} color="#2563EB" />
            </View>
            <View style={styles.metaContent}>
              <Text style={styles.metaLabel}>Phòng học</Text>
              <Text style={styles.metaValue}>Phòng {scheduleItem.room}</Text>
              <Text style={styles.metaSubValue}>{scheduleItem.building}</Text>
            </View>
          </View>

          <View style={styles.metaDivider} />

          <View style={styles.metaRow}>
            <View style={styles.metaIcon}>
              <AppIcon name="school" size={18} color="#2563EB" />
            </View>
            <View style={styles.metaContent}>
              <Text style={styles.metaLabel}>Hình thức buổi học</Text>
              <Text style={styles.metaValue}>{scheduleItem.type}</Text>
            </View>
          </View>

          <View style={styles.metaDivider} />

          <View style={styles.metaRow}>
            <View style={styles.metaIcon}>
              <AppIcon name="user" size={18} color="#2563EB" />
            </View>
            <View style={styles.metaContent}>
              <Text style={styles.metaLabel}>Giảng viên phụ trách</Text>
              <Text style={styles.metaValue}>{scheduleItem.teacher}</Text>
            </View>
          </View>
        </View>

        {/* Ghi chú buổi học */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>Ghi chú & Chuẩn bị</Text>
          <View style={styles.noteBox}>
            <AppIcon name="alert" size={18} color="#D97706" />
            <Text style={styles.noteText}>{scheduleItem.note}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBarTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  placeholder: {
    width: 36,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  dayBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 10,
  },
  dayBadgeText: {
    color: '#93C5FD',
    fontSize: 12,
    fontWeight: '700',
  },
  subjectName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 28,
    marginBottom: 12,
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeTagText: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  metaIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  metaContent: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 2,
  },
  metaValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  metaSubValue: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  metaDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  noteBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  noteText: {
    fontSize: 13,
    color: '#92400E',
    lineHeight: 20,
    flex: 1,
  },
});
