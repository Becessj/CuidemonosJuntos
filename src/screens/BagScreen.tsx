import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Modal, Switch, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Defs, Mask, Rect, Image as SvgImage } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native'; // Importar Lottie
import BackgroundWrapper from './BackgroundWrapper';
import CustomText from './CustomText';
import { initialChecklists, imageSource, cards } from '../data/checklistData';
import DateTimePicker from '@react-native-community/datetimepicker';
import { compareAsc, differenceInDays } from 'date-fns';
import * as Notifications from 'expo-notifications';
const { width: screenWidth } = Dimensions.get('window');


// const clearAsyncStorage = async () => {
//   try {
//     await AsyncStorage.clear();
//     console.log('AsyncStorage cleared successfully.');
//   } catch (error) {
//     console.error('Error clearing AsyncStorage:', error);
//   }
// };
// clearAsyncStorage()          
const scheduleNotification = async (title, body, date) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: date,
  });
};
 

const BagScreen = () => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentChecklist, setCurrentChecklist] = useState([]);
  const [currentTitle, setCurrentTitle] = useState('');
  const [showFullLottie, setShowFullLottie] = useState(false); // Nuevo estado para controlar la animación de pantalla completa
  const today = new Date();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);

  const [medicamentosDate, setMedicamentosDate] = useState(null);
  const [lataLecheDate, setLataLecheDate] = useState(null);
  const [dateType, setDateType] = useState(null); // Nuevo estado para diferenciar tipos de fecha


  const [hasBabies, setHasBabies] = useState(false);
  const [hasPets, setHasPets] = useState(false);
  const [hasIllnesses, setHasIllnesses] = useState(false);
  const checkForExpiryDates = async () => {
    // Verificar las fechas de vencimiento de medicamentos y lata de leche
    if (medicamentosDate) {
      const daysRemaining = differenceInDays(medicamentosDate, new Date());
      if (daysRemaining <= 7) {
        scheduleNotification(
          '¡Medicamentos por vencer!',
          'Tus medicamentos están por vencer en menos de un mes.',
          medicamentosDate
        );
      }
    }

    if (lataLecheDate) {
      const daysRemaining = differenceInDays(lataLecheDate, new Date());
      // console.log(daysRemaining)
      if (daysRemaining <= 7) {
        scheduleNotification(
          '¡Lata de leche por vencer!',
          'La lata de leche está por vencer en menos de un mes.',
          lataLecheDate
        );
      }
    }
  };

  useEffect(() => {

    checkForExpiryDates();
  }, [medicamentosDate, lataLecheDate]);

  
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

  useEffect(() => {
    const loadSavedDates = async () => {
      const newChecklist = [...currentChecklist];
      for (const item of newChecklist) {
        if (item.subChecklist) {
          for (const subItem of item.subChecklist) {
            const key = `${currentTitle}-${subItem.id}-expiryDate`;
            const savedDate = await AsyncStorage.getItem(key);
            if (savedDate) {
              subItem.expiryDate = new Date(JSON.parse(savedDate)); // Convertir a Date
            }
          }
        }
      }
      setCurrentChecklist(newChecklist);
    };
    
    
  
    if (modalVisible) {
      loadSavedDates();
    }
  }, [modalVisible]);
  
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
      console.error('Error actualizando estrellas', error);
    }
  };

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
        'los5': 25,
        'Bebés': 34,
        // 'Mascotas': 35,
        'Adulto mayor': 29 , 
        'Bebes y adulto' : 38,
        'Adulto y mascota' : 33
      };
  
      if (completedItems === requiredCompletionCounts['los5']||
          completedItems === requiredCompletionCounts['Bebés'] ||
          // completedItems === requiredCompletionCounts['Mascotas'] ||
          completedItems === requiredCompletionCounts['Adulto mayor']||
          completedItems === requiredCompletionCounts['Bebes y adulto']||
          completedItems === requiredCompletionCounts['Adulto y mascota']) {
        setProgress(100);

        setShowFullLottie(true);
        await updateStars(5);
        // setShowFullLottie(true);
        setTimeout(() => {
          setShowFullLottie(false);
        }, 5000);
        return;
      }
    }
  
    // Calcular progreso normal
    if (totalItems > 0) {
      // console.log('total items : '+ totalItems)
      // console.log('completed items : '+ completedItems)
      const newProgress = (completedItems / totalItems) * 100;
      setProgress(newProgress);
  
      if (newProgress >= 100) {
        setShowFullLottie(true);
  
        await updateStars(5);
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
  const toggleItem = async (index) => {
    setCurrentChecklist((prevChecklist) => {
      const newChecklist = [...prevChecklist];
      const item = newChecklist[index];
  
      // Cambiar el estado del ítem principal
      item.completed = !item.completed;
  
      // Si el ítem tiene un subChecklist y se desactiva, desmarcar todos los subítems y cambiar la fecha
      if (item.subChecklist && !item.completed) {
        item.subChecklist = item.subChecklist.map(subItem => ({
          ...subItem,
          completed: false,
          expiryDate: null // Establecer la fecha a null
        }));
  
        // Eliminar las fechas de vencimiento de AsyncStorage
        item.subChecklist.forEach(subItem => {
          const key = `${currentTitle}-${subItem.id}-expiryDate`;
          AsyncStorage.removeItem(key);
        });
      }
  
      // Guardar el estado actualizado en AsyncStorage
      AsyncStorage.setItem(currentTitle, JSON.stringify(newChecklist));
  
      // Recalcular el progreso
      calculateProgress();
  
      return newChecklist;
    });
  };
  

  const handleSubItemToggle = async (index, subIndex) => {
    setCurrentChecklist((prevChecklist) => {
      const newChecklist = [...prevChecklist];
      const subItem = newChecklist[index].subChecklist[subIndex];
  
      if (!subItem.completed) {
        subItem.completed = true;
  
        if (subItem.text === 'Medicamentos' || subItem.text === 'Lata de Leche') {
          setSelectedSubItem(subItem);
          setDateType(subItem.text);
          setShowDatePicker(true);
        }
      } else {
        subItem.completed = false;
        subItem.expiryDate = null; // Establecer la fecha a null
  
        // Eliminar la fecha de vencimiento de AsyncStorage
        const key = `${currentTitle}-${subItem.id}-expiryDate`;
        AsyncStorage.removeItem(key);
      }
  
      AsyncStorage.setItem(currentTitle, JSON.stringify(newChecklist));
      calculateProgress();
  
      return newChecklist;
    });
  };
  
  


const formatDate = (date) => {
  // Verificar si 'date' es una instancia de Date válida
  if (!(date instanceof Date) || isNaN(date)) {
    return 'Sin fecha'; // Retorna un valor por defecto si no es una fecha válida
  }

  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Maneja el cambio de fecha en el DateTimePicker
const handleDateChange = (event, date) => {
  setShowDatePicker(false);
  if (date) {
    if (dateType === 'Medicamentos') {
      setMedicamentosDate(date);
    } else if (dateType === 'Lata de Leche') {
      setLataLecheDate(date);
    }

    if (selectedSubItem) {
      setCurrentChecklist((prevChecklist) => {
        const newChecklist = [...prevChecklist];
        const index = newChecklist.findIndex(item => item.subChecklist && item.subChecklist.some(subItem => subItem.id === selectedSubItem.id));
        if (index > -1) {
          const subIndex = newChecklist[index].subChecklist.findIndex(subItem => subItem.id === selectedSubItem.id);
          if (subIndex > -1) {
            newChecklist[index].subChecklist[subIndex].expiryDate = date;

            // Guardar la fecha en AsyncStorage
            const key = `${currentTitle}-${selectedSubItem.id}-expiryDate`;
            AsyncStorage.setItem(key, JSON.stringify(date.toISOString()));

            newChecklist[index].subChecklist[subIndex].completed = true; // Completar el subítem después de establecer la fecha  
          }
        }

        AsyncStorage.setItem(currentTitle, JSON.stringify(newChecklist));
        calculateProgress();
        return newChecklist;
      });

      setSelectedSubItem(null);
    }
  }
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
    <TouchableOpacity style={styles.checklistItem}>
      <TouchableOpacity onPress={() => toggleItem(index)}>
        <Image source={item.image} style={styles.checklistImage} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleItem(index)}>
      <Text style={styles.checklistText}>{item.text}</Text>
      </TouchableOpacity>
      
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
              <TouchableOpacity style={styles.checklistImage} onPress={() => handleSubItemToggle(index, subIndex)}>
               <Image source={subItem.image} style={styles.checklistImage} />
             </TouchableOpacity>
              
              <Text style={styles.checklistText}>{subItem.text}</Text>
              <Switch
                value={subItem.completed}
                onValueChange={() => handleSubItemToggle(index, subIndex)}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={subItem.completed ? '#f5dd4b' : '#f4f3f4'}
              />
             {
              (subItem.text === 'Medicamentos' || subItem.text === 'Lata de Leche') ? (
                !subItem.expiryDate ? (
                  <Text style={styles.expirationDateText}>F. de venc.: Sin fecha</Text>
                ) : (
                  <Text style={styles.expirationDateText}>F. de venc.: {formatDate(subItem.expiryDate)}</Text>
                )
              ) : null // No mostrar nada para otros ítems
            }
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
                numColumns={1}
                contentContainerStyle={styles.modalChecklistContainer}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={today}  
          />
        )}
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
    color: 'green',
    textAlign:'center'
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
    color: '#7ed957',
    fontWeight: 'bold',
    marginHorizontal: 0,
    flexShrink: 1,         // Permite que el texto se reduzca para ajustarse al contenedor
    flexWrap: 'wrap',      // Permite que el texto se envuelva en una nueva línea si es necesario
    textAlign: 'left',     // Alinea el texto a la izquierda (o como prefieras)
    overflow: 'hidden',    // Oculta cualquier parte del texto que se desborde
},

  columnWrapper: {
    justifyContent: 'space-between',
  },
   bottomSpacer: {
    height: 50,  // Ajusta la altura del espacio según lo que necesites
  },
  listContent: {
    paddingBottom: 30, // Ajusta este valor según el tamaño de tu barra de pestañas
  },

  checklistItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap', // Permite que los elementos se envuelvan en la siguiente línea
  },
  checklistItem: {
    width: '100%', // Ocupa el 100% del ancho de la pantalla
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
    marginHorizontal: 0, // Elimina márgenes laterales para ocupar todo el ancho
    padding: 10, // Agrega algo de padding interno para que los elementos tengan espacio dentro del contenedor
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
    marginTop:-10,
    flexDirection: 'column', // Organiza los elementos en columna
    alignItems: 'center', // Alinea los elementos al inicio
    padding: 1, // Espacio interno
    marginVertical: 5, // Aumenta el espacio vertical entre los ítems
    marginHorizontal: 5, // Agrega separación horizontal (espacio entre los bordes laterales y los ítems)
    // backgroundColor: '#fff',
    // borderColor: '#ddd',
    // borderWidth: 1,
    borderRadius: 10, // Redondear las esquinas del contenedor
    overflow: 'hidden', // Oculta cualquier contenido que se desborde
  },
  
  row: {
    marginBottom: 0,

  },
  expirationDateText: {
    fontSize: 10, // Tamaño de la fuente
    color: '#333', // Color del texto
    fontWeight: 'bold', // Peso de la fuente
  }
});

export default BagScreen; 
