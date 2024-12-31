import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Animated, Image ,Modal,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Usaremos MaterialIcons
import Quiz from './Quiz';
import { useFocusEffect } from '@react-navigation/native'; // Importar useFocusEffect
import LottieView from 'lottie-react-native'; // Importa LottieView
import {topics} from '../data/questionsData';
import * as Speech from 'expo-speech';
import { ScrollView } from 'react-native-gesture-handler';

const { width: screenWidth } = Dimensions.get('window');

// Función para obtener una selección aleatoria de un array
const getRandomTopics = (topicArray, count) => {
  if (!topicArray || topicArray.length === 0) return []; // Verifica si el array existe y no está vacío

  const shuffled = [...topicArray].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Genera colores aleatorios en formato hexadecimal
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getIconByDifficulty = (difficulty: string) => {
  switch (difficulty) {
    case 'facil':
      return 'star-border'; // Ícono para fácil
    case 'medio':
      return 'star-half'; // Ícono para medio
    case 'dificil':
      return 'star'; // Ícono para difícil
    default:
      return 'star'; // Ícono por defecto
  }
};

const TopicSelection = () => {
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null); // Estado inicial sin filtro
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showInduction, setShowInduction] = useState(false); // Controla si mostramos la inducción o no
  const [quizStarted, setQuizStarted] = useState(false); // Controla si el quiz ha comenzado
  const [animation] = useState(new Animated.Value(0)); // Valor inicial para la animación
  const [listOpacity] = useState(new Animated.Value(1)); // Valor inicial para la opacidad de la lista
  const [quizAnimation] = useState(new Animated.Value(0)); // Valor inicial para la animación del quiz
  const [isModalVisible, setIsModalVisible] = useState(false); // Cambiado a false por defecto
  const [inductionWords, setInductionWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false); // Estado para controlar la narración

    // Función para alternar la reproducción de la narración
    const toggleSpeech = () => {
      if (isSpeaking) {
        Speech.stop(); // Detener la narración
        setIsSpeaking(false);
        setCurrentWordIndex(inductionWords.length - 1);
      } else if (selectedTopic && selectedTopic.induction) {
        Speech.speak(selectedTopic.induction, { language: 'es' });
        setIsSpeaking(true); // Iniciar la narración
        startInduction();
      }
    };
  const startInduction = () => {
    setIsSpeaking(true);
    if (selectedTopic && selectedTopic.induction) { // Asegúrate de que induction no sea nulo
      setInductionWords(selectedTopic.induction.split(' '));
      setCurrentWordIndex(0);
      setShowInduction(true);
      // Reproduce el texto de la inducción usando expo-speech
      Speech.speak(selectedTopic.induction, {
        language: 'es', // Ajusta el idioma según sea necesario
      });

      
    }
  };
  useEffect(() => {
    let timer;
    if (showInduction && inductionWords.length > 0) {
      timer = setInterval(() => {
        setCurrentWordIndex((prevIndex) => {
          if (prevIndex < inductionWords.length - 1) {
            return prevIndex + 1;
          } else {
            clearInterval(timer);
            //setShowInduction(false); // Cierra la inducción al finalizar
            return prevIndex; // Mantén el último índice
          }
        });
      }, 500); // Cambia cada segundo
    }
    // console.log(inductionWords) 
    // console.log(currentWordIndex)
    return () => clearInterval(timer); // Limpia el intervalo al desmontar
  }, [showInduction, inductionWords]);

  // Filtrar temas aleatoriamente según el filtro de dificultad

  const startQuiz = () => {
    Speech.stop();
    setShowInduction(false); // Restablecer la inducción
    setIsModalVisible(false); // Cerrar el modal
    setQuizStarted(true); // Empezar el quiz
    setIsSpeaking(false);
    // console.log(isSpeaking)
};

