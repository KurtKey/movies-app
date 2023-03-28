import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { Video } from 'expo-av';

const MovieTrailer = ({ route }) => {
  const { movieId } = route.params;

  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    const fetchTrailer = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=a3419bf0b7ca2a33db3077cd5ff95f5f&language=en-US`);
      const data = await response.json();
      if (data.results.length > 0 && data.results[0].site === 'YouTube') {
        setTrailerUrl(`https://www.youtube.com/watch?v=${data.results[0].key}`);
      }else{
        setTrailerUrl('https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1');
      }
    };
    fetchTrailer();
  }, []);

  return (
    <View style={styles.container}>
      {trailerUrl ? (
        <Video style={styles.video}
          source={{ uri: trailerUrl }}
          useNativeControls
          resizeMode="contain"
          isLooping
          paused={false}
          controls={true}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  video: {
    width: '100%',
    height: '100%',
    backgroundColor : "#000"
  },
});

export default MovieTrailer;
