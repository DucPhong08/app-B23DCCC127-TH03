import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

interface StatusBadgeProps {
  isCompleted?: boolean;
  isUrgent?: boolean;
  label?: string;
  size?: 'small' | 'medium';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  isCompleted,
  isUrgent,
  label,
  size = 'small',
}) => {
  let badgeStyle: StyleProp<ViewStyle> = styles.pending;
  let textStyle: StyleProp<TextStyle> = styles.pendingText;
  let displayLabel = label || 'Chưa hoàn thành';

  if (isCompleted) {
    badgeStyle = styles.completed;
    textStyle = styles.completedText;
    displayLabel = label || 'Đã hoàn thành';
  } else if (isUrgent) {
    badgeStyle = styles.urgent;
    textStyle = styles.urgentText;
    displayLabel = label || 'Gấp - Sắp hết hạn';
  }

  return (
    <View
      style={[
        styles.badge,
        badgeStyle,
        size === 'medium' && styles.badgeMedium,
      ]}>
      <View
        style={[
          styles.dot,
          isCompleted
            ? styles.dotCompleted
            : isUrgent
            ? styles.dotUrgent
            : styles.dotPending,
        ]}
      />
      <Text
        style={[
          styles.text,
          textStyle,
          size === 'medium' && styles.textMedium,
        ]}>
        {displayLabel}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeMedium: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  dotCompleted: {
    backgroundColor: '#10B981',
  },
  dotPending: {
    backgroundColor: '#F59E0B',
  },
  dotUrgent: {
    backgroundColor: '#EF4444',
  },
  completed: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    borderWidth: 1,
  },
  completedText: {
    color: '#065F46',
    fontWeight: '600',
  },
  pending: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    borderWidth: 1,
  },
  pendingText: {
    color: '#92400E',
    fontWeight: '600',
  },
  urgent: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
  },
  urgentText: {
    color: '#991B1B',
    fontWeight: '700',
  },
  text: {
    fontSize: 12,
  },
  textMedium: {
    fontSize: 13,
  },
});
