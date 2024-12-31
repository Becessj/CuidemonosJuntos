import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Modal } from 'react-native';
import LottieView from 'lottie-react-native';
import questionsData from '../data/questionsData';
import Icon from 'react-native-vector-icons/Ionicons'; // Importa los iconos
import AsyncStorage from '@react-native-async-storage/async-storage';
interface QuizProps {
  topic: string;
  goBack: () => void;
}

const Quiz: React.FC<QuizProps> = ({ topic, goBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showLottie, setShowLottie] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [animationValue] = useState(new Animated.Value(0)); // Nueva animación para el cambio de página

  const [fadeAnim] = useState(new Animated.Value(1));
  const [scaleAnim] = useState(new Animated.Value(1));
  const [rotationAnim] = useState(new Animated.Value(0)); 
  const [showModal, setShowModal] = useState(false); 
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);

   // Animaciones para los botones
   const [confirmButtonAnim] = useState(new Animated.Value(0));
   const [backButtonAnim] = useState(new Animated.Value(0));

   useEffect(() => {
    // Animaciones de entrada para los botones
    Animated.parallel([
      Animated.timing(confirmButtonAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.timing(backButtonAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    const randomQuestionCount = Math.floor(Math.random() * 3) + 3;
  
    if (Array.isArray(questionsData[topic])) {
      const shuffledQuestions = questionsData[topic]
        .sort(() => Math.random() - 0.5)
        .slice(0, randomQuestionCount)
        .map(question => ({
          ...question,
          options: question.options.sort(() => Math.random() - 0.5)
        }));
  
      setQuizQuestions(shuffledQuestions);
    } else {
      console.error(`No questions found for the topic: ${topic}`);
    }
  }, [topic]);
  

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;
  const progress = (currentQuestionIndex + 1) / totalQuestions;

  const handleAnswer = (selectedOption: string) => {
    setSelectedOption(selectedOption);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
    Animated.loop(
      Animated.timing(rotationAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const getStars = async () => {
    try {
      const stars = await AsyncStorage.getItem('stars');
      return stars ? parseInt(stars) : 0;
    } catch (error) {
      console.error('Error obteniendo estrellas', error);
      return 0;
    }
  };
  
  // Actualizar el número de estrellas en AsyncStorage
  const updateStars = async (additionalStars: number) => {
    try {
      const currentStars = await getStars();
      const newStarCount = currentStars + additionalStars;
      await AsyncStorage.setItem('stars', newStarCount.toString());
      //console.log(`Estrellas actualizadas: ${newStarCount}`);
    } catch (error) {
      //console.error('Error actualizando estrellas', error);
    }
  };


  const handleConfirm = () => {
    if (!selectedOption) {
      setShowModal(true);
      return;
    }
  
    if (selectedOption === currentQuestion.correctAnswer) {
      setCorrectAnswers(correctAnswers + 1);
    }
  
    // Verificar si el quiz ha terminado
    if (currentQuestionIndex === totalQuestions - 1) {
      const totalCorrect = correctAnswers + (selectedOption === currentQuestion.correctAnswer ? 1 : 0);
      const message = `Lograste ${totalCorrect} de ${totalQuestions} preguntas correctas`;
      setResultMessage(message);
  
      // Actualizar estrellas si hay 2 respuestas correctas
      if (totalCorrect === 2) {
        updateStars(3); // Puedes ajustar el número de estrellas según sea necesario
      }
  
      setShowLottie(totalCorrect > 2);
      setIsQuizFinished(true);
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedOption(null);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start();
      });
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.topicTitle}>{topic}</Text>
      <View style={styles.header}>
        <Text style={styles.questionNumber}>Pregunta {currentQuestionIndex + 1}</Text>
        <Text style={styles.progressText}>{currentQuestionIndex + 1}/{totalQuestions}</Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>
      {isQuizFinished ? (
        <View style={styles.lottieContainer}>
          <LottieView
            source={correctAnswers > 2 ? require('../../assets/celebration.json') : require('../../assets/final_wrong.json')}
            autoPlay
            loop={true}
            style={styles.lottie}
          />
          <Text style={styles.resultMessage}>{resultMessage}</Text>
          <TouchableOpacity
            onPress={goBack}
            style={styles.backButton}
          >
            <Icon name="home" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Ir al inicio</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Animated.View style={[styles.quizContent, { opacity: fadeAnim }]}>
          {currentQuestion && (
            <>
             {/* Agregar dos animaciones Lottie sobre la pregunta */}
                <View style={styles.lottiePairContainer}>
                  <LottieView
                    source={require('../../assets/varon_pensando.json')}
                    autoPlay
                    loop
                    style={styles.lottieSmall}
                  />
                  <LottieView
                    source={require('../../assets/mujer_pensando.json')}
                    autoPlay
                    loop
                    style={styles.lottieSmall}
                  />
                </View>
              <Text style={styles.question}>{currentQuestion.question}</Text>
              {currentQuestion.options.map((option: string) => (
                <TouchableOpacity
                  key={option}
                  style={[styles.optionButton, selectedOption === option && styles.selectedOption]}
                  onPress={() => handleAnswer(option)}
                >
                 
                  <Text style={styles.optionText}>{option}</Text>
                  <Animated.View style={[styles.radioContainer]}>
                    <Animated.View
                      style={[
                        styles.radioCircle,
                        selectedOption === option && styles.selectedRadio,
                        {
                          transform: [
                            {
                              rotate: rotationAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '360deg'],
                              }),
                            },
                          ],
                        },
                      ]}
                    />
                    {selectedOption === option && (
                      <LottieView
                        source={require('../../assets/check.json')} 
                        autoPlay
                        loop={false}
                        style={styles.checkmark}
                      />
                    )}
                  </Animated.View>
                </TouchableOpacity>
              ))}
              <View style={styles.buttonContainer}>
              <Animated.View
                  style={[ { opacity: confirmButtonAnim, transform: [{ scale: confirmButtonAnim }] }]}
                >
                <TouchableOpacity
                  onPress={goBack}
                  style={styles.confirmButton}
                >
                  <Icon name="close" size={24} color="#fff" style={styles.icon} />
                  <Text style={styles.buttonText}>Terminar</Text>
                  
                </TouchableOpacity>
                </Animated.View>   
                <Animated.View
                  style={[styles.stopButton, { opacity: confirmButtonAnim, transform: [{ scale: confirmButtonAnim }] }]}
                >
                <TouchableOpacity onPress={handleConfirm} style={styles.stopButton}>
                    <Icon name="checkmark" size={24} color="#fff" style={styles.icon} />
                    <Text style={styles.buttonText}>Confirmar</Text>
                </TouchableOpacity>
                </Animated.View>
              </View>
            </>
          )}
        </Animated.View>
      )}
      
      {/* Modal de advertencia */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Por favor selecciona una opción antes de continuar.</Text>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.closeModalButton}
            >
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  topicTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left',
    color:'green',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'green'
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'green'
  },
  progressContainer: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    // marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
   
  },
  quizContent: {
    flex: 1,
    justifyContent: 'center',
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign:'center',
    bottom:50,
    color:'green'
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FF5722',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#FF5722',
    bottom:50
  },
  selectedOption: {
    backgroundColor: '#FFC107',
    borderColor: '#FFC107',
  },
  optionText: {
    fontSize: 14,
    color: '#fff',
    fontWeight:'bold',
    textAlign: 'center',
    flex: 1,
  },
  radioContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFC107', // Cambia el color a gris o el que prefieras para la opción seleccionada
  },
  selectedRadio: {
    borderColor: '#FFC107',
    backgroundColor: '#FFC107', // Cambia el color a gris o el que prefieras para la opción seleccionada
  },
  checkmark: {
    width: 24, 
    height: 24,
    position: 'absolute',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom:40                                                
  },
  confirmButton: {
    backgroundColor: '#F44336',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
    flexDirection: 'row', 
    justifyContent: 'center', // Centra horizontalmente
    width: 150,
    height: 50,
  },
  stopButton: {
    backgroundColor: '#a4e71e',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center', // Centra horizontalmente
    width: 100,
    height: 50,
   
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10, // Espacio entre el icono y el texto
  },
  lottieContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 350,
    height: 350,
    bottom:70
  },
  resultMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    bottom: 70,
    textAlign:'center',
    color:'green'
  },
  backButton: {
    padding: 15,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
    bottom: 50,
    flexDirection: 'row',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    color:'green',
    fontWeight:'bold',
    width:280
  },
  closeModalButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  lottiePairContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    bottom:50,
  },
  lottieSmall: {
    width: 150,
    height: 150,
  },
});

export default Quiz;
