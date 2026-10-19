import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  Assignment,
  INITIAL_GRADES,
  INITIAL_SCHEDULE,
  INITIAL_STUDENT_PROFILE,
  INITIAL_SUBJECTS,
  ScheduleItem,
  StudentProfile,
  Subject,
  SubjectGrade,
} from '../data/mockData';
import { StorageService } from '../utils/storage';

interface AppContextType {
  studentProfile: StudentProfile;
  subjects: Subject[];
  schedule: ScheduleItem[];
  assignments: Assignment[];
  grades: SubjectGrade[];
  isLoading: boolean;
  upcomingAssignments: Assignment[];
  updateProfile: (updated: Partial<StudentProfile>) => Promise<boolean>;
  toggleAssignmentStatus: (assignmentId: string) => Promise<boolean>;
  resetAllData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(INITIAL_STUDENT_PROFILE);
  const [subjects] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [schedule] = useState<ScheduleItem[]>(INITIAL_SCHEDULE);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [grades] = useState<SubjectGrade[]>(INITIAL_GRADES);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load data từ AsyncStorage khi mở app
  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);
        const [savedProfile, savedAssignments] = await Promise.all([
          StorageService.getStudentProfile(),
          StorageService.getAssignments(),
        ]);
        setStudentProfile(savedProfile);
        setAssignments(savedAssignments);
      } catch (error) {
        console.warn('Lỗi khi tải dữ liệu khởi tạo:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  // Cập nhật thông tin sinh viên (Họ tên, Email, SĐT)
  const updateProfile = async (updated: Partial<StudentProfile>): Promise<boolean> => {
    try {
      const newProfile: StudentProfile = {
        ...studentProfile,
        ...updated,
      };
      setStudentProfile(newProfile);
      await StorageService.saveStudentProfile(newProfile);
      return true;
    } catch (error) {
      console.warn('Lỗi khi cập nhật profile:', error);
      return false;
    }
  };

  // Chuyển đổi trạng thái hoàn thành của bài tập
  const toggleAssignmentStatus = async (assignmentId: string): Promise<boolean> => {
    try {
      const updatedAssignments = assignments.map(item => {
        if (item.id === assignmentId) {
          return {
            ...item,
            isCompleted: !item.isCompleted,
          };
        }
        return item;
      });

      setAssignments(updatedAssignments);
      await StorageService.saveAssignments(updatedAssignments);
      return true;
    } catch (error) {
      console.warn('Lỗi khi chuyển trạng thái bài tập:', error);
      return false;
    }
  };

  // Reset về dữ liệu mẫu ban đầu
  const resetAllData = async () => {
    await StorageService.resetData();
    const [freshProfile, freshAssignments] = await Promise.all([
      StorageService.getStudentProfile(),
      StorageService.getAssignments(),
    ]);
    setStudentProfile(freshProfile);
    setAssignments(freshAssignments);
  };

  // Danh sách bài tập sắp đến hạn (chưa hoàn thành)
  const upcomingAssignments = assignments.filter(item => !item.isCompleted);

  return (
    <AppContext.Provider
      value={{
        studentProfile,
        subjects,
        schedule,
        assignments,
        grades,
        isLoading,
        upcomingAssignments,
        updateProfile,
        toggleAssignmentStatus,
        resetAllData,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp phải được sử dụng bên trong AppProvider');
  }
  return context;
};
