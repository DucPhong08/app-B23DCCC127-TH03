import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { AppIcon } from './AppIcon';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Tìm kiếm...',
  onClear,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchIcon}>
        <AppIcon name="search" size={16} color="#64748B" />
      </View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            onChangeText('');
            onClear?.();
          }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <AppIcon name="close" size={14} color="#64748B" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    height: 46,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 10,
  },
});
