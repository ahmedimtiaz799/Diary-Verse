import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const API_KEY = "96591827064b072ead82048000b238be";

const WeatherComponent = () => {
  const [city, setCity] = useState('Lagos'); // Default city
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: city,
            appid: API_KEY,
            units: 'metric'
          }
        }
      );
      setWeatherData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []); // Fetch weather data on component mount

  const handleSearch = () => {
    fetchWeatherData();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
        placeholder="Enter city name"
      />
      <Button title="Search" onPress={handleSearch} />
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : weatherData ? (
        <View>
          <Image
            style={styles.weatherIcon}
            source={{ uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png` }}
          />
          <Text style={styles.temperature}>{weatherData.main.temp} ℃</Text>
          <Text style={styles.weatherDescription}>{weatherData.weather[0].main}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  weatherDescription: {
    fontSize: 18,
  },
});

export default WeatherComponent;
