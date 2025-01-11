import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios';

const API_KEY = '8fc9cb089e6945837d9f18786369198a'; // Sustituir con tu clave API
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const cities = [
    { name: 'Ciudad de México', code: 'Mexico City' },
    { name: 'Nueva York', code: 'New York' },
    { name: 'Londres', code: 'London' },
    { name: 'Tokio', code: 'Tokyo' },
    { name: 'Sídney', code: 'Sydney' },
    { name: 'Buenos Aires', code: 'Buenos Aires' },
];

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<any>({});
    const [forecast, setForecast] = useState<any[]>([]);

    useEffect(() => {
        // Mostrar clima de una ciudad predeterminada al cargar
        getWeather('Ciudad de México');
    }, []);

    const getWeather = (city: string) => {
        axios
            .get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=es`)
            .then((response) => {
                const data = response.data;
                setWeather({
                    city: data.name,
                    temp: data.main.temp,
                    description: data.weather[0].description,
                    icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
                });
            })
            .catch((error) => {
                console.error('Error fetching weather data: ', error);
            });
    };

    const handleCityChange = (text: string) => {
        setCity(text);
    };

    const handleSearch = () => {
        getWeather(city);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Clima Actual</Text>

            <TextInput
                style={styles.input}
                placeholder="Ingresa una ciudad"
                value={city}
                onChangeText={handleCityChange}
            />
            <Button title="Buscar" onPress={handleSearch} />

            {weather.city && (
                <View style={styles.weatherContainer}>
                    <Text style={styles.city}>{weather.city}</Text>
                    <Text style={styles.temp}>{weather.temp}°C</Text>
                    <Text style={styles.description}>{weather.description}</Text>
                    <img src={weather.icon} alt="weather icon" style={styles.icon} />
                </View>
            )}

            <FlatList
                data={cities}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                    <View style={styles.cityCard}>
                        <Text style={styles.cityName}>{item.name}</Text>
                        <Button title="Ver Clima" onPress={() => getWeather(item.name)} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#fff',
        borderWidth: 1,
        marginBottom: 10,
        color: '#fff',
        paddingLeft: 10,
        borderRadius: 5,
    },
    weatherContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    city: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    temp: {
        fontSize: 24,
        color: '#fff',
    },
    description: {
        fontSize: 18,
        color: '#ccc',
    },
    icon: {
        width: 50,
        height: 50,
    },
    cityCard: {
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cityName: {
        color: '#fff',
        fontSize: 18,
    },
});

export default WeatherApp;
