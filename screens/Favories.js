import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FilmItem from '../components/FilmItems';

const Favories = ({navigation}) => {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const fetchFavorites = async () => {
      const favoritesJson = await AsyncStorage.getItem('favorites');
      if (favoritesJson) {
        const favoritesList = JSON.parse(favoritesJson);
        setFavorites(favoritesList);
      }
    };
    fetchFavorites();
  }, [favorites]);

  const removeFromFavorites = (filmId) => {
    const newFavorites = favorites.filter(movie => movie.id !== filmId);
    setFavorites(newFavorites);
    // Persist the favorites list using AsyncStorage
    AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
  }
  return (
    <View>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
           <FilmItem navigation={navigation} film={item} />
           <TouchableOpacity onPress={() => removeFromFavorites(item.id)} style={{ backgroundColor: 'red' }} >
        <Text>Remove from favorites</Text>
      </TouchableOpacity>
      </View>
        )
      }
        onEndReachedThreshold={0.5}
        style={styles.film_container}
      />
    </View>
  )
}

export default Favories

const styles = StyleSheet.create({})