import React, { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AppIcon } from '../../components/AppIcon';
import { useApp } from '../../context/AppContext';
import { RootStackNavigationProp } from '../../navigation/types';

export const ProfileScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<RootStackNavigationProp>();
  const { studentProfile, updateProfile } = useApp();

  // State cho Modal chỉnh sửa
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [editFullName, setEditFullName] = useState<string>('');
  const [editEmail, setEditEmail] = useState<string>('');
  const [editPhone, setEditPhone] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Mở modal và nạp dữ liệu hiện tại
  const openEditModal = () => {
    setEditFullName(studentProfile.fullName);
    setEditEmail(studentProfile.email);
    setEditPhone(studentProfile.phone);
    setIsEditModalVisible(true);
  };

  // Lưu thông tin sau khi chỉnh sửa
  const handleSave = async () => {
    if (!editFullName.trim()) {
      Alert.alert('Lỗi nhập liệu', 'Họ tên không được để trống.');
      return;
    }
    if (!editEmail.trim() || !editEmail.includes('@')) {
      Alert.alert('Lỗi nhập liệu', 'Vui lòng nhập định dạng email hợp lệ.');
      return;
    }
    if (!editPhone.trim() || editPhone.length < 9) {
      Alert.alert('Lỗi nhập liệu', 'Vui lòng nhập số điện thoại hợp lệ.');
      return;
    }

    setIsSaving(true);
    const success = await updateProfile({
      fullName: editFullName.trim(),
      email: editEmail.trim(),
      phone: editPhone.trim(),
    });
    setIsSaving(false);

    if (success) {
      setIsEditModalVisible(false);
      Alert.alert('Thành công', 'Thông tin cá nhân đã được cập nhật.');
    } else {
      Alert.alert('Lỗi', 'Không thể lưu thông tin. Vui lòng thử lại.');
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Cá nhân & Kết quả</Text>
        <Text style={styles.screenSubtitle}>
          Hồ sơ sinh viên và kết quả học tập
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>
              {studentProfile.fullName.charAt(0)}
            </Text>
          </View>

          <Text style={styles.fullName}>{studentProfile.fullName}</Text>
          <View style={styles.studentIdBadge}>
            <Text style={styles.studentIdText}>MSSV: {studentProfile.studentId}</Text>
          </View>

          <TouchableOpacity style={styles.editBtn} onPress={openEditModal}>
            <AppIcon name="edit" size={14} color="#2563EB" />
            <Text style={styles.editBtnText}>Chỉnh sửa thông tin</Text>
          </TouchableOpacity>
        </View>

        {/* Thẻ Kết quả học tập (GPA & Tín chỉ) */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionCardHeader}>
            <Text style={styles.sectionHeading}>Kết quả học tập</Text>
            <TouchableOpacity onPress={() => navigation.navigate('GradeDetail')}>
              <Text style={styles.linkText}>Xem chi tiết bảng điểm ›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.gpaContainer}>
            <View style={styles.gpaBox}>
              <Text style={styles.gpaNumber}>
                {studentProfile.gpa.toFixed(2)}
              </Text>
              <Text style={styles.gpaScale}>/ 4.00</Text>
              <Text style={styles.gpaLabel}>Điểm trung bình (GPA)</Text>
            </View>

            <View style={styles.creditsBox}>
              <Text style={styles.creditsNumber}>
                {studentProfile.completedCredits}/{studentProfile.totalCredits}
              </Text>
              <Text style={styles.creditsLabel}>Tín chỉ tích lũy</Text>
              <View style={styles.rankBadge}>
                <Text style={styles.rankText}>Xếp loại: Giỏi</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.viewGradeDetailBtn}
            onPress={() => navigation.navigate('GradeDetail')}>
            <AppIcon name="award" size={16} color="#2563EB" />
            <Text style={styles.viewGradeDetailBtnText}>
              Xem chi tiết bảng điểm các môn
            </Text>
            <AppIcon name="chevron-right" size={16} color="#2563EB" />
          </TouchableOpacity>
        </View>

        {/* Thông tin sinh viên (Đúng theo yêu cầu đề bài) */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>Thông tin sinh viên</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Lớp sinh hoạt</Text>
            <Text style={styles.infoValue}>{studentProfile.className}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Ngành học</Text>
            <Text style={styles.infoValue}>{studentProfile.major}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{studentProfile.email}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Số điện thoại</Text>
            <Text style={styles.infoValue}>{studentProfile.phone}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Modal Chỉnh sửa thông tin cá nhân */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEditModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chỉnh sửa thông tin</Text>
              <TouchableOpacity
                onPress={() => setIsEditModalVisible(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <AppIcon name="close" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Họ và tên sinh viên</Text>
            <TextInput
              style={styles.modalInput}
              value={editFullName}
              onChangeText={setEditFullName}
              placeholder="Nhập họ tên đầy đủ..."
              placeholderTextColor="#94A3B8"
            />

            <Text style={styles.inputLabel}>Địa chỉ Email</Text>
            <TextInput
              style={styles.modalInput}
              value={editEmail}
              onChangeText={setEditEmail}
              placeholder="example@student.ptit.edu.vn"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.inputLabel}>Số điện thoại</Text>
            <TextInput
              style={styles.modalInput}
              value={editPhone}
              onChangeText={setEditPhone}
              placeholder="0987654321"
              placeholderTextColor="#94A3B8"
              keyboardType="phone-pad"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setIsEditModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Hủy bỏ</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleSave}
                disabled={isSaving}>
                <Text style={styles.saveBtnText}>
                  {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 12,
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
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  avatarLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarLargeText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  fullName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  studentIdBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 14,
  },
  studentIdText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  editBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2563EB',
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
  sectionCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  linkText: {
    fontSize: 13,
    color: '#2563EB',
    fontWeight: '700',
  },
  gpaContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  gpaBox: {
    flex: 1,
    backgroundColor: '#EFF6FF',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  gpaNumber: {
    fontSize: 28,
    fontWeight: '900',
    color: '#2563EB',
  },
  gpaScale: {
    fontSize: 11,
    color: '#64748B',
    marginTop: -2,
    marginBottom: 4,
  },
  gpaLabel: {
    fontSize: 11,
    color: '#3B82F6',
    fontWeight: '600',
    textAlign: 'center',
  },
  creditsBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  creditsNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  creditsLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    marginBottom: 6,
  },
  rankBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  rankText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  viewGradeDetailBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
    marginTop: 4,
  },
  viewGradeDetailBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563EB',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
    marginTop: 10,
  },
  modalInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  saveBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#2563EB',
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
