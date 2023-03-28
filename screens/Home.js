import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Search from '../components/Search'

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Search navigation={navigation}/>
    </View>
  )
}
export default Home

const styles = StyleSheet.create({
    container : {
        flex : 1
    }


})