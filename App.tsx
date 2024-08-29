import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import BagScreen from './src/screens/BagScreen';
import GeneralArticlesScreen from './src/screens/GeneralArticlesScreen';
import ReserveBoxScreen from './src/screens/ReserveBoxScreen';
import InicioScreen from './src/screens/InicioScreen';
import CardDetailScreen from './src/screens/CardDetailScreen';
import GameScreen from './src/screens/GameScreen';
import HomeBagGame from './src/screens/HomeBagGame';
import OnboardingScreen from './src/screens/OnboardingScreen';
import EmergenciaScreen from './src/screens/EmergenciaScreen'; // Ajusta la ruta según corresponda

import Icon from 'react-native-vector-icons/Ionicons';
import ProfileImageSelector from './src/screens/ProfileImageSelector';

// Importa las imágenes que vas a usar para los íconos
import HomeIcon from './assets/home1.png';
import BackpackIcon from './assets/home2.png';
import InventoryIcon from './assets/home3.png';
import PreguntasIcon from './assets/pregunta.png';
import EmergenciaIcon from './assets/emergencia.png';
// Crear el Stack Navigator
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Inicio" component={InicioScreen} />
      <Stack.Screen name="CardDetail" component={CardDetailScreen} />
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="GeneralArticlesScreen" component={GeneralArticlesScreen} />
      <Stack.Screen name="BagScreen" component={BagScreen} />
      <Stack.Screen name="GameScreen" component={GameScreen} />
      <Stack.Screen name="ReserveBoxScreen" component={ReserveBoxScreen} />
    </Stack.Navigator>
  );
};

// Crear el Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const [activeIndex, setActiveIndex] = useState(null); // Estado para rastrear el ítem activo

  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
          const isFocused = state.index === index;
          
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
              setActiveIndex(index); // Actualizar el ítem activo
            }
          };

          let iconSource;
          if (route.name === 'InicioTab') {
            iconSource = HomeIcon;
          } else if (route.name === 'HomeBagGame') {
            iconSource = BackpackIcon;
          } else if (route.name === 'ReserveBoxScreen') {
            iconSource = InventoryIcon;
          }
          else if (route.name === 'PreguntasScreen') {
            iconSource = PreguntasIcon;
          }
          else if (route.name === 'EmergenciaScreen') {
            iconSource = EmergenciaIcon;
          }

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={styles.tabItem}
            >
              <Image
                source={iconSource}
                style={[
                  styles.tabIcon,
                ]}
              />
              {/* Mostrar el texto solo si el ítem está activo */}
              {activeIndex === index && (
                <Text style={[styles.tabLabel, { color: isFocused ? 'tomato' : 'gray' }]}>
                  {label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};


// Configura las pantallas dentro del Bottom Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="InicioTab"
        component={StackNavigator}
        options={{ title: 'Inicio' }}
      />
      <Tab.Screen
        name="HomeBagGame"
        component={HomeBagGame}
        options={{ title: 'Mochila' }}
      />
      {/* <Tab.Screen
        name="GeneralArticles"
        component={GeneralArticlesScreen}
        options={{ title: 'Otros' }}
      /> */}
      {/* <Tab.Screen
        name="Games"
        component={GameScreen}
        options={{ title: 'Juegos' }}
      /> */}
      <Tab.Screen
        name="PreguntasScreen"
        component={ReserveBoxScreen}
        options={{ title: 'Responde' }}
      />
       <Tab.Screen
        name="EmergenciaScreen"
        component={EmergenciaScreen}
        options={{ title: 'SOS' }}
      />
    </Tab.Navigator>
  );
};

// Crear el Drawer Navigator
const Drawer = createDrawerNavigator();

// Componente de contenido del Drawer con una cabecera personalizada
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image source={require('./assets/leftArrow.png')} style={styles.logo} />
        <Text style={styles.appName}>CUIDEMONOS</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Comparte la app"
        icon={({ color, size }) => <Icon name="briefcase" color={color} size={size} />}
        onPress={() => {}}
      />
      <DrawerItem
        label="Privacidad"
        icon={({ color, size }) => <Icon name="list" color={color} size={size} />}
        onPress={() => {}}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#7ed957', // Color verde para la cabecera del Drawer
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#7ed957'
        },
      }}
    >
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{
          drawerLabel: 'Inicio',
          drawerIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

// Componente principal
const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const storedImage = await AsyncStorage.getItem('@profile_image');
        if (storedImage) {
          setProfileImage(storedImage);
        }
      } catch (error) {
        console.error('Error al cargar la imagen de perfil', error);
      }
    };

    loadProfileImage();
  }, []);

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <DrawerNavigator />
        {/* Agregar los componentes en la esquina superior derecha */}
        <View style={styles.topRightContainer}>
          <View style={styles.starContainer}>
            <Text style={styles.starText}>3</Text>
            <Icon name="star" size={20} color="#ffd700" style={styles.startIcon}/>
            {profileImage ? (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      ) : (
        <ProfileImageSelector onSelect={setProfileImage} />
      )}
          </View>
          
        </View>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : StatusBar.currentHeight, // Espacio para el notch en iOS y el estado en Android
  },
  tabBarContainer: {
    position: 'absolute',
    bottom: 8,
    left: 20,
    right: 20,
    elevation: 2,
    borderRadius: 20,
    backgroundColor: '#fff', // Fondo blanco para el tab bar
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 80,
    borderRadius: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 15, // Tamaño de la letra debajo del ícono
    marginTop: 2, // Espacio entre el ícono y el texto
  },
  drawerHeader: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  topRightContainer: {
    position: 'absolute',
    top: 40,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
    backgroundColor:'white',
    left:50
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    right: -5,
    backgroundColor: '#5dba4c',
    borderRadius: 15,
    width:55,
    height:30,
    bottom: -7
  },
  starText: {
    marginLeft: 5,
    fontSize: 16,
    color: 'white',
    fontWeight:'bold',
    right:-8
  },
  startIcon:{
    marginLeft: 5,
    fontSize: 16,
    fontWeight:'bold',
    right:-8
  },
  tabIcon: {
    width: 40, // Ancho de la imagen del ícono
    height: 40, // Altura de la imagen del ícono
  },
});

export default App;
