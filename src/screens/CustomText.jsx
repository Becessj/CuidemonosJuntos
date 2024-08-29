import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CustomText = ({ style, type = 'default', children }) => {
  return <Text style={[styles[type], style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  default: {
   
    fontSize: 30,
    textAlign: 'center',
    color: 'green',
  },
  title: {
 
    fontSize: 25,
    textAlign: 'center',
    color: 'purple',
    fontWeight: 'bold'
  },

  titlebag: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    fontWeight:'bold',

  },
  subtitle: {
    fontSize: 15,
    textAlign: 'left',
    color: 'black',
    textAlign:'justify'
  },
  caption: {
    
    fontSize: 15,
    textAlign: 'right',
    color: 'gray',
  },
  small: {
    
    fontSize: 12,
    textAlign: 'center',
    color: 'black',
  },
});

export default CustomText;
