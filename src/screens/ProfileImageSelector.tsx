import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultImage = require('../../assets/perro.png'); // Imagen por defecto
const images = [
  require('../../assets/policia.png'),
  require('../../assets/bombero.png'),
  require('../../assets/profilePic.png'),
];

const ProfileImageSelector = () => {
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const [showImageList, setShowImageList] = useState(false);
  const [animation] = useState(new Animated.Value(0)); // Valor inicial de animación

  useEffect(() => {
    const loadImage = async () => {
      try {
        const storedImage = await AsyncStorage.getItem('@profile_image');
        if (storedImage) {
          setSelectedImage({ uri: storedImage });
        } else {
          // Guardar la imagen por defecto si no hay ninguna guardada
          const defaultImageUri = Image.resolveAssetSource(defaultImage).uri;
          await AsyncStorage.setItem('@profile_image', defaultImageUri);
          setSelectedImage(defaultImage);
        }
      } catch (error) {
        console.error('Error loading image from AsyncStorage', error);
      }
    };

    loadImage();
  }, []);

  const handleImageSelect = async (image) => {
    try {
      const imageUri = Image.resolveAssetSource(image).uri;
      await AsyncStorage.setItem('@profile_image', imageUri);
      setSelectedImage(image);
      setShowImageList(false); // Ocultar la lista de imágenes después de seleccionar
      Animated.timing(animation, {
        toValue: 0, // Volver a ocultar la lista de imágenes
        duration: 300,
        useNativeDriver: false,
      }).start();
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la imagen de perfil');
    }
  };

  const toggleImageList = () => {
    if (showImageList) {
      Animated.timing(animation, {
        toValue: 0, // Ocultar la lista de imágenes
        duration: 300,
        useNativeDriver: false,
      }).start(() => setShowImageList(false));
    } else {
      setShowImageList(true);
      Animated.timing(animation, {
        toValue: 1, // Mostrar la lista de imágenes
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const imageListWidth = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 240], // Ajusta el ancho según el número de imágenes
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleImageList} style={styles.imageWrapper}>
        <Image source={selectedImage} style={styles.image} />
      </TouchableOpacity>
      <Animated.View style={[styles.imageListContainer, { width: imageListWidth }]}>
        {showImageList && images.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleImageSelect(image)}
            style={styles.imageButton}
          >
            <Image source={image} style={styles.imageThumbnail} />
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Alinear imagen de perfil y lista de imágenes horizontalmente
    alignItems: 'center',
    padding: 20,
  },
  imageWrapper: {
    marginRight: 20, // Espacio entre la imagen de perfil y la lista de imágenes
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
    left: -100
  },
  imageListContainer: {
    overflow: 'hidden', // Asegura que el contenido no se desborde del contenedor
    flexDirection: 'row',
    alignItems: 'flex-start', // Alinear la lista a la izquierda
    position: 'absolute', // Para que la lista se coloque encima de otros elementos
    left: -250, // Ajusta la posición para que se despliegue a la izquierda del perfil
    top: 10, // Ajusta según sea necesario
  },
  imageButton: {
    marginBottom: 10, // Espacio entre las imágenes en la lista
  },
  imageThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ddd',
    left: 15,
    bottom: 0
  },
});

export default ProfileImageSelector;
