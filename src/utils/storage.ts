import AsyncStorage from '@react-native-async-storage/async-storage';
import { Assignment, INITIAL_ASSIGNMENTS, INITIAL_STUDENT_PROFILE, StudentProfile } from '../data/mockData';

const STORAGE_KEYS = {
  STUDENT_PROFILE: '@student_app_profile_v1',
  ASSIGNMENTS: '@student_app_assignments_v1',
};

export const StorageService = {
  async getStudentProfile(): Promise<StudentProfile> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.STUDENT_PROFILE);
      if (data) {
        return JSON.parse(data);
      }
      // Khởi tạo mặc định lần đầu
      await AsyncStorage.setItem(
        STORAGE_KEYS.STUDENT_PROFILE,
        JSON.stringify(INITIAL_STUDENT_PROFILE),
      );
      return INITIAL_STUDENT_PROFILE;
    } catch (error) {
      console.warn('Lỗi khi đọc student profile từ storage:', error);
      return INITIAL_STUDENT_PROFILE;
    }
  },

  async saveStudentProfile(profile: StudentProfile): Promise<boolean> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.STUDENT_PROFILE,
        JSON.stringify(profile),
      );
      return true;
    } catch (error) {
      console.warn('Lỗi khi lưu student profile vào storage:', error);
      return false;
    }
  },

  async getAssignments(): Promise<Assignment[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
      if (data) {
        return JSON.parse(data);
      }
      // Khởi tạo mặc định lần đầu
      await AsyncStorage.setItem(
        STORAGE_KEYS.ASSIGNMENTS,
        JSON.stringify(INITIAL_ASSIGNMENTS),
      );
      return INITIAL_ASSIGNMENTS;
    } catch (error) {
      console.warn('Lỗi khi đọc assignments từ storage:', error);
      return INITIAL_ASSIGNMENTS;
    }
  },

  async saveAssignments(assignments: Assignment[]): Promise<boolean> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.ASSIGNMENTS,
        JSON.stringify(assignments),
      );
      return true;
    } catch (error) {
      console.warn('Lỗi khi lưu assignments vào storage:', error);
      return false;
    }
  },

  async resetData(): Promise<void> {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.STUDENT_PROFILE),
        AsyncStorage.removeItem(STORAGE_KEYS.ASSIGNMENTS),
      ]);
    } catch (error) {
      console.warn('Lỗi khi reset storage:', error);
    }
  },
};
