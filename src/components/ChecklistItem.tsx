// src/components/ChecklistItem.tsx
import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface ChecklistItemProps {
  item: {
    id: string;
    text: string;
    completed: boolean;
    expirationDate?: Date;
  };
  toggleItem: (id: string, date?: Date) => void;
  isMedicineChecklist: boolean;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ item, toggleItem, isMedicineChecklist }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      toggleItem(item.id, selectedDate);
    }
  };

  const handleToggleItem = () => {
    toggleItem(item.id);
    if (!item.completed) {
      Alert.alert(
        '¡Felicitaciones!',
        'Has completado una tarea.',
        [{ text: 'OK' }]
      );
    }
    if (isMedicineChecklist && !item.completed) {
      setShowDatePicker(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{item.text}</Text>
      <Switch
        value={item.completed}
        onValueChange={handleToggleItem}
      />
      {isMedicineChecklist && item.completed && item.expirationDate && (
        <Text style={styles.dateText}>
          Expiration Date: {item.expirationDate.toLocaleDateString()}
        </Text>
      )}
      {isMedicineChecklist && showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
  },
  dateText: {
    fontSize: 14,
    color: 'gray',
  },
});

export default ChecklistItem;
