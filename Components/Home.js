import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { Input } from 'react-native-elements';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TextInput,
    Keyboard,
    TouchableOpacity,
  } from 'react-native';

  export default function componentName({ navigation }) {
    const [result, setResult] = useState('');
    const [price, setPrice] = useState('');
    const [percentage, setPercentage] = useState('');
    const [data, setData] = useState([
      {
        price: '120',
        discount: '20',
        discountedPrice: '100',
      },
      {
        price: '80',
        discount: '15',
        discountedPrice: '65',
      },
      {
        price: '100',
        discount: '40',
        discountedPrice: '60',
      },
    ]);
  
    const [object, setObject] = useState({
      id: '',
      price: '',
      discount: '',
      discountedPrice: '',
    });
  
    navigation.setOptions({
      title: 'Discount Calculator',
      headerRight: () => (
        <View style={{ paddingRight: 10 }}>
          <Button
            title='History'
            onPress={() => navigation.navigate('History')}
          />
        </View>
      ),
      headerStyle: {
        backgroundColor: '#c1f48e',
      },
    });
  
    const calculate = () => {
      if (percentage >= 0 && price >= 0 && percentage <= 100) {
        var discounted = (price * percentage) / 100;
        var newPrice = price - discounted;
        setResult(newPrice.toFixed(2));
        setObject((object) => ({ ...object, id: uuid.v1() }));
        setObject((object) => ({ ...object, price: price }));
        setObject((object) => ({ ...object, discount: percentage + '%' }));
        setObject((object) => ({ ...object, discountedPrice: result }));
        console.log(object.id);
      } else if (percentage > 100) {
        console.log(':error');
      } else if (percentage < 0 || actualPrice < 0) {
        console.log('errr');
      }
    };
  
    useEffect(() => {
      calculate();
    }, [percentage, price, result]);
  
    const storeData = async () => {
      try {
        let data = object;
        let jsonValue = await AsyncStorage.getItem('@History:key');
        let prevData = jsonValue != null ? JSON.parse(jsonValue) : [];
        if (prevData.length > 0) {
          prevData = [...prevData, data];
        } else {
          prevData = [];
          prevData.push(data);
        }
        jsonValue = JSON.stringify(prevData);
        await AsyncStorage.setItem('@History:key', jsonValue);
        setPrice('');
        setPercentage('');
        console.log(jsonValue);
      } catch (e) {
        console.log(e);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.result}>{result}</Text>
  
        <Input
          placeholder='Price'
          keyboardType='Numeric'
          value={price}
          onChangeText={(text) => setPrice(text)}
        />
  
        <Input
          placeholder='Percentage %'
          keyboardType='Numeric'
          value={percentage}
          onChangeText={(text) => setPercentage(text)}
        />
        <TouchableOpacity style={styles.btn} onPress={storeData}>
          <Text style={styles.btnText}> Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      paddingBottom: 70,
    },
    inputField: {
      marginTop: 15,
      height: 35,
      borderColor: 'black',
      borderWidth: 2,
    },
    result: {
      fontSize: 36,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#b3ef77',
    },
    btn: {
      height: 35,
      width: 80,
      backgroundColor: '#b3ef77',
      alignSelf: 'center',
      borderRadius: 3,
    },
    btnText: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 6,
    },
  });