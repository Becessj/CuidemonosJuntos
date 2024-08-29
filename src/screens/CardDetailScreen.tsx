import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RatingCard from './RatingCard';
import CustomText from './CustomText';
import { useNavigation } from '@react-navigation/native';
import BackgroundWrapper from './BackgroundWrapper';
import * as Speech from 'expo-speech';

const { width: screenWidth } = Dimensions.get('window');

const CardDetailScreen = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const leftArrow = require('../../assets/leftArrow.png');
  const [rating, setRating] = useState(0);

const handleRatingUpdate = (newRating) => {
  // console.log('Calificación actualizada:', newRating);
  setRating(newRating); // Actualiza el estado local
  // Aquí podrías guardar el rating en AsyncStorage si es necesario
};

  const handleBack = () => {
    navigation.goBack();
  };

  const handleShare = () => {
    console.log('Compartir');
  };

  const handleLike = () => {
    console.log('Me gusta');
  };

  const handleSpeech = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      Speech.speak(item.subtitle, {
        language: 'es-MX',
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
      });
      setIsSpeaking(true);
    }
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false} 
          showsHorizontalScrollIndicator={false} 
        >
          <View style={styles.imageContainer}>
            <Image source={item.illustration} style={styles.image} />
            <View style={styles.headerContainer}>
              <CustomText type='title'>{item.title}</CustomText>
            </View>
          </View>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Image source={leftArrow} style={styles.arrowImage} />
          </TouchableOpacity>

          
          
          <View style={styles.textContainer}>
            <CustomText type='subtitle'>{item.subtitle}</CustomText>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity onPress={handleSpeech} style={styles.speechButton}>
              <Icon name={isSpeaking ? "volume-mute-outline" : "volume-high-outline"} size={24} color="#fff" />
              <Text style={styles.speechButtonText}>{isSpeaking ? "Detener" : "Escuchar"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleShare}>
              <Icon name="share-social-outline" size={24} color="#fff" />
              <Text style={styles.buttonText}>Compartir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonLike} onPress={handleLike}>
              <Icon name="heart-outline" size={24} color="#fff" />
              <Text style={styles.buttonText}>Me gusta</Text>
            </TouchableOpacity>
          </View>
        <RatingCard
          id={item.id}
          correctAnswer= {item.correctAnswer}
          onRatingUpdate={handleRatingUpdate} // Pasa la función de actualización
        />

        </ScrollView>
      </View>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: screenWidth,
    height: screenWidth * 0.65,
    resizeMode: 'cover',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  headerContainer: {
    position: 'absolute',
    bottom: -60,
    left: 20,
    right: 20,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',

  },
  backButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 100,
    padding: 15,
    elevation: 2,
    width: 70,
    right: -20,
    top: -70,
  },
  textContainer: {
    padding: 20,
    bottom: 30,
  },
  speechButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7ed957',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  speechButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'white',
    borderTopColor: '#ddd',
    bottom: 50,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6ddbf6',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  buttonLike: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 200,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 12,
  },
  arrowImage: {
    width: 40,
    height: 40, 
  },
});

export default CardDetailScreen;
