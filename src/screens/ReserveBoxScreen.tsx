import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Switch, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundWrapper2 from './BackgroundWrapper2';
import LottieView from 'lottie-react-native';
import { dataBox } from '../data/dataBox';


const ReserveBoxScreen = () => {
  const [items, setItems] = useState(dataBox);
  const [showLottie, setShowLottie] = useState(false);

  useEffect(() => {
    const loadItems = async () => {
      const storedItems = await AsyncStorage.getItem('ReserveBox');
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    };
    loadItems();
  }, []);

  useEffect(() => {
    if (items.every(item => item.completed)) {
      setShowLottie(true);
      const timer = setTimeout(() => {
        setShowLottie(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [items]);

  const toggleItem = async (index: number) => {
    const newItems = [...items];
    newItems[index].completed = !newItems[index].completed;
    setItems(newItems);
    await AsyncStorage.setItem('ReserveBox', JSON.stringify(newItems));
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity onPress={() => toggleItem(index)} style={styles.item}>
      <View style={styles.itemContent}>
        <Image source={item.image} style={styles.itemImage} />
        <Text style={styles.itemText}>{item.text}</Text>
        <View style={styles.switchContainer}>
          <Switch
            value={item.completed}
            onValueChange={() => toggleItem(index)}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={item.completed ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <BackgroundWrapper2>
      <View style={styles.container}>
        <Text style={styles.title}>Caja de Reserva</Text>
        <FlatList
          key={'two-columns'}
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
        />
        {showLottie && (
          <View style={styles.lottieContainer}>
            <LottieView
              source={require('../../assets/congrats.json')}
              autoPlay
              loop={false}
              style={styles.lottie}
            />
          </View>
        )}
      </View>
    </BackgroundWrapper2>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    position: 'relative',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#c9d226',
    borderRadius: 30,
    color: 'white',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  itemContent: {
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  switchContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 60,
  },
  lottieContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1,
  },
  lottie: {
    width: 500,
    height: 500,
  },
});

export default ReserveBoxScreen;
