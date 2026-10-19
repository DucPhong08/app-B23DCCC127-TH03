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
import { StatusBadge } from '../../components/StatusBadge';
import { useApp } from '../../context/AppContext';
import { RootStackNavigationProp, SubjectDetailRouteProp } from '../../navigation/types';

export const SubjectDetailScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<SubjectDetailRouteProp>();
  const { subject } = route.params;
  const { assignments } = useApp();

  // Các bài tập thuộc môn này
  const subjectAssignments = assignments.filter(a => a.subjectId === subject.id);

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
          Chi tiết môn học
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.codeRow}>
            <View style={styles.codeBadge}>
              <Text style={styles.codeBadgeText}>{subject.code}</Text>
            </View>
            <View style={styles.creditBadge}>
              <Text style={styles.creditBadgeText}>{subject.credits} Tín chỉ</Text>
            </View>
          </View>
          <Text style={styles.subjectName}>{subject.name}</Text>
          <Text style={styles.semesterText}>{subject.semester}</Text>
        </View>

        {/* Thông tin giảng viên & Lớp học */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>Thông tin giảng dạy</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaIcon}>
              <AppIcon name="user" size={18} color="#2563EB" />
            </View>
            <View style={styles.metaContent}>
              <Text style={styles.metaLabel}>Giảng viên phụ trách</Text>
              <Text style={styles.metaValue}>{subject.teacher}</Text>
              <Text style={styles.metaSubValue}>{subject.teacherEmail}</Text>
            </View>
          </View>

          <View style={styles.metaDivider} />

          <View style={styles.metaRow}>
            <View style={styles.metaIcon}>
              <AppIcon name="location" size={18} color="#2563EB" />
            </View>
            <View style={styles.metaContent}>
              <Text style={styles.metaLabel}>Phòng học</Text>
              <Text style={styles.metaValue}>Phòng {subject.room}</Text>
            </View>
          </View>

          <View style={styles.metaDivider} />

          <View style={styles.metaRow}>
            <View style={styles.metaIcon}>
              <AppIcon name="calendar" size={18} color="#2563EB" />
            </View>
            <View style={styles.metaContent}>
              <Text style={styles.metaLabel}>Lịch học hàng tuần</Text>
              <Text style={styles.metaValue}>
                {subject.scheduleDay} ({subject.scheduleTime})
              </Text>
            </View>
          </View>
        </View>

        {/* Giới thiệu môn học */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>Mô tả học phần</Text>
          <Text style={styles.descriptionText}>{subject.description}</Text>
        </View>

        {/* Đề cương chi tiết */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>Nội dung chương trình</Text>
          {subject.syllabus.map((topic, index) => (
            <View key={index} style={styles.syllabusItem}>
              <View style={styles.indexCircle}>
                <Text style={styles.indexText}>{index + 1}</Text>
              </View>
              <Text style={styles.topicText}>{topic}</Text>
            </View>
          ))}
        </View>

        {/* Bài tập liên quan */}
        {subjectAssignments.length > 0 && (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeading}>Bài tập học phần</Text>
            {subjectAssignments.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.assignmentItem}
                onPress={() => navigation.navigate('AssignmentDetail', { assignmentId: item.id })}>
                <View style={styles.assignmentItemLeft}>
                  <Text style={styles.assignmentItemTitle}>{item.title}</Text>
                  <Text style={styles.assignmentItemDue}>Hạn nộp: {item.dueDate}</Text>
                </View>
                <StatusBadge isCompleted={item.isCompleted} isUrgent={item.isUrgent} />
              </TouchableOpacity>
            ))}
          </View>
        )}
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
    backgroundColor: '#2563EB',
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  codeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  codeBadgeText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
  },
  creditBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  creditBadgeText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
  subjectName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 28,
    marginBottom: 6,
  },
  semesterText: {
    fontSize: 13,
    color: '#BFDBFE',
    fontWeight: '500',
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
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  metaSubValue: {
    fontSize: 13,
    color: '#2563EB',
    marginTop: 2,
  },
  metaDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
  },
  syllabusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  indexCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indexText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
  topicText: {
    fontSize: 14,
    color: '#334155',
    flex: 1,
    lineHeight: 20,
  },
  assignmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  assignmentItemLeft: {
    flex: 1,
    marginRight: 8,
  },
  assignmentItemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  assignmentItemDue: {
    fontSize: 12,
    color: '#64748B',
  },
});
