import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Modal, Switch, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Defs, Mask, Rect, Image as SvgImage } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native'; // Importar Lottie
import BackgroundWrapper from './BackgroundWrapper';
import CustomText from './CustomText';
import { initialChecklists, imageSource, cards } from '../data/checklistData';


// const clearAsyncStorage = async () => {
//   try {
//     await AsyncStorage.clear();
//     console.log('AsyncStorage cleared successfully.');
//   } catch (error) {
//     console.error('Error clearing AsyncStorage:', error);
//   }
// };
// clearAsyncStorage()   
 


const BagScreen = () => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentChecklist, setCurrentChecklist] = useState([]);
  const [currentTitle, setCurrentTitle] = useState('');
  const [showFullLottie, setShowFullLottie] = useState(false); // Nuevo estado para controlar la animación de pantalla completa

  const [hasBabies, setHasBabies] = useState(false);
  const [hasPets, setHasPets] = useState(false);
  const [hasIllnesses, setHasIllnesses] = useState(false);

  useEffect(() => {
    const initializeChecklists = async () => {
      for (const title in initialChecklists) {
        const savedChecklist = await AsyncStorage.getItem(title);
        if (!savedChecklist) {
          await AsyncStorage.setItem(title, JSON.stringify(initialChecklists[title]));
        }
      }
    };
    initializeChecklists();
    calculateProgress();
  }, [hasBabies, hasPets, hasIllnesses]);

  
  const calculateProgress = async () => {
    let totalItems = 0;
    let completedItems = 0;
    let allChecklistsCompleted = true;
  
    for (const card of cards) {
      // Saltar secciones desactivadas
      if ((card.title === 'Bebés' && !hasBabies) ||
          (card.title === 'Mascotas' && !hasPets) ||
          (card.title === 'Adulto mayor' && !hasIllnesses)) {
        // Asumir que las secciones desactivadas están completas
        if (card.title === 'Bebés' && !hasBabies ||
            card.title === 'Mascotas' && !hasPets ||
            card.title === 'Adulto mayor' && !hasIllnesses) {
          continue;
        }
      }
  
      const savedChecklist = await AsyncStorage.getItem(card.title);
      if (savedChecklist) {
        const checklist = JSON.parse(savedChecklist);
        for (const item of checklist) {
          totalItems++;
          if (item.completed) {
            completedItems++;
          }
          if (item.subChecklist) {
            totalItems += item.subChecklist.length;
            completedItems += item.subChecklist.filter((subItem) => subItem.completed).length;
          }
        }
      }
    }
    // console.log(completedItems)
    // Verificar si todas las secciones desactivadas están completas
    if (!hasBabies && !hasPets && !hasIllnesses) {
      const requiredCompletionCounts = {
        'Bebés': 26,
        'Mascotas': 35,
        'Adulto mayor': 30 , 
        'Bebes y adulto' : 39,
        'Adulto y mascota' : 34
      };
  
      if (completedItems === requiredCompletionCounts['Bebés'] ||
          completedItems === requiredCompletionCounts['Mascotas'] ||
          completedItems === requiredCompletionCounts['Adulto mayor']||
          completedItems === requiredCompletionCounts['Bebes y adulto']||
          completedItems === requiredCompletionCounts['Adulto y mascota']) {
        setProgress(100);
        // setShowFullLottie(true);
        setTimeout(() => {
          setShowFullLottie(false);
        }, 5000);
        return;
      }
    }
  
    // Calcular progreso normal
    if (totalItems > 0) {
      const newProgress = (completedItems / totalItems) * 100;
      setProgress(newProgress);
  
      if (newProgress >= 100) {
        setShowFullLottie(true);
        setTimeout(() => {
          setShowFullLottie(false);
        }, 2000);
      }
    } else {
      setProgress(0);
    }
  };

  const openModal = async (title) => {
    setCurrentTitle(title);
    const savedChecklist = await AsyncStorage.getItem(title);
    if (savedChecklist) {
      setCurrentChecklist(JSON.parse(savedChecklist));
    } else {
      setCurrentChecklist(initialChecklists[title]);
    }
    setModalVisible(true);
  };
  const toggleItem = (index) => {
    setCurrentChecklist((prevChecklist) => {
        const newChecklist = [...prevChecklist];
        const item = newChecklist[index];

        // Cambiar el estado del item principal
        item.completed = !item.completed;

        // Si el item tiene un subChecklist y se desactiva, desmarcar todos los subítems
        if (item.subChecklist && !item.completed) {
            item.subChecklist = item.subChecklist.map(subItem => ({
                ...subItem,
                completed: false,
            }));
        }

        AsyncStorage.setItem(currentTitle, JSON.stringify(newChecklist));
        calculateProgress();
        return newChecklist;
    });
};

  

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        if (item.title === 'Artículos generales por familia') {
          navigation.navigate('GeneralArticlesScreen');
        } else {
          openModal(item.title);
        }
      }}
    >
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Icon name="chevron-forward" size={24} color="#007AFF" />
      </View>
    </TouchableOpacity>
  );

  const renderChecklistItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => toggleItem(index)} style={styles.checklistItem}>
      <Image source={item.image} style={styles.checklistImage} />
      <Text style={styles.checklistText}>{item.text}</Text>
      <Switch
        value={item.completed}
        onValueChange={() => toggleItem(index)}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={item.completed ? '#f5dd4b' : '#f4f3f4'}
      />
      {item.completed && item.subChecklist && (
        <FlatList
          data={item.subChecklist}
          renderItem={({ item: subItem, index: subIndex }) => (
            <View style={styles.subChecklistItem}>
              <Image source={subItem.image} style={styles.checklistImage} />
              {/* <Text style={styles.checklistText}>{subItem.text}</Text> */}
              <Switch
                value={subItem.completed}
                onValueChange={() => {
                  setCurrentChecklist((prevChecklist) => {
                    const newChecklist = [...prevChecklist];
                    newChecklist[index].subChecklist[subIndex].completed = !subItem.completed;
                    AsyncStorage.setItem(currentTitle, JSON.stringify(newChecklist));
                    calculateProgress();
                    return newChecklist;
                  });
                }}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={subItem.completed ? '#f5dd4b' : '#f4f3f4'}
              />
            </View>
          )}
          keyExtractor={(subItem) => subItem.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
        />
      )}
    </TouchableOpacity>
  );
  
  

  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.container}>
        {showFullLottie && (
          <View style={styles.fullscreenLottieContainer}>
            <LottieView
              source={require('../../assets/celebration.json')}
              autoPlay
              loop={false}
              style={styles.fullscreenLottie}
            />
          </View>
        )}
        <View style={styles.progressContainer}>
          {progress < 30 ? (
            <View style={styles.questionContainer}>
              <LottieView
                source={require('../../assets/questionLottie.json')}
                autoPlay
                loop
                style={styles.questionLottie}
              />
            </View>
          ) : (
            <Svg width={300} height={300} viewBox="0 0 300 300">
              <Defs>
                <Mask id="mask" x="0" y="0" width="300" height="300">
                  <Rect x="0" y="0" width="300" height="300" fill="black" />
                  <Rect
                    x="0"
                    y="0"
                    width={(300 * progress) / 100}
                    height="300"
                    fill="white"
                  />
                </Mask>
              </Defs>
              <SvgImage
                x="0"
                y="0"
                width="300"
                height="300"
                href={imageSource.animal}
                mask="url(#mask)"
              />
            </Svg>
          )}
          <View style={styles.progressTextContainer}>
            <Text style={styles.progressText}>{`${Math.round(progress)}%`}</Text>
            <CustomText type='titlebag'>
              {progress >= 100 ? '¡Lo Lograste!' : ''}
            </CustomText>
          </View>
        </View>
        <FlatList
          data={cards}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
        />
        <View style={styles.bottomSpacer} />
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity 
            style={styles.modalContainer} 
            activeOpacity={1} 
            onPress={() => setModalVisible(false)}
          >
            <TouchableOpacity 
              style={styles.modalContent} 
              activeOpacity={1} 
              onPress={() => {}} // Esto evita que el modal se cierre si haces clic dentro del contenido
            >
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Icon name="close" size={30} color="#FF6347" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{currentTitle}</Text>
              <FlatList
                data={currentChecklist}
                renderItem={renderChecklistItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.modalChecklistContainer}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    </BackgroundWrapper>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'purple',
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: -20,
  },
  questionContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start', // Asegura que esté pegado a la parte superior
    marginTop:  -70, // Eliminar cualquier margen superior
  },
  questionLottie: {
    width: 450,
    height: 350,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: 'orange',
  },
  fullscreenLottieContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  fullscreenLottie: {
    width: '100%',
    height: '100%',
  },
  progressTextContainer: {
    alignItems: 'center',
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    marginTop: -40,
    
  },
  progressText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#dde433',
    marginTop: -70,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 20,
    maxHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:'#7ed957'
  },

  checklistText: {
    fontSize: 14,
    color:'#7ed957',
    fontWeight:'bold'
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
   bottomSpacer: {
    height: 50,  // Ajusta la altura del espacio según lo que necesites
  },
  listContent: {
    paddingBottom: 20, // Ajusta este valor según el tamaño de tu barra de pestañas
  },

  checklistItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap', // Permite que los elementos se envuelvan en la siguiente línea
  },
  checklistItem: {
    width: '50%', // Ocupa aproximadamente la mitad de la pantalla
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,

  },
  checklistImage: { 
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10,
  },
  modalChecklistContainer: {
    paddingHorizontal: 10,
  },
  subChecklistItem: {
    
    flex: 1, // Permite que el elemento ocupe el espacio disponible de la columna
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    margin: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden', // Oculta cualquier contenido que se desborde
  },
  
  row: {
    marginBottom: 1,
  },
});

export default BagScreen; 
