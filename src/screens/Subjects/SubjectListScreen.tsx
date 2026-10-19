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
import { SearchBar } from '../../components/SearchBar';
import { useApp } from '../../context/AppContext';
import { Subject } from '../../data/mockData';
import { RootStackNavigationProp } from '../../navigation/types';

export const SubjectListScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<RootStackNavigationProp>();
  const { subjects } = useApp();
  const [keyword, setKeyword] = useState<string>('');

  // Lọc môn học theo tên hoặc mã môn học
  const filteredSubjects = useMemo(() => {
    const trimmed = keyword.trim().toLowerCase();
    if (!trimmed) {
      return subjects;
    }
    return subjects.filter(
      item =>
        item.name.toLowerCase().includes(trimmed) ||
        item.code.toLowerCase().includes(trimmed),
    );
  }, [subjects, keyword]);

  const renderSubjectCard = ({ item }: { item: Subject }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('SubjectDetail', { subject: item })}>
        <View style={styles.cardHeader}>
          <View style={styles.codeBadge}>
            <Text style={styles.codeText}>{item.code}</Text>
          </View>
          <View style={styles.creditBadge}>
            <Text style={styles.creditText}>{item.credits} Tín chỉ</Text>
          </View>
        </View>

        <Text style={styles.subjectName}>{item.name}</Text>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <AppIcon name="user" size={14} color="#64748B" />
            <Text style={styles.infoText} numberOfLines={1}>
              {item.teacher}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <AppIcon name="location" size={14} color="#64748B" />
            <Text style={styles.infoText}>Phòng {item.room}</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.scheduleRow}>
            <AppIcon name="calendar" size={14} color="#2563EB" />
            <Text style={styles.scheduleText}>
              {item.scheduleDay} • {item.scheduleTime}
            </Text>
          </View>
          <View style={styles.arrowIcon}>
            <AppIcon name="chevron-right" size={16} color="#2563EB" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Danh sách Môn học</Text>
        <Text style={styles.screenSubtitle}>
          Tổng số: {subjects.length} môn học trong kỳ
        </Text>

        {/* Thanh tìm kiếm */}
        <SearchBar
          value={keyword}
          onChangeText={setKeyword}
          placeholder="Tìm kiếm môn học theo tên hoặc mã..."
        />
      </View>

      {/* Danh sách môn học FlatList */}
      <FlatList
        data={filteredSubjects}
        keyExtractor={item => item.id}
        renderItem={renderSubjectCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="search"
            title="Không tìm thấy môn học"
            description={`Không có môn học nào khớp với từ khóa "${keyword}". Vui lòng thử từ khóa khác.`}
            actionText="Xóa tìm kiếm"
            onAction={() => setKeyword('')}
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  codeBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  codeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2563EB',
  },
  creditBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  creditText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  infoText: {
    fontSize: 13,
    color: '#64748B',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 4,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  scheduleText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '600',
  },
  arrowIcon: {
    width: 20,
    alignItems: 'flex-end',
  },
});
