import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker'
import WeatherDetails from './components/WeatherDetails'
import {colors} from './untils/index'


const WEATHER_API_KEY = '888f37c28d8433b7192d880f9c172107'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {

  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitsSystem] = useState('metric')
  useEffect(() =>{
    load()
  }, [unitsSystem]);
  async function load(){
    setCurrentWeather(null)
    setErrorMessage(null)
    try{
      //LET THE USER ACESS TO THE LOCATION, GET THE CURRENT LOCATION OF USER
      let { status } = await Location.requestPermissionsAsync()

      if(status !== 'granted'){
        setErrorMessage('We need to access your location to run the app')
        return
      }
      const location = await Location.getCurrentPositionAsync()
      const {latitude, longitude} = location.coords

      //get the api
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`
      const res = await fetch(weatherUrl)
      const result = await res.json()
      if(res.ok){
        setCurrentWeather(result)
      }else{
        setErrorMessage(result.message)
      }
    }catch(error){
      setErrorMessage(error.message)
    }
  }
  if(currentWeather){
  return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem}  />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem} />
      </View>
    )
  }else if(errorMessage){
    return(
    <View style={styles.container}>
      <Text>{errorMessage}</Text>
      <StatusBar style="auto" />
    </View>
    )
  }else{
    return(
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'  ,
    backgroundColor: '#F0FFFF',
  },
  main:{
    justifyContent: 'center',
    flex: 1
  },
});
