import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import { getImageFromApi } from '../API/TMDBApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FilmDetails = ({ route }) => {
  const { film } = route.params;
  const navigation = useNavigation();
  const movieId = film.id;
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = async (film) => {
    try {
      // Retrieve the current favorites list from AsyncStorage
      const currentFavorites = await AsyncStorage.getItem('favorites');
      const parsedFavorites = currentFavorites ? JSON.parse(currentFavorites) : [];
  
      // Add the new film to the list
      const newFavorites = [...parsedFavorites, film];
  
      // Persist the updated favorites list using AsyncStorage
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
  
      // Update the state with the updated favorites list
      setFavorites(newFavorites);
    } catch (error) {
      console.log('Error adding to favorites:', error);
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: getImageFromApi(film.poster_path) }} style={styles.poster} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{film.title}</Text>
        <Text style={styles.tagline}>{film.tagline}</Text>
        <Button title ='Add to Favories' onPress={() => addToFavorites(film)}/>
        <Button title='Trailer' onPress={() => navigation.navigate('MovieTrailer', { movieId: movieId })} color="#D32F2F" titleStyle={{ color: "#F3F373" }} />
        <View style={styles.genreContainer}>
        </View>
        <Text style={styles.overviewTitle}>Overview</Text>
        <Text style={styles.overview}>{film.overview}</Text>
        <Text style={styles.info}>
          <Text style={styles.infoLabel}>Release date:</Text> {film.release_date}
        </Text>
        <Text style={styles.info}>
          <Text style={styles.infoLabel}>Runtime:</Text> {film.runtime} min
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 20,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  overviewTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  overview: {
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 10,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
});

export default FilmDetails;
