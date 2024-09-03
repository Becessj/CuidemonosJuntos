import React, { useRef, useState, useEffect } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel-v4';
import { View, Image, Text, Dimensions, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackgroundWrapper from './BackgroundWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { DATAINICIO } from '../data/dataInicio';  // Importa DATAINICIO desde el nuevo archivo

const { width: screenWidth } = Dimensions.get('window');

const InicioScreen = () => {
  const [entries, setEntries] = useState(DATAINICIO);
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [randomEntry, setRandomEntry] = useState(null);
  const carouselRef = useRef(null);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const loadRatings = async () => {
        try {
          const loadedRatings = {};
          for (const item of DATAINICIO) {
            const savedRating = await AsyncStorage.getItem(`rating_${item.id}`);
            if (savedRating !== null) {
              loadedRatings[item.id] = parseInt(savedRating, 10);
            } else {
              loadedRatings[item.id] = 0;
            }
          }
          setRatings(loadedRatings);
        } catch (error) {
          console.error('Error al cargar las calificaciones:', error);
        }
      };

      loadRatings();
      setEntries(DATAINICIO);
      setRandomEntry(DATAINICIO[Math.floor(Math.random() * DATAINICIO.length)]);
    }, [])
  );

  const handlePress = (item) => {
    navigation.navigate('CardDetail', { item });
  };

  const handleRatingUpdate = async (id: string, newRating: number) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [id]: newRating,
    }));
    try {
      await AsyncStorage.setItem(`rating_${id}`, newRating.toString());
    } catch (error) {
      console.error('Error al guardar la calificación:', error);
    }
  };

  const renderItem = ({ item }, parallaxProps) => (
    <TouchableOpacity onPress={() => handlePress(item)} style={styles.item}>
      <View style={styles.imageContainer}>
        <ParallaxImage
          source={item.illustration}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.subtitle} numberOfLines={2}>{item.subtitle}</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Icon
              key={star}
              name={star <= (ratings[item.id] || 0) ? 'star' : 'star-o'}
              size={20}
              color={star <= (ratings[item.id] || 0) ? '#FFD700' : '#d3d3d3'}
              onPress={() => handleRatingUpdate(item.id, star)}
            />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <BackgroundWrapper>
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false} 
        showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.welcomeText}>¡Bienvenido!</Text>

          {randomEntry && (
            <TouchableOpacity onPress={() => handlePress(randomEntry)} style={styles.coverCard}>
              <Text style={styles.coverTitle}>{randomEntry.title}</Text>
              <View style={styles.coverImageContainer}>
                <Image
                  source={randomEntry.illustration}
                  containerStyle={styles.coverImageContainer}
                  style={styles.coverImage}
                  parallaxFactor={0.4}
                />
              </View>
              <Text style={styles.coverContent}>
                {randomEntry.subtitle.split(' ').slice(0, 20).join(' ')}...
              </Text>
              <View style={styles.footerIcons}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon
                    key={star}
                    name={star <= (ratings[randomEntry.id] || 0) ? 'star' : 'star-o'}
                    size={24}
                    color={star <= (ratings[randomEntry.id] || 0) ? '#FFD700' : '#d3d3d3'}
                  />
                ))}
                <Icon name="clock-o" size={20} color="#7ed957" />
                <Icon name="eye" size={20} color="#7ed957" />
              </View>
            </TouchableOpacity>
          )}

          <Carousel
            layoutCardOffset={'18'}
            ref={carouselRef}
            sliderWidth={screenWidth}
            itemWidth={screenWidth * 0.75}
            data={entries}
            renderItem={renderItem}
            hasParallaxImages={true}
            layout={'default'}
            inactiveSlideScale={1}
            containerCustomStyle={styles.carouselContainer}
            contentContainerCustomStyle={styles.carouselContent}
          />
        </View>
      </ScrollView>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  scrollContent: {
    paddingBottom: 100, 
  },
  coverCard: {
    width: screenWidth * 0.8,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#eaece6', 
    marginBottom: 20,
    padding: 15,
    alignItems: 'center',
    elevation: 5,
  },
  coverImageContainer: {
    width: '100%',
    height: screenWidth * 0.5,
    borderRadius: 20,
    marginVertical: 10,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  coverTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
    textAlign: 'center',
  },
  coverContent: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 10,
    textAlign: 'center',
  },
  footerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 20,
    textAlign: 'left',
    alignSelf: 'flex-start',
    width: '100%',
    right: -20,
  },
  carouselContainer: {
    flex: 1,
    paddingVertical: 20, 
  },
  carouselContent: {
    paddingHorizontal: (screenWidth * 0.25) / 2,
  },
  item: {
    width: screenWidth * 0.65,
    height: screenWidth * 0.75,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  imageContainer: {
    flex: 1,
    height: '100%',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'black',
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-start'
  },
});

export default InicioScreen;
