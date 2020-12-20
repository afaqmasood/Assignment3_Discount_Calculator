import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const History = ({ navigation }) => {
    const [data, setData] = useState([]);
      
        const getData = async () => {
          try {
            const jsonValue = await AsyncStorage.getItem('@History:key');
            setData(jsonValue != null ? JSON.parse(jsonValue) : []);
          } catch (e) {
            console.log('Data not found!');
          }
        };

        const storeData = async () => {
            try {
              const value = JSON.stringify(data);
              await AsyncStorage.setItem('@History:key', value);
            } catch (e) {
              console.log(e);
            }
          };

          const clear = async () => {
            await AsyncStorage.removeItem('@History:key');
            setData([]);
          };
        
          const deleteRow = (e) => {
            setData(data.filter((data) => data.id != e));
          };

          navigation.setOptions({
            title: 'Discount Calculator',
            headerRight: () => (
              <View style={{ paddingRight: 12 }}>
                <Button title='Clear' onPress={() => clear()} />
              </View>
            ),
            headerStyle: {
              backgroundColor: '#20b3fd',
            },
          });

          return (
            <ScrollView>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  padding: 10,
                }}
              >
                <Text style={styles.title}>Original Price</Text>
                <Text style={styles.title}>Discount Percentage</Text>
                <Text style={styles.title}>Price after Discount</Text>
              </View>
              {data.map((item) => (
                <Pressable
                  style={styles.container}
                  onPress={() => {
                    deleteRow(item.id);
                  }}
                >
                  <Text>{item.price}</Text>
                  <Text>{item.discount}</Text>
                  <Text>{item.discountedPrice}</Text>
                </Pressable>
              ))}
            </ScrollView>
          );
        };


        export default History;

        const styles = StyleSheet.create({
          container: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            height: 35,
            padding: 15,
            marginTop: 15,
            backgroundColor: '#c5f89a'
          },
          title: {
            fontWeight: 'bold',
            fontSize: 16
          }
        });
        