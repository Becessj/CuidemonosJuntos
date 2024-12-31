import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, Image,Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const images = [
  require('../../assets/correct_agenda.png'),
  require('../../assets/correct_agua.png'),
  require('../../assets/correct_bolsasplasticas.png'),
  require('../../assets/correct_botiquin.png'),
  require('../../assets/correct_cereales.png'),
  require('../../assets/correct_chocolate.png'),
  require('../../assets/correct_cuchilla.png'),
  require('../../assets/correct_cuerda.png'),
  require('../../assets/correct_dinero.png'),
  require('../../assets/correct_encendedor.png'),
  require('../../assets/correct_gel.png'),
  require('../../assets/correct_guantes.png'),
  require('../../assets/correct_linterna.png'),
  require('../../assets/correct_mantas.png'),
  require('../../assets/correct_mascarillas.png'),
  require('../../assets/correct_noperecibles.png'),
  require('../../assets/correct_papel.png'),
  require('../../assets/correct_pilas.png'),
  require('../../assets/correct_plastico.png'),
  require('../../assets/correct_radio.png'),
  require('../../assets/correct_silbato.png'),
  require('../../assets/correct_tapetepiso.png'),
  require('../../assets/correct_toallas.png'),
  require('../../assets/correct_utiles.png'),
  require('../../assets/correct_cintamultiusos.png'),


];
const renderDoneButton = () => (
  <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
    <Text style={{ fontWeight: 'bold', color: 'green' }}>Comenzar</Text>
  </TouchableOpacity>
);
const OnboardingScreen = () => {
  const navigation = useNavigation();
  const fallAnimations = images.map(() => useRef(new Animated.Value(-200)).current);

  const handleDone = () => {
    navigation.navigate('GameScreen');
  };

  const handleSkip = () => {
    navigation.navigate('GameScreen');
  };

  useEffect(() => {
    const startAnimations = () => {
      Animated.stagger(200, fallAnimations.map(anim =>
        Animated.timing(anim, {
          toValue: screenHeight - 380, // Ajusta la posición final para que caigan en la mochila
          duration: 1001,
          useNativeDriver: true,
        })
      )).start();
    };

    startAnimations();
  }, []);

  const renderFallingImages = () => {
    const positions = [
      { left: screenWidth * 0.5 - 220, top: screenHeight * 0.02 },  // 2% para la primera imagen (agenda)
      { left: screenWidth * 0.5 + 10, top: screenHeight * -0.41 },  // -38% para la segunda imagen (agua)
      { left: screenWidth * 0.5 + 30, top: screenHeight * 0.02 },   // 2% para la tercera imagen (bolsas plasticas)
      { left: screenWidth * 0.5 - 220, top: screenHeight * -0.42 }, // -40% para la cuarta imagen (botiquin)
      { left: screenWidth * 0.5 - 180, top: screenHeight * -0.025 },// -2.5% para la quinta imagen (cereales)
      { left: screenWidth * 0.5 - 120, top: screenHeight * -0.02 }, // -2% para la sexta imagen (chocolates)
      { left: screenWidth * 0.5 - 60, top: screenHeight * -0.01 },  // -1% para la séptima imagen (cuchilla multipropósito)
      { left: screenWidth * 0.5 + 50, top: screenHeight * -0.05 },  // -5% para la octava imagen (cuerdas)
      { left: screenWidth * 0.5 - 240, top: screenHeight * -0.30 }, // -30% para la primera imagen (dinero)
      { left: screenWidth * 0.5 + 50, top: screenHeight * -0.36 },  // -36% para la tercera imagen (encendedor)
      { left: screenWidth * 0.5 - 10, top: screenHeight * -0.46 },  // -42% para la cuarta imagen (gel)
      { left: screenWidth * 0.5 + 80, top: screenHeight * -0.21 },  // -21% para la quinta imagen (guantes)
      { left: screenWidth * 0.5 + 70, top: screenHeight * -0.15 },  // -15% para la sexta imagen (linterna)
      { left: screenWidth * 0.5 + 70, top: screenHeight * -0.10 },  // -10% para la séptima imagen (manta)
      { left: screenWidth * 0.5 - 150, top: screenHeight * -0.47 }, // -42% para la primera imagen (mascarillas)
      { left: screenWidth * 0.5 - 240, top: screenHeight * -0.23 }, // -23% para la segunda imagen (lata de frijoles)
      { left: screenWidth * 0.5 - 240, top: screenHeight * -0.16 }, // -16% para la tercera imagen (papel higiénico)
      { left: screenWidth * 0.5 - 250, top: screenHeight * -0.10 }, // -10% para la cuarta imagen (pilas)
      { left: screenWidth * 0.5 + 80, top: screenHeight * -0.26 },  // -26% para la quinta imagen (bolsa azul)
      { left: screenWidth * 0.5 + 75, top: screenHeight * -0.02 },  // -2% para la sexta imagen (radio)
      { left: screenWidth * 0.5 + 70, top: screenHeight * -0.32 },  // -32% para la séptima imagen (silbato)
      { left: screenWidth * 0.5 - 10, top: screenHeight * -0.03 },  // -3% para la octava imagen (tapete azul)
      { left: screenWidth * 0.5 - 240, top: screenHeight * -0.35 }, // -35% para la primera imagen (toalla)
      { left: screenWidth * 0.5 - 80, top: screenHeight * -0.48 },  // -42% para la tercera imagen (útiles, lapicero)
      { left: screenWidth * 0.5 - 240, top: screenHeight * -0.04 }, // -4% para la tercera imagen (cinta multiusos)
    ];
    

    return images.map((image, index) => {
      const { left, top } = positions[index];
      return (
        <Animated.Image
          key={index}
          source={image}
          style={[
            styles.fallingImage,
            { transform: [{ translateY: fallAnimations[index] }], left, top },
          ]}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
    <Onboarding
  pages={[
    {
      backgroundColor: '#fff',
      image: <LottieView source={require('../../assets/paso1.json')} autoPlay loop style={styles.animation} />,
      title: '¡PREPÁRATE PARA SER UN SUPERHÉROE!',
      subtitle: '',
      titleStyles: styles.title,
      subTitleStyles: styles.subtitle,
    },
    {
      backgroundColor: '#fff',
      image: (
        <View style={styles.animationContainer}>
          {renderFallingImages()}
          <Image
            source={require('../../assets/bag.png')}
            style={styles.mochilaImage}
          />
        </View>
      ),
      title: '¡RECUERDA!',
      subtitle: 'Esto debes tener en tu mochila de emergencia.',
      titleStyles: styles.title2,
      subTitleStyles: styles.subtitle2,
    },
    {
      backgroundColor: '#fff',
      image: <LottieView source={require('../../assets/paso2.json')} autoPlay loop style={styles.animation} />,
      title: '',
      subtitle: 'Arrastra los elementos correctos a la mochila de emergencias. ¡Diviértete!.',
      titleStyles: styles.title,
      subTitleStyles: styles.subtitle,
    },
  ]}
  onDone={handleDone}
  onSkip={handleSkip}
  showSkip
  bottomBarColor="#7ed957"
  bottomBarHeight={60}
  skipLabel={<Text style={{ fontWeight: 'bold', color: 'green' }}>Omitir</Text>}
  doneLabel={<Text style={{ fontWeight: 'bold', color: 'green' }}>Comenzar</Text>} // Cambiado a "Comenzar"
  nextLabel={<Text style={{ fontWeight: 'bold', color: 'green' }}>Siguiente</Text>}
  bottomBarContainerStyles={styles.bottomBarContainer}
/>
    
      <View style={styles.bottomBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  animationContainer: {
    width: screenWidth * 0.7,
    height: screenHeight * 0.8,
    position: 'relative',
    alignItems: 'center',
  },
  fallingImage: {
    width: screenWidth * 0.12, // Ajusta en base al ancho de la pantalla
    height: screenWidth * 0.12, 
    position: 'absolute',
    resizeMode: 'contain',
  },
  mochilaImage: {
    width: screenWidth * 0.6,  // Ajustado para adaptarse a diferentes pantallas
    height: screenHeight * 0.4,
    position: 'absolute',
    bottom: screenHeight * 0.3,  // Usar proporciones relativas
    zIndex: -1,
  },  
  animation: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.9,
    borderRadius: 10,
    marginBottom: 20,
    bottom:100
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    bottom: 120,
  },
  title2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    bottom: 240,
  },
  subtitle: {
    fontSize: 16,
    color: 'green',
    bottom: 180,
    fontWeight:'bold'
  },
  subtitle2: {
    fontSize: 12,
    color: 'green',
    bottom: 250,
    fontWeight:'bold'
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  bottomBar: {
    height: 90,
  },
});

export default OnboardingScreen;
