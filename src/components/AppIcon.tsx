import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type IconName =
  | 'home'
  | 'book'
  | 'calendar'
  | 'task'
  | 'user'
  | 'search'
  | 'clock'
  | 'location'
  | 'check'
  | 'check-circle'
  | 'chevron-right'
  | 'arrow-back'
  | 'edit'
  | 'close'
  | 'award'
  | 'school'
  | 'alert';

interface AppIconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export const AppIcon: React.FC<AppIconProps> = ({
  name,
  size = 20,
  color = '#2563EB',
}) => {
  switch (name) {
    case 'home':
      return (
        <View style={[styles.center, { width: size, height: size }]}>
          {/* Mái nhà */}
          <View
            style={{
              width: 0,
              height: 0,
              borderLeftWidth: size * 0.42,
              borderRightWidth: size * 0.42,
              borderBottomWidth: size * 0.34,
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: color,
            }}
          />
          {/* Thân nhà */}
          <View
            style={{
              width: size * 0.62,
              height: size * 0.44,
              backgroundColor: color,
              borderBottomLeftRadius: 2,
              borderBottomRightRadius: 2,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                width: size * 0.22,
                height: size * 0.26,
                backgroundColor: '#FFFFFF',
                borderTopLeftRadius: 2,
                borderTopRightRadius: 2,
              }}
            />
          </View>
        </View>
      );

    case 'book':
      return (
        <View
          style={[
            styles.center,
            {
              width: size * 0.76,
              height: size * 0.86,
              borderRadius: 3,
              borderWidth: 1.8,
              borderColor: color,
              padding: 2,
              justifyContent: 'space-around',
            },
          ]}>
          <View style={{ height: 1.5, width: '70%', backgroundColor: color, borderRadius: 1 }} />
          <View style={{ height: 1.5, width: '85%', backgroundColor: color, borderRadius: 1 }} />
          <View style={{ height: 1.5, width: '50%', backgroundColor: color, borderRadius: 1 }} />
        </View>
      );

    case 'calendar':
      return (
        <View
          style={[
            styles.center,
            {
              width: size * 0.82,
              height: size * 0.82,
              borderRadius: 3,
              borderWidth: 1.8,
              borderColor: color,
              overflow: 'hidden',
            },
          ]}>
          <View style={{ width: '100%', height: size * 0.24, backgroundColor: color }} />
          <View
            style={{
              flex: 1,
              width: '100%',
              flexDirection: 'row',
              flexWrap: 'wrap',
              padding: 2,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <View style={{ width: 2.5, height: 2.5, borderRadius: 1.5, backgroundColor: color }} />
            <View style={{ width: 2.5, height: 2.5, borderRadius: 1.5, backgroundColor: color }} />
            <View style={{ width: 2.5, height: 2.5, borderRadius: 1.5, backgroundColor: color }} />
            <View style={{ width: 2.5, height: 2.5, borderRadius: 1.5, backgroundColor: color }} />
          </View>
        </View>
      );

    case 'task':
      return (
        <View
          style={[
            styles.center,
            {
              width: size * 0.74,
              height: size * 0.86,
              borderRadius: 3,
              borderWidth: 1.8,
              borderColor: color,
              alignItems: 'center',
              paddingTop: 3,
            },
          ]}>
          <View
            style={{
              width: size * 0.35,
              height: 3,
              backgroundColor: color,
              borderRadius: 1.5,
              position: 'absolute',
              top: -2,
            }}
          />
          <View style={{ width: '65%', height: 1.5, backgroundColor: color, marginTop: 4, borderRadius: 1 }} />
          <View style={{ width: '65%', height: 1.5, backgroundColor: color, marginTop: 3, borderRadius: 1 }} />
          <View style={{ width: '45%', height: 1.5, backgroundColor: color, marginTop: 3, borderRadius: 1 }} />
        </View>
      );

    case 'user':
      return (
        <View style={[styles.center, { width: size, height: size }]}>
          <View
            style={{
              width: size * 0.42,
              height: size * 0.42,
              borderRadius: size * 0.21,
              borderWidth: 1.8,
              borderColor: color,
            }}
          />
          <View
            style={{
              width: size * 0.74,
              height: size * 0.34,
              borderTopLeftRadius: size * 0.24,
              borderTopRightRadius: size * 0.24,
              borderWidth: 1.8,
              borderBottomWidth: 0,
              borderColor: color,
              marginTop: 1.5,
            }}
          />
        </View>
      );

    case 'search':
      return (
        <View style={[styles.center, { width: size, height: size }]}>
          <View
            style={{
              width: size * 0.62,
              height: size * 0.62,
              borderRadius: size * 0.31,
              borderWidth: 1.8,
              borderColor: color,
              transform: [{ translateX: -1 }, { translateY: -1 }],
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 2,
              right: 2,
              width: 2,
              height: size * 0.32,
              backgroundColor: color,
              borderRadius: 1,
              transform: [{ rotate: '-45deg' }],
            }}
          />
        </View>
      );

    case 'clock':
      return (
        <View
          style={[
            styles.center,
            {
              width: size * 0.85,
              height: size * 0.85,
              borderRadius: size * 0.45,
              borderWidth: 1.8,
              borderColor: color,
            },
          ]}>
          <View
            style={{
              position: 'absolute',
              top: size * 0.16,
              width: 1.8,
              height: size * 0.26,
              backgroundColor: color,
              borderRadius: 1,
            }}
          />
          <View
            style={{
              position: 'absolute',
              left: size * 0.38,
              width: size * 0.22,
              height: 1.8,
              backgroundColor: color,
              borderRadius: 1,
            }}
          />
        </View>
      );

    case 'location':
      return (
        <View style={[styles.center, { width: size, height: size }]}>
          <View
            style={{
              width: size * 0.62,
              height: size * 0.62,
              borderRadius: size * 0.31,
              backgroundColor: color,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: size * 0.24,
                height: size * 0.24,
                borderRadius: size * 0.12,
                backgroundColor: '#FFFFFF',
              }}
            />
          </View>
          <View
            style={{
              width: 0,
              height: 0,
              borderLeftWidth: size * 0.2,
              borderRightWidth: size * 0.2,
              borderTopWidth: size * 0.28,
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderTopColor: color,
              marginTop: -1.5,
            }}
          />
        </View>
      );

    case 'check':
      return (
        <View style={[styles.center, { width: size, height: size }]}>
          <Text
            style={{
              fontSize: size * 0.95,
              color,
              fontWeight: '800',
              lineHeight: size * 1.05,
            }}>
            ✓
          </Text>
        </View>
      );

    case 'check-circle':
      return (
        <View
          style={[
            styles.center,
            {
              width: size * 0.9,
              height: size * 0.9,
              borderRadius: size * 0.45,
              backgroundColor: color,
            },
          ]}>
          <Text
            style={{
              fontSize: size * 0.65,
              color: '#FFFFFF',
              fontWeight: '800',
              lineHeight: size * 0.8,
            }}>
            ✓
          </Text>
        </View>
      );

    case 'chevron-right':
      return (
        <View style={[styles.center, { width: size, height: size }]}>
          <Text
            style={{
              fontSize: size * 1.3,
              color,
              fontWeight: '700',
              lineHeight: size * 1.2,
            }}>
            ›
          </Text>
        </View>
      );

    case 'arrow-back':
      return (
        <View style={[styles.center, { width: size, height: size }]}>
          <Text
            style={{
              fontSize: size * 1.5,
              color,
              fontWeight: '700',
              lineHeight: size * 1.3,
            }}>
            ‹
          </Text>
        </View>
      );

    case 'close':
      return (
        <View style={[styles.center, { width: size, height: size }]}>
          <Text
            style={{
              fontSize: size * 0.95,
              color,
              fontWeight: '700',
              lineHeight: size * 1.05,
            }}>
            ✕
          </Text>
        </View>
      );

    case 'edit':
      return (
        <View style={[styles.center, { width: size, height: size }]}>
          <Text
            style={{
              fontSize: size * 0.95,
              color,
              fontWeight: '700',
              lineHeight: size * 1.05,
            }}>
            ✎
          </Text>
        </View>
      );

    case 'award':
      return (
        <View style={[styles.center, { width: size, height: size }]}>
          <Text
            style={{
              fontSize: size * 0.95,
              color,
              fontWeight: '800',
              lineHeight: size * 1.05,
            }}>
            ★
          </Text>
        </View>
      );

    case 'school':
      return (
        <View style={[styles.center, { width: size, height: size }]}>
          {/* Mũ tốt nghiệp tối giản */}
          <View
            style={{
              width: size * 0.85,
              height: size * 0.35,
              backgroundColor: color,
              transform: [{ rotate: '45deg' }],
              borderRadius: 1,
            }}
          />
        </View>
      );

    case 'alert':
      return (
        <View
          style={[
            styles.center,
            {
              width: size * 0.85,
              height: size * 0.85,
              borderRadius: size * 0.45,
              borderWidth: 1.8,
              borderColor: color,
            },
          ]}>
          <Text
            style={{
              fontSize: size * 0.55,
              color,
              fontWeight: '900',
              lineHeight: size * 0.7,
            }}>
            !
          </Text>
        </View>
      );

    default:
      return (
        <View style={[styles.center, { width: size, height: size }]}>
          <Text style={{ fontSize: size * 0.8, color }}>•</Text>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
