import React from 'react';
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
import { useApp } from '../../context/AppContext';
import { SubjectGrade } from '../../data/mockData';
import { RootStackNavigationProp } from '../../navigation/types';

export const GradeDetailScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<RootStackNavigationProp>();
  const { studentProfile, grades } = useApp();

  const renderGradeCard = ({ item }: { item: SubjectGrade }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.codeBadge}>
            <Text style={styles.codeText}>{item.subjectCode}</Text>
          </View>
          <View style={styles.letterBadge}>
            <Text style={styles.letterText}>Điểm {item.letterGrade}</Text>
          </View>
        </View>

        <Text style={styles.subjectName}>{item.subjectName}</Text>
        <Text style={styles.creditInfo}>{item.credits} Tín chỉ</Text>

        <View style={styles.scoreGrid}>
          <View style={styles.scoreCol}>
            <Text style={styles.scoreLabel}>Chuyên cần (10%)</Text>
            <Text style={styles.scoreValue}>{item.attendanceScore.toFixed(1)}</Text>
          </View>

          <View style={styles.scoreCol}>
            <Text style={styles.scoreLabel}>Bài tập (20%)</Text>
            <Text style={styles.scoreValue}>{item.assignmentScore.toFixed(1)}</Text>
          </View>

          <View style={styles.scoreCol}>
            <Text style={styles.scoreLabel}>Giữa kỳ (20%)</Text>
            <Text style={styles.scoreValue}>{item.midtermScore.toFixed(1)}</Text>
          </View>

          <View style={styles.scoreCol}>
            <Text style={styles.scoreLabel}>Cuối kỳ (50%)</Text>
            <Text style={styles.scoreValue}>{item.finalScore.toFixed(1)}</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.totalLabel}>Tổng kết hệ 10:</Text>
          <Text style={styles.totalValue}>{item.totalScore10.toFixed(1)}</Text>
          <View style={styles.statusPill}>
            <Text style={styles.statusPillText}>Đạt</Text>
          </View>
        </View>
      </View>
    );
  };

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
          Kết quả học tập chi tiết
        </Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={grades}
        keyExtractor={item => item.id}
        renderItem={renderGradeCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.summaryCard}>
            <View style={styles.summaryTop}>
              <View>
                <Text style={styles.summaryTitle}>Bảng điểm tích lũy</Text>
                <Text style={styles.summarySubtitle}>
                  Sinh viên: {studentProfile.fullName} ({studentProfile.studentId})
                </Text>
              </View>
              <View style={styles.gpaPill}>
                <Text style={styles.gpaPillText}>
                  GPA: {studentProfile.gpa.toFixed(2)}
                </Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statVal}>{studentProfile.completedCredits}</Text>
                <Text style={styles.statSub}>Tín chỉ đạt</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statVal}>{studentProfile.totalCredits}</Text>
                <Text style={styles.statSub}>Tổng tín chỉ</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={[styles.statVal, { color: '#059669' }]}>Giỏi</Text>
                <Text style={styles.statSub}>Xếp loại</Text>
              </View>
            </View>
          </View>
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
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  summaryCard: {
    backgroundColor: '#1E293B',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  summarySubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  gpaPill: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  gpaPillText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    paddingVertical: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statVal: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  statSub: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  codeBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  codeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2563EB',
  },
  letterBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  letterText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#059669',
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  creditInfo: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 12,
  },
  scoreGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  scoreCol: {
    alignItems: 'center',
    flex: 1,
  },
  scoreLabel: {
    fontSize: 10,
    color: '#64748B',
    marginBottom: 4,
    textAlign: 'center',
  },
  scoreValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
    justifyContent: 'flex-end',
    gap: 8,
  },
  totalLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  statusPill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
});
