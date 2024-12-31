import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultImage = require('../../assets/perro.png'); // Imagen por defecto
const images = [
  { id: '1', source: require('../../assets/policia.png') },
  { id: '2', source: require('../../assets/bombero.png') },
  { id: '3', source: require('../../assets/profilePic.png'), },
  { id: '4', source: require('../../assets/perro.png'), },
];

const ProfileImageSelector = () => {
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const [showImageList, setShowImageList] = useState(false);
  const [animation] = useState(new Animated.Value(0)); // Valor inicial de animación

  useEffect(() => {
    const loadImage = async () => {
      try {
        const storedImageId = await AsyncStorage.getItem('@profile_image_id');
        if (storedImageId) {
          const selectedImageObj = images.find(image => image.id === storedImageId);
          if (selectedImageObj) {
            setSelectedImage(selectedImageObj.source);
          }
        } else {
          // Guardar la imagen por defecto si no hay ninguna guardada
          await AsyncStorage.setItem('@profile_image_id', 'default');
          setSelectedImage(defaultImage);
        }
      } catch (error) {
        console.error('Error loading image:', error);
      }
    };

    loadImage();
  }, []);

  const handleImageSelect = async (image) => {
    try {
      await AsyncStorage.setItem('@profile_image_id', image.id);
      setSelectedImage(image.source);
      setShowImageList(false);
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const toggleImageList = () => {
    Animated.timing(animation, {
      toValue: showImageList ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setShowImageList(!showImageList));
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
        {showImageList && images.map((image) => (
          <TouchableOpacity
            key={image.id}
            onPress={() => handleImageSelect(image)}
            style={styles.imageButton}
          >
            <Image source={image.source} style={styles.imageThumbnail} />
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
    left: -115
  },
  imageListContainer: {
    overflow: 'hidden', // Asegura que el contenido no se desborde del contenedor
    flexDirection: 'row',
    alignItems: 'flex-start', // Alinear la lista a la izquierda
    position: 'absolute', // Para que la lista se coloque encima de otros elementos
    left: -315, // Ajusta la posición para que se despliegue a la izquierda del perfil
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
    bottom: -7
  },
});

export default ProfileImageSelector;