// Dentro del render
const onClose = () => {
  setIsModalVisible(false);
};



  const filteredTopics = React.useMemo(() => {
    if (!difficultyFilter) return topics;

    switch (difficultyFilter) {
      case 'facil':
        return getRandomTopics(topics.filter((topic) => topic.difficulty === 'dificil'), 4);
      case 'medio':
        return getRandomTopics(topics.filter((topic) => topic.difficulty === 'dificil'), 8);
      case 'dificil':
        return getRandomTopics(topics.filter((topic) => topic.difficulty === 'dificil'), topics.length);
      default:
        return topics;
    }
  }, [difficultyFilter]);

  // Restablecer el filtro a null cuando el componente se enfoque
  useFocusEffect(
    React.useCallback(() => {
      setDifficultyFilter(null);
    }, [])
  );

  // const showOnboardingPrompt = () => {
  //   setIsModalVisible(true);
  // };

  // Efecto de animación al cambiar el filtro
  useEffect(() => {
    Animated.sequence([
      Animated.timing(listOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(listOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      animation.setValue(0);
    });
  }, [difficultyFilter]);

  // Animación de entrada para el componente Quiz
  useEffect(() => {
    if (selectedTopic) {
      Animated.spring(quizAnimation, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedTopic]);

  
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedTopic(item);
        setIsModalVisible(true); // Abrir el modal al seleccionar un topic
      }}
      style={styles.topicButton}
    >
      <Image source={item.image} style={styles.topicImage} resizeMode="cover" />
      <View style={styles.textContainer}>
        <Text style={styles.topicText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );


  const animatedButtonStyle = {
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.1], // Aumentar tamaño del botón
        }),
      },
    ],
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.7], // Disminuir opacidad del botón
    }),
  };

  return (
    <View style={styles.container}>
      {!quizStarted ? (
                <>
           

          <View style={styles.filterContainer}>
              <TouchableOpacity
                onPress={() => setDifficultyFilter('facil')}
                style={[
                  styles.filterButton,
                  difficultyFilter === 'facil' && styles.activeFilterButton,
                  styles.filterButtoneasy,
                  difficultyFilter === 'facil' && animatedButtonStyle,
                ]}
              >
                <Icon name="star-border" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.filterText}>Fácil</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => setDifficultyFilter('medio')}
                style={[
                  styles.filterButton,
                  difficultyFilter === 'medio' && styles.activeFilterButton,
                  styles.filterButtonmedium,
                  difficultyFilter === 'medio' && animatedButtonStyle,
                ]}
              >
                <Icon name="star-half" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.filterText}>Medio</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => setDifficultyFilter('dificil')}
                style={[
                  styles.filterButton,
                  difficultyFilter === 'dificil' && styles.activeFilterButton,
                  styles.filterButtonhard,
                  difficultyFilter === 'dificil' && animatedButtonStyle,
                ]}
              >
                <Icon name="star" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.filterText}>Difícil</Text>
              </TouchableOpacity>
            </View>
          <Animated.FlatList
            data={filteredTopics}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            numColumns={2}
            style={{ opacity: listOpacity }}
            contentContainerStyle={{ paddingBottom: 100 }}
          />

        <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.overlay}>
            <View style={styles.modalContainer}>
    
                <Text style={styles.modalText}>
                  ¿Quieres aprender más sobre este tema?
                </Text>
              
                <TouchableOpacity style={[styles.button, styles.yesButton]} onPress={() => {
                   startInduction(); 
                      setShowInduction(true);
                      setIsModalVisible(false);
                    }}>
              <Text style={styles.buttonText}>¡Sí, enséñame!</Text>
            </TouchableOpacity>

                  <TouchableOpacity style={[styles.button, styles.noButton]} onPress={startQuiz}>
                    <Text style={styles.buttonText}>No, ¡ya sé!</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>


           
            </View>
            </View>
          </Modal>
          {showInduction && selectedTopic && (
            <Modal
              visible={showInduction}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setShowInduction(false)}
            >
              <View style={styles.modalBackground}>
                <View style={styles.inductionContainer}>
                  
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                  <Image source={selectedTopic.image} style={styles.inductionImage} resizeMode="cover" />
                  {/* Mostrar todas las palabras acumuladas */}
                  <Text style={styles.inductionTexttitle} > {selectedTopic.name.toUpperCase()} </Text>
                  <Text style={styles.inductionText}>
                    {inductionWords.slice(0, currentWordIndex + 1).join(' ')}
                  </Text>
                  </ScrollView>
                  <View style={styles.buttonRow2}>

                      {/* Botón Continuar */}
                      <TouchableOpacity
                          style={styles.speechButton}
                          onPress={toggleSpeech}
                        >
                          <Icon name={isSpeaking ? "volume-off" : "volume-up"} size={24} color="#fff" />
                          <Text style={styles.speechButtonText}>{isSpeaking ? 'Silenciar' : 'Reproducir'}</Text>
                        </TouchableOpacity>

                        
                      <TouchableOpacity style={[styles.button1, styles.yesButton1]} onPress={startQuiz}>
                      <Icon name={"check"} size={24} color="#fff" />
                        <Text style={styles.buttonText}>Continuar</Text>
                      </TouchableOpacity>
                      
                  </View>
                </View>
              </View>
            </Modal>
          )}
                </>
      ) : (
        <Animated.View style={{ flex: 1, opacity: quizAnimation }}>
         <Quiz topic={selectedTopic.name} goBack={() => setQuizStarted(false)} />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    flexDirection: 'row', // Alinea los iconos y el texto en fila
    alignItems: 'center', // Centra verticalmente el contenido
    padding: 10,
    paddingLeft:5,
    borderRadius: 5,
    width: 90,
    textAlign: 'center',
    alignContent:'center'
  },
  icon: {
    marginRight: 5, // Espacio entre el icono y el texto
  },
  activeFilterButton: {
    borderWidth: 2,
    borderColor: 'yellow',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  filterButtoneasy: {
    backgroundColor: '#8bca16',
  },
  filterButtonmedium: {
    backgroundColor: '#ffeb3b',
  },
  filterButtonhard: {
    backgroundColor: '#ed5050',
  },
  filterText: {
    color: '#fff',
    fontSize: 15,
    fontWeight:'bold'
  },
  topicButton: {
    flex: 1,
    margin: 5,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 5,
    height: 150,
    textAlign:'center',
  },
  iconContainer: {
    position: 'absolute',
    top: -30,
    left: 10,
  },
  topicImage: {
    width: '100%',
    height: '60%',
  },
  topicText: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:'center',
  },
  iconeye: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    textAlign:'left',
  },
  infoBox: {
    backgroundColor: '#7ed957',
    padding: 15,
    marginVertical: 10,
    borderRadius: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    color: '#fff',
    fontSize: 11,
    textAlign: 'center',
    flex: 1,

  
  },
  infoTitle: {
    color: '#fff', // Color del texto del título
    fontSize: 16,  // Tamaño del texto del título
    fontWeight: 'bold', // Negrita
    textAlign: 'left', // Alinear al centro
    marginBottom: 5, // Espacio entre el título y el texto
    marginTop: -25,
  },
  lottieAnimation: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  textContainer: {
    flex: 1, // Asegúrate de que el contenedor ocupe el espacio disponible
    alignItems: 'center', // Centrar el contenido
    padding:15
  },
  textContainer2: {
    flex: 1, // Asegúrate de que el contenedor ocupe el espacio disponible
    alignItems: 'center', // Centrar el contenido
    padding: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffeb3b',
    borderRadius: 20,
    padding: 20,
    width: '80%',

  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff5722',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  buttonRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Alinea verticalmente al centro
    width: '100%', // Asegúrate de que ocupe todo el ancho
    marginTop: -20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // fondo semitransparente
  },
  inductionContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    maxHeight: '80%',
  },
  inductionImage: {
    width: '100%',
    height: 200,
    borderRadius:10,
    bottom:0
  },
  inductionText: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 20,
    fontWeight:'bold',
    color:'green'
  },
  inductionTexttitle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight:'bold',
    color:'red'
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: '#4caf50',
  },
  button1: {
    paddingVertical: 10, // Añade más espacio vertical
    paddingHorizontal: 20, // Añade más espacio horizontal
    borderRadius: 5, // Bordes redondeados
    marginTop: 10, // Añade margen superior
    alignItems: 'center', // Centra el texto horizontalmente
    flexDirection: 'row',
    backgroundColor: 'red',
    padding: 10,
    alignContent:'center',
    width:'50%',
    margin:5
  },
  yesButton1: {
    backgroundColor: '#7ed957',
  },
  noButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  speechButton: {
// Cambia el color de fondo
    paddingVertical: 10, // Añade más espacio vertical
    paddingHorizontal: 20, // Añade más espacio horizontal
    borderRadius: 5, // Bordes redondeados
    marginTop: 10, // Añade margen superior
    marginLeft:-5,
    alignItems: 'center', // Centra el texto horizontalmente
    flexDirection: 'row',
    backgroundColor: 'red',
    padding: 10,
    alignContent:'center',
    width:'50%',
    margin:5

   
  },
  closeButton: {
    position: 'absolute',
    top: 1, // Ajusta la distancia desde la parte superior
    right: 10, // Ajusta la distancia desde la derecha
    backgroundColor: 'transparent', // O el color que desees
    zIndex: 1, // Asegúrate de que esté por encima de otros elementos
  },
  closeButtonText: {
    fontSize: 24,
    color: '#ff5722',
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  speechButtonText: {
    fontSize: 12, // Ajusta el tamaño de la fuente
    color: '#fff', // Color del texto
    fontWeight: 'bold', // Añade un peso de fuente negrita
    
  },
  scrollContainer: {
    paddingBottom: 20, // Espacio adicional en la parte inferior
  },
});

export default TopicSelection;
