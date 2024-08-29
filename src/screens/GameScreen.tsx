import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import BackgroundWrapper from './BackgroundWrapper';
import CustomText from './CustomText';

const shuffleArray = (array: any[]) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

const initialRounds = [
  [
    { image: require('../../assets/agua1.png'), correct: false },
    { image: require('../../assets/agua2.png'), correct: false },
    { image: require('../../assets/agua3.png'), correct: false },
    { image: require('../../assets/correct_agua.png'), correct: true },
  ],
  [
    { image: require('../../assets/correct_noperecibles.png'), correct: true },
    { image: require('../../assets/noperecibles1.png'), correct: false },
    { image: require('../../assets/noperecibles2.png'), correct: false },
    { image: require('../../assets/noperecibles3.png'), correct: false },
  ],
  [
    { image: require('../../assets/botiquin4.png'), correct: false },
    { image: require('../../assets/correct_botiquin1.png'), correct: true },
    { image: require('../../assets/botiquin2.png'), correct: false },
    { image: require('../../assets/botiquin3.png'), correct: false },
  ],
  [
    { image: require('../../assets/cuchilla1.png'), correct: false },
    { image: require('../../assets/cuchilla2.png'), correct: false },
    { image: require('../../assets/cuchilla3.png'), correct: false },
    { image: require('../../assets/correct_cuchilla.png'), correct: true },
  ],
  [
    { image: require('../../assets/correct_linterna.png'), correct: true },
    { image: require('../../assets/linterna1.png'), correct: false },
    { image: require('../../assets/linterna2.png'), correct: false },
    { image: require('../../assets/linterna3.png'), correct: false },
  ],
  [
    { image: require('../../assets/correct_mantas.png'), correct: true },
    { image: require('../../assets/mantas1.png'), correct: false },
    { image: require('../../assets/mantas2.png'), correct: false },
    { image: require('../../assets/mantas3.png'), correct: false },
  ],
  [
    { image: require('../../assets/correct_radio.png'), correct: true },
    { image: require('../../assets/radio1.png'), correct: false },
    { image: require('../../assets/radio2.png'), correct: false },
    { image: require('../../assets/radio3.png'), correct: false },
  ],
  [
    { image: require('../../assets/correct_utiles.png'), correct: true },
    { image: require('../../assets/utiles1.png'), correct: false },
    { image: require('../../assets/utiles2.png'), correct: false },
    { image: require('../../assets/utiles3.png'), correct: false },
  ]
];


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const bagSize = Math.min(screenWidth * 3, screenHeight * 0.4);

const GameScreen = () => {
  const [currentRound, setCurrentRound] = useState(0);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);
  const [showFinalAnimation, setShowFinalAnimation] = useState(false);
  const [showWrongAnimation, setShowWrongAnimation] = useState(false);

  const congratsAnimation = useRef<LottieView>(null);
  const finalAnimation = useRef<LottieView>(null);
  const wrongAnimation = useRef<LottieView>(null);

  const [rounds, setRounds] = useState(initialRounds.map(round => shuffleArray(round)));
  const images = rounds[currentRound];

  const translateXArray = images.map(() => useSharedValue(0));
  const translateYArray = images.map(() => useSharedValue(0));

  const createAnimatedStyle = (index: number) =>
    useAnimatedStyle(() => ({
      transform: [
        { translateX: translateXArray[index].value },
        { translateY: translateYArray[index].value },
      ],
    }));

  const onDragEnd = (itemIndex: number) => {
    if (images[itemIndex].correct) {
      setScore(score + 1);
      setShowCongrats(true);
      congratsAnimation.current?.play();

      setTimeout(() => {
        setShowCongrats(false);
        nextRound();
      }, 2000);
    } else {
      setShowWrongAnimation(true);
      wrongAnimation.current?.play();

      setTimeout(() => {
        setShowWrongAnimation(false);
        nextRound();
      }, 2000);
    }

    translateXArray[itemIndex].value = withSpring(0);
    translateYArray[itemIndex].value = withSpring(0);
    setDraggingIndex(null);
  };

  const nextRound = () => {
    if (currentRound < rounds.length - 1) {
      setCurrentRound(currentRound + 1);
    } else {
      if (score >= 5) {
        setShowFinalAnimation(true);
        finalAnimation.current?.play();

        setTimeout(() => {
          resetGame();
        }, 4000);
      } else {
        // Aquí podrías añadir otra animación para un puntaje bajo si lo deseas
        resetGame();
      }
    }
  };

  const resetGame = () => {
    setShowFinalAnimation(false);
    setCurrentRound(0);
    setScore(0);
    setRounds(initialRounds.map(round => shuffleArray(round)));
  };

  return (
    <BackgroundWrapper>
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.headerContainer}>
        <CustomText type="titlebag">MOCHILA DE EMERGENCIA</CustomText>
      </View>
      <Text style={styles.subHeaderText}>¿Qué debo llevar?</Text>

      <View style={styles.bagContainer}>
        <Image
          source={require('../../assets/bag.png')}
          style={[styles.bag, { width: bagSize, height: bagSize }]}
        />
      </View>

      <View style={styles.itemsContainer}>
        {images.map((item, index) => (
          <PanGestureHandler
            key={index}
            enabled={draggingIndex === null || draggingIndex === index}
            onGestureEvent={(event) => {
              if (draggingIndex === index || draggingIndex === null) {
                translateXArray[index].value = event.nativeEvent.translationX;
                translateYArray[index].value = event.nativeEvent.translationY;
              }
            }}
            onBegan={() => setDraggingIndex(index)}
            onEnded={() => onDragEnd(index)}
          >
            <Animated.View style={[styles.imageContainer, createAnimatedStyle(index)]}>
              <Image source={item.image} style={styles.image} />
            </Animated.View>
          </PanGestureHandler>
        ))}
      </View>

      {(showCongrats || showFinalAnimation || showWrongAnimation) && (
        <View style={styles.overlay}>
          {showCongrats && (
            <LottieView
              ref={congratsAnimation}
              source={require('../../assets/congrats.json')}
              autoPlay
              loop={false}
              style={styles.lottie}
            />
          )}
          {showFinalAnimation && (
            <LottieView
              ref={finalAnimation}
              source={require('../../assets/finalAnimation.json')}
              autoPlay
              loop={false}
              style={styles.lottie}
            />
          )}
          {showWrongAnimation && (
            <LottieView
              ref={wrongAnimation}
              source={require('../../assets/wrong.json')}
              autoPlay
              loop={false}
              style={styles.lottie}
            />
          )}
        </View>
      )}
    </GestureHandlerRootView>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  
  },
  headerContainer: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 60,
    width: screenWidth * 0.9,
    bottom:50
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
 // Usa la fuente personalizada aquí
  },
  subHeaderText: {
    fontSize: 30,
    color: 'black',
    marginTop: 350,
    bottom:140,
    fontWeight:'bold'
 // Usa la fuente personalizada aquí
  },
  bagContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '15%',
    bottom:330
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    bottom:150
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  bag: {
    resizeMode: 'contain',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Capa opaca
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 500,
    height: 500,
  },
});

export default GameScreen;
