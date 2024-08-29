import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RatingCardProps {
  id: string;
  correctAnswer: string;
  onRatingUpdate?: (newRating: number) => void;
}

const RatingCard: React.FC<RatingCardProps> = ({ id, correctAnswer, onRatingUpdate }) => {
  const [rating, setRating] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const storedRating = await AsyncStorage.getItem(`rating_${id}`);
        if (storedRating !== null) {
          setRating(parseInt(storedRating, 10));
        }
      } catch (error) {
        console.error('Error al recuperar la calificación:', error);
      }
    };

    fetchRating();
  }, [id]);

  const handleRating = async (newRating: number) => {
    setRating(newRating);
    try {
      await AsyncStorage.setItem(`rating_${id}`, newRating.toString());
      // console.log('Calificación guardada:', newRating);
      if (onRatingUpdate) {
        onRatingUpdate(newRating);
      }
    } catch (error) {
      console.error('Error al guardar la calificación:', error);
    }
  };

  const handleSubmit = async () => {
    if (selectedOption === null) {
      Alert.alert('Error', 'Por favor, selecciona una opción.');
      return;
    }

    try {
      await AsyncStorage.setItem(`selectedOption_${id}`, selectedOption);
      if (selectedOption === correctAnswer) {
       
        Alert.alert('Éxito', '¡Respuesta correcta!');
      } else {
      
        Alert.alert('Incorrecto', 'Respuesta incorrecta.');
      }
    } catch (error) {
      console.error('Error al guardar la opción seleccionada:', error);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Demuestra lo aprendido</Text>
      <Text style={styles.question}>¿Qué tan útil fue la lectura?</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRating(star)}>
            <Icon
              name={star <= rating ? 'star' : 'star-outline'}
              size={30}
              color={star <= rating ? 'gold' : 'gray'}
            />
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.question}>¿De qué trató esta lectura?</Text>
      <View style={styles.optionsContainer}>
        {['Preparación', 'Friajes', 'Tormentas', 'Incendios', 'Supervivencia'].map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.optionButton, selectedOption === option && styles.selectedOption]}
            onPress={() => setSelectedOption(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#d3d3d3',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  question: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  optionButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    margin: 5,
  },
  selectedOption: {
    backgroundColor: '#7ed957',
  },
  optionText: {
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: 'red',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    width: 200,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RatingCard;
