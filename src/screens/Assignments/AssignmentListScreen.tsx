import React, { useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AppIcon } from '../../components/AppIcon';
import { EmptyState } from '../../components/EmptyState';
import { StatusBadge } from '../../components/StatusBadge';
import { useApp } from '../../context/AppContext';
import { Assignment } from '../../data/mockData';
import { RootStackNavigationProp } from '../../navigation/types';

type FilterType = 'all' | 'pending' | 'completed';

export const AssignmentListScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<RootStackNavigationProp>();
  const { assignments, toggleAssignmentStatus } = useApp();
  const [filter, setFilter] = useState<FilterType>('all');

  const pendingCount = assignments.filter(a => !a.isCompleted).length;
  const completedCount = assignments.filter(a => a.isCompleted).length;

  const filteredAssignments = useMemo(() => {
    if (filter === 'pending') {
      return assignments.filter(a => !a.isCompleted);
    }
    if (filter === 'completed') {
      return assignments.filter(a => a.isCompleted);
    }
    return assignments;
  }, [assignments, filter]);

  const renderAssignmentCard = ({ item }: { item: Assignment }) => {
    return (
      <TouchableOpacity
        style={[styles.card, item.isCompleted && styles.cardCompleted]}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('AssignmentDetail', { assignmentId: item.id })}>
        <View style={styles.cardTop}>
          <View style={styles.subjectPill}>
            <Text style={styles.subjectPillText}>{item.subjectCode}</Text>
          </View>
          <StatusBadge isCompleted={item.isCompleted} isUrgent={item.isUrgent} />
        </View>

        <Text
          style={[styles.assignmentTitle, item.isCompleted && styles.titleCompleted]}
          numberOfLines={2}>
          {item.title}
        </Text>

        <Text style={styles.subjectName} numberOfLines={1}>
          Môn: {item.subjectName}
        </Text>

        <View style={styles.cardFooter}>
          <View style={styles.dueDateBox}>
            <AppIcon name="clock" size={14} color="#64748B" />
            <Text style={styles.dueDateText}>
              {item.dueTime} - {item.dueDate}
            </Text>
          </View>

          {/* Toggle Button */}
          <TouchableOpacity
            style={[styles.toggleBtn, item.isCompleted && styles.toggleBtnActive]}
            onPress={() => toggleAssignmentStatus(item.id)}>
            <AppIcon
              name="check"
              size={14}
              color={item.isCompleted ? '#FFFFFF' : '#64748B'}
            />
            <Text
              style={[
                styles.toggleBtnText,
                item.isCompleted && styles.toggleBtnTextActive,
              ]}>
              {item.isCompleted ? 'Đã xong' : 'Hoàn thành'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Screen Header */}
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Danh sách Bài tập</Text>
        <Text style={styles.screenSubtitle}>
          Quản lý deadline và tiến độ nộp bài
        </Text>

        {/* Filter Tabs */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.filterTab, filter === 'all' && styles.filterTabActive]}
            onPress={() => setFilter('all')}>
            <Text
              style={[
                styles.filterTabText,
                filter === 'all' && styles.filterTabTextActive,
              ]}>
              Tất cả ({assignments.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterTab, filter === 'pending' && styles.filterTabActive]}
            onPress={() => setFilter('pending')}>
            <Text
              style={[
                styles.filterTabText,
                filter === 'pending' && styles.filterTabTextActive,
              ]}>
              Chưa xong ({pendingCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterTab, filter === 'completed' && styles.filterTabActive]}
            onPress={() => setFilter('completed')}>
            <Text
              style={[
                styles.filterTabText,
                filter === 'completed' && styles.filterTabTextActive,
              ]}>
              Đã xong ({completedCount})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Assignment List */}
      <FlatList
        data={filteredAssignments}
        keyExtractor={item => item.id}
        renderItem={renderAssignmentCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="task"
            title="Không có bài tập"
            description={
              filter === 'pending'
                ? 'Tuyệt vời! Bạn không còn bài tập nào chưa hoàn thành.'
                : filter === 'completed'
                ? 'Bạn chưa hoàn thành bài tập nào. Hãy bắt đầu làm bài nhé!'
                : 'Hiện tại chưa có bài tập nào được giao.'
            }
            actionText={filter !== 'all' ? 'Xem tất cả bài tập' : undefined}
            onAction={() => setFilter('all')}
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
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  screenSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
    marginBottom: 12,
  },
  filterTab: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  filterTabActive: {
    backgroundColor: '#2563EB',
  },
  filterTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardCompleted: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    opacity: 0.85,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subjectPill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  subjectPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#2563EB',
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 22,
    marginBottom: 4,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#64748B',
  },
  subjectName: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  dueDateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dueDateText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  toggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  toggleBtnActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  toggleBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  toggleBtnTextActive: {
    color: '#FFFFFF',
  },
});
