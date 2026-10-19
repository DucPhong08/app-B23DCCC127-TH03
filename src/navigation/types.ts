import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ScheduleItem, Subject } from '../data/mockData';

export type RootStackParamList = {
  MainTabs: undefined;
  SubjectDetail: { subject: Subject };
  ScheduleDetail: { scheduleItem: ScheduleItem };
  AssignmentDetail: { assignmentId: string };
  GradeDetail: undefined;
};

export type BottomTabParamList = {
  HomeTab: undefined;
  SubjectsTab: undefined;
  ScheduleTab: undefined;
  AssignmentsTab: undefined;
  ProfileTab: undefined;
};

// Navigation Prop Types
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type SubjectDetailRouteProp = RouteProp<RootStackParamList, 'SubjectDetail'>;
export type ScheduleDetailRouteProp = RouteProp<RootStackParamList, 'ScheduleDetail'>;
export type AssignmentDetailRouteProp = RouteProp<RootStackParamList, 'AssignmentDetail'>;

export type BottomTabNavProp = BottomTabNavigationProp<BottomTabParamList>;
