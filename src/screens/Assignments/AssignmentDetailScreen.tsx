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
import { AssignmentDetailRouteProp, RootStackNavigationProp } from '../../navigation/types';

export const AssignmentDetailScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<AssignmentDetailRouteProp>();
  const { assignmentId } = route.params;
  const { assignments, toggleAssignmentStatus } = useApp();

  const assignment = assignments.find(a => a.id === assignmentId);

  if (!assignment) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <AppIcon name="arrow-back" size={24} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.topBarTitle}>Chi tiết bài tập</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.notFoundCenter}>
          <Text style={styles.notFoundText}>Không tìm thấy bài tập này.</Text>
        </View>
      </View>
    );
  }

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
          Chi tiết bài tập
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View style={styles.subjectCodePill}>
              <Text style={styles.subjectCodePillText}>
                {assignment.subjectCode}
              </Text>
            </View>
            <StatusBadge
              isCompleted={assignment.isCompleted}
              isUrgent={assignment.isUrgent}
              size="medium"
            />
          </View>

          <Text style={styles.assignmentTitle}>{assignment.title}</Text>
          <Text style={styles.subjectNameText}>{assignment.subjectName}</Text>

          <View style={styles.dueDateBadge}>
            <AppIcon name="clock" size={14} color="#2563EB" />
            <Text style={styles.dueDateBadgeText}>
              Hạn nộp: {assignment.dueTime} ngày {assignment.dueDate}
            </Text>
          </View>
        </View>

        {/* Nội dung yêu cầu bài tập */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>Mô tả yêu cầu</Text>
          <Text style={styles.bodyText}>{assignment.description}</Text>
        </View>

        {/* Hình thức nộp bài */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>Hình thức nộp bài</Text>
          <View style={styles.formatBox}>
            <AppIcon name="task" size={20} color="#2563EB" />
            <Text style={styles.formatText}>{assignment.submissionFormat}</Text>
          </View>
        </View>

        {/* Nút cập nhật trạng thái */}
        <View style={styles.actionCard}>
          <Text style={styles.actionPrompt}>
            {assignment.isCompleted
              ? 'Bài tập này đã được đánh dấu là hoàn thành.'
              : 'Bạn đã hoàn thành xong bài tập này chưa?'}
          </Text>

          <TouchableOpacity
            style={[
              styles.statusButton,
              assignment.isCompleted
                ? styles.statusButtonReopen
                : styles.statusButtonComplete,
            ]}
            onPress={() => toggleAssignmentStatus(assignment.id)}>
            <AppIcon
              name={assignment.isCompleted ? 'close' : 'check'}
              size={18}
              color="#FFFFFF"
            />
            <Text style={styles.statusButtonText}>
              {assignment.isCompleted
                ? 'Đánh dấu là Chưa hoàn thành'
                : 'Đánh dấu là Đã hoàn thành'}
            </Text>
          </TouchableOpacity>
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
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subjectCodePill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  subjectCodePillText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2563EB',
  },
  assignmentTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 26,
    marginBottom: 6,
  },
  subjectNameText: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 14,
  },
  dueDateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 8,
    alignSelf: 'flex-start',
  },
  dueDateBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E40AF',
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
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
  },
  formatBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 14,
    gap: 12,
  },
  formatText: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 20,
    flex: 1,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    marginTop: 8,
  },
  actionPrompt: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 14,
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusButtonComplete: {
    backgroundColor: '#10B981',
  },
  statusButtonReopen: {
    backgroundColor: '#64748B',
  },
  statusButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  notFoundCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  notFoundText: {
    fontSize: 16,
    color: '#64748B',
  },
});
