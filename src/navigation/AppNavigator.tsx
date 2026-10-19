import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AssignmentDetailScreen } from '../screens/Assignments/AssignmentDetailScreen';
import { GradeDetailScreen } from '../screens/Profile/GradeDetailScreen';
import { ScheduleDetailScreen } from '../screens/Schedule/ScheduleDetailScreen';
import { SubjectDetailScreen } from '../screens/Subjects/SubjectDetailScreen';
import { BottomTabNavigator } from './BottomTabNavigator';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        {/* Màn hình chứa 5 Bottom Tabs */}
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} />

        {/* 4 Màn hình Chi tiết (Stack Navigation) */}
        <Stack.Screen
          name="SubjectDetail"
          component={SubjectDetailScreen}
          options={{ title: 'Chi tiết môn học' }}
        />
        <Stack.Screen
          name="ScheduleDetail"
          component={ScheduleDetailScreen}
          options={{ title: 'Chi tiết buổi học' }}
        />
        <Stack.Screen
          name="AssignmentDetail"
          component={AssignmentDetailScreen}
          options={{ title: 'Chi tiết bài tập' }}
        />
        <Stack.Screen
          name="GradeDetail"
          component={GradeDetailScreen}
          options={{ title: 'Kết quả học tập' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
