import React, { useRef, useState, useEffect } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel-v4';
import { View, Image, Modal,Text,TextInput, Button,Dimensions, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackgroundWrapper from './BackgroundWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { DATAINICIO } from '../data/dataInicio';  // Importa DATAINICIO desde el nuevo archivo

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


const WelcomeModal = ({ visible, onClose, userName, onSaveName }) => {
  const [name, setName] = useState(userName || '');  // Cargar el nombre actual

  const handleSave = async () => {
    if (name.trim()) {
      try {
        // Sobrescribir el nombre guardado en AsyncStorage
        await AsyncStorage.setItem('userName', name);
        onSaveName(name);  // Pasar el nombre guardado a la pantalla principal
        onClose();  // Cerrar el modal
      } catch (error) {
        console.error('Error al guardar el nombre:', error);
      }
    } else {
      console.log('Por favor ingresa un nombre válido.');
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
        <Image
            source={require('../../assets/icon_ninos.png')} // Asegúrate de que esta ruta sea la correcta
            style={styles.dogImage}
          />
          <Text style={styles.title}>¡Hola amigo!</Text>
          <TextInput
            placeholder="Ingresa tu nombre"
            value={name}
            onChangeText={(text) => setName(text.toUpperCase())}
            style={styles.input}
            autoFocus={true}  // Enfocar el input automáticamente
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
  <Text style={styles.saveButtonText}>Guardar</Text>
</TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


const InicioScreen = () => {
  const [entries, setEntries] = useState(DATAINICIO);
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [randomEntry, setRandomEntry] = useState(null);
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(false);
  const carouselRef = useRef(null);
  const navigation = useNavigation();

   // Esta función se usa para abrir el modal cuando se selecciona el nombre
   const handleOpenNameModal = () => {
    setUserName('');
    setIsWelcomeVisible(true);  // Mostrar el modal
    // console.log('aqui')
    // console.log(isWelcomeVisible)
  };


  // useEffect(() => {
  //   console.log(isWelcomeVisible)
  //   const loadUserData = async () => {
  //     try {
  //       const savedName = await AsyncStorage.getItem('userName');
  //       const savedAvatar = await AsyncStorage.getItem('avatar');
  //       if (savedName) {
  //         setUserName(savedName);
  //         // console.log(savedName)
  //       }
  //       if (savedAvatar) {
  //         setAvatar(savedAvatar);  
  //       }
  //       // Mostrar modal solo si no hay nombre guardadoA
  //       setIsWelcomeVisible(!savedName);
  //     } catch (error) {
  //       console.error('Error al cargar los datos del usuario:', error);
  //     }
  //   };
  //   const interval = setInterval(() => {
  //     loadUserData();
  //   }, 1000);
    
  //   loadUserData();
  //   setEntries(DATAINICIO);
  //   setRandomEntry(DATAINICIO[Math.floor(Math.random() * DATAINICIO.length)]);
  // }, []);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const savedName = await AsyncStorage.getItem('userName');
        const savedAvatar = await AsyncStorage.getItem('avatar');
        if (savedName) {
          setUserName(savedName);
        }
        if (savedAvatar) {
          setAvatar(savedAvatar);
        }
        setIsWelcomeVisible(!savedName);
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
      }
    };
  
    loadUserData();
    setEntries(DATAINICIO);
    setRandomEntry(DATAINICIO[Math.floor(Math.random() * DATAINICIO.length)]);
  }, []);  // Ejecuta una sola vez al montar el componente
  

  const handleSaveName = async (newName) => {
    try {
      await AsyncStorage.setItem('userName', newName);
      setUserName(newName);
      setIsWelcomeVisible(false);  // Cerrar el modal después de guardar
    } catch (error) {
      console.error('Error al guardar el nombre:', error);
    }
  };



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
        {/* Touchable para abrir el modal al tocar el nombre */}
        <TouchableOpacity onPress={handleOpenNameModal}>  
            <Text style={styles.welcomeText}>
              {userName ? `¡Bienvenido, ${userName}!` : '¡Bienvenido!'}
            </Text>
          </TouchableOpacity>


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
      <WelcomeModal
            visible={isWelcomeVisible}
            onClose={() => setIsWelcomeVisible(false)}
            userName={userName}
            onSaveName={setUserName}  // Pasar la función para guardar el nombre
          />
 
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
    color: '#758a4a',
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
    color: 'white', 
    marginVertical: 20,
    textAlign: 'left',
    alignSelf: 'flex-start',
    width: '100%',
    right: -20,
    bottom:20
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
    color: 'green',
    fontWeight: 'bold',
    marginBottom:15
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
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    backgroundColor: '#ffeb3b',
    borderRadius: 20,
    width: '80%',
    height: '50%',
    
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  // title: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   color: '#ff5722',
  //   marginBottom: 10,
  // },
  message: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
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
  noButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#ff5722',
    fontWeight: 'bold',
    bottom:215,
    paddingLeft:280
  },
  saveButton: {
    backgroundColor: '#4CAF50',  // Color de fondo verde
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 15,  // Añade espacio vertical
  },
  saveButtonText: {
    color: 'white',  // Color de texto blanco
    fontSize: 18,
    fontWeight: 'bold',
  },
  dogImage: {
    width: 100,   // Ajusta el tamaño de la imagen
    height: 100,  // Ajusta el tamaño de la imagen
    resizeMode: 'contain',
    marginBottom: 10,  // Espacio entre la imagen y el texto
  },
});

export default InicioScreen;
