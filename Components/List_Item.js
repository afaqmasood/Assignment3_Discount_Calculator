import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';

const ListItem = ({ price, discount, discountedPrice }) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        console.log('Button Clicked!');
      }}
    >
      <Text>{price}</Text>
      <Text>{discount}</Text>
      <Text>{discountedPrice}</Text>
    </Pressable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 35,
    padding: 15,
    marginTop: 12,
    backgroundColor: '#a7a8a6',
  },
});