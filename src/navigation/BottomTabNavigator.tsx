import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppIcon, IconName } from '../components/AppIcon';
import { useApp } from '../context/AppContext';
import { AssignmentListScreen } from '../screens/Assignments/AssignmentListScreen';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { ScheduleScreen } from '../screens/Schedule/ScheduleScreen';
import { SubjectListScreen } from '../screens/Subjects/SubjectListScreen';
import { BottomTabParamList } from './types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator: React.FC = () => {
  const { upcomingAssignments } = useApp();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#64748B',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Tổng quan',
          tabBarIcon: ({ color }) => (
            <AppIcon name="home" size={22} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="SubjectsTab"
        component={SubjectListScreen}
        options={{
          tabBarLabel: 'Môn học',
          tabBarIcon: ({ color }) => (
            <AppIcon name="book" size={20} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="ScheduleTab"
        component={ScheduleScreen}
        options={{
          tabBarLabel: 'Lịch học',
          tabBarIcon: ({ color }) => (
            <AppIcon name="calendar" size={20} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="AssignmentsTab"
        component={AssignmentListScreen}
        options={{
          tabBarLabel: 'Bài tập',
          tabBarIcon: ({ color }) => (
            <View style={styles.iconContainer}>
              <AppIcon name="task" size={20} color={color} />
              {upcomingAssignments.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {upcomingAssignments.length}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Cá nhân',
          tabBarIcon: ({ color }) => (
            <AppIcon name="user" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#F1F5F9',
    borderTopWidth: 1,
    height: 64,
    paddingBottom: 8,
    paddingTop: 8,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 8,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  tabBarItem: {
    paddingVertical: 2,
  },
  iconContainer: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#EF4444',
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
});
