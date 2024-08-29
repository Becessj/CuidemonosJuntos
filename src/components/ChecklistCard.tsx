// src/components/ChecklistCard.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChecklistCard = ({ title, items, isMedicineChecklist }) => {
  const [checklistItems, setChecklistItems] = useState(items);

  useEffect(() => {
    const fetchItems = async () => {
      const savedItems = await AsyncStorage.getItem(title);
      if (savedItems) {
        setChecklistItems(JSON.parse(savedItems));
      }
    };
    fetchItems();
  }, [title]);

  const toggleItem = async (index) => {
    const newItems = [...checklistItems];
    newItems[index].completed = !newItems[index].completed;
    setChecklistItems(newItems);
    await AsyncStorage.setItem(title, JSON.stringify(newItems));
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.text}</Text>
      <Switch
        value={item.completed}
        onValueChange={() => toggleItem(index)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={checklistItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
});

export default ChecklistCard;
