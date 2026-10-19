import React from 'react';
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
import { StatusBadge } from '../../components/StatusBadge';
import { useApp } from '../../context/AppContext';
import { Assignment, Subject } from '../../data/mockData';
import { BottomTabNavProp, RootStackNavigationProp } from '../../navigation/types';

export const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const rootNav = useNavigation<RootStackNavigationProp>();
  const tabNav = useNavigation<BottomTabNavProp>();
  const { studentProfile, subjects, upcomingAssignments, toggleAssignmentStatus } = useApp();

  const renderAssignmentItem = ({ item }: { item: Assignment }) => (
    <TouchableOpacity
      style={styles.assignmentCard}
      activeOpacity={0.7}
      onPress={() => rootNav.navigate('AssignmentDetail', { assignmentId: item.id })}>
      <View style={styles.assignmentHeader}>
        <View style={styles.subjectTag}>
          <Text style={styles.subjectTagText}>{item.subjectCode}</Text>
        </View>
        <StatusBadge isCompleted={item.isCompleted} isUrgent={item.isUrgent} />
      </View>

      <Text style={styles.assignmentTitle} numberOfLines={2}>
        {item.title}
      </Text>

      <View style={styles.assignmentFooter}>
        <View style={styles.dueDateRow}>
          <AppIcon name="clock" size={14} color="#64748B" />
          <Text style={styles.dueDateText}>Hạn: {item.dueTime} - {item.dueDate}</Text>
        </View>

        <TouchableOpacity
          style={[styles.checkBtn, item.isCompleted && styles.checkBtnDone]}
          onPress={() => toggleAssignmentStatus(item.id)}>
          <AppIcon
            name="check"
            size={14}
            color={item.isCompleted ? '#FFFFFF' : '#2563EB'}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderSubjectItem = ({ item }: { item: Subject }) => (
    <TouchableOpacity
      style={styles.subjectCard}
      activeOpacity={0.7}
      onPress={() => rootNav.navigate('SubjectDetail', { subject: item })}>
      <View style={styles.subjectIconBox}>
        <AppIcon name="book" size={20} color="#2563EB" />
      </View>
      <View style={styles.subjectInfo}>
        <Text style={styles.subjectName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.subjectMeta}>
          {item.code} • {item.credits} tín chỉ • Phòng {item.room}
        </Text>
        <Text style={styles.subjectSchedule}>
          {item.scheduleDay} ({item.scheduleTime})
        </Text>
      </View>
      <AppIcon name="chevron-right" size={18} color="#94A3B8" />
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}>
      {/* Header Profile Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerLeft}>
          <Text style={styles.greetingText}>Xin chào</Text>
          <Text style={styles.studentName}>{studentProfile.fullName}</Text>
          <View style={styles.studentMetaRow}>
            <View style={styles.idBadge}>
              <Text style={styles.idBadgeText}>MSSV: {studentProfile.studentId}</Text>
            </View>
            <Text style={styles.classText}>{studentProfile.className}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.avatarButton}
          onPress={() => tabNav.navigate('ProfileTab')}>
          <Text style={styles.avatarText}>
            {studentProfile.fullName.charAt(0)}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Thống kê nhanh */}
      <View style={styles.statsContainer}>
        <TouchableOpacity
          style={styles.statBox}
          activeOpacity={0.8}
          onPress={() => tabNav.navigate('SubjectsTab')}>
          <View style={[styles.statIconCircle, { backgroundColor: '#EFF6FF' }]}>
            <AppIcon name="book" size={20} color="#2563EB" />
          </View>
          <Text style={styles.statValue}>{subjects.length}</Text>
          <Text style={styles.statLabel}>Môn học</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.statBox}
          activeOpacity={0.8}
          onPress={() => tabNav.navigate('AssignmentsTab')}>
          <View style={[styles.statIconCircle, { backgroundColor: '#FEF3C7' }]}>
            <AppIcon name="task" size={20} color="#D97706" />
          </View>
          <Text style={[styles.statValue, { color: '#B45309' }]}>
            {upcomingAssignments.length}
          </Text>
          <Text style={styles.statLabel}>Bài tập cần nộp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.statBox}
          activeOpacity={0.8}
          onPress={() => rootNav.navigate('GradeDetail')}>
          <View style={[styles.statIconCircle, { backgroundColor: '#ECFDF5' }]}>
            <AppIcon name="award" size={20} color="#059669" />
          </View>
          <Text style={[styles.statValue, { color: '#059669' }]}>
            {studentProfile.gpa.toFixed(2)}
          </Text>
          <Text style={styles.statLabel}>Điểm GPA</Text>
        </TouchableOpacity>
      </View>

      {/* Section 1: Bài tập sắp đến hạn */}
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Bài tập sắp đến hạn</Text>
          <Text style={styles.sectionSubtitle}>
            {upcomingAssignments.length > 0
              ? `Bạn còn ${upcomingAssignments.length} bài tập chưa hoàn thành`
              : 'Tuyệt vời! Bạn đã hoàn thành tất cả bài tập'}
          </Text>
        </View>
        <TouchableOpacity onPress={() => tabNav.navigate('AssignmentsTab')}>
          <Text style={styles.seeAllText}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>

      {upcomingAssignments.length > 0 ? (
        <FlatList
          data={upcomingAssignments.slice(0, 4)}
          keyExtractor={item => item.id}
          renderItem={renderAssignmentItem}
          scrollEnabled={false}
        />
      ) : (
        <View style={styles.emptyNotice}>
          <AppIcon name="check-circle" size={24} color="#10B981" />
          <Text style={styles.emptyNoticeText}>
            Không có bài tập nào sắp đến hạn cần xử lý.
          </Text>
        </View>
      )}

      {/* Section 2: Danh sách môn học đang học */}
      <View style={[styles.sectionHeader, { marginTop: 24 }]}>
        <View>
          <Text style={styles.sectionTitle}>Môn học đang học</Text>
          <Text style={styles.sectionSubtitle}>
            Học kỳ hiện tại ({subjects.length} môn)
          </Text>
        </View>
        <TouchableOpacity onPress={() => tabNav.navigate('SubjectsTab')}>
          <Text style={styles.seeAllText}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={subjects.slice(0, 4)}
        keyExtractor={item => item.id}
        renderItem={renderSubjectItem}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginTop: 8,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  bannerLeft: {
    flex: 1,
  },
  greetingText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  studentName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginVertical: 4,
  },
  studentMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  idBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  idBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
  classText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  avatarButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  statIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  seeAllText: {
    fontSize: 13,
    color: '#2563EB',
    fontWeight: '700',
  },
  assignmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subjectTag: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  subjectTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  assignmentTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 20,
    marginBottom: 10,
  },
  assignmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
    paddingTop: 8,
  },
  dueDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dueDateText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  checkBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
  },
  checkBtnDone: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  emptyNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    gap: 10,
  },
  emptyNoticeText: {
    fontSize: 13,
    color: '#166534',
    fontWeight: '500',
    flex: 1,
  },
  subjectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  subjectIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  subjectMeta: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 2,
  },
  subjectSchedule: {
    fontSize: 11,
    color: '#2563EB',
    fontWeight: '600',
  },
});
