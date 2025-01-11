import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const timeZones = [
    { city: 'Nueva York', timeZone: 'America/New_York' },
    { city: 'Los Ángeles', timeZone: 'America/Los_Angeles' },
    { city: 'Chicago', timeZone: 'America/Chicago' },
    { city: 'Ciudad de México', timeZone: 'America/Mexico_City' },
    { city: 'Buenos Aires', timeZone: 'America/Argentina/Buenos_Aires' },
    { city: 'Sao Paulo', timeZone: 'America/Sao_Paulo' },
    { city: 'Londres', timeZone: 'Europe/London' },
    { city: 'París', timeZone: 'Europe/Paris' },
    { city: 'Madrid', timeZone: 'Europe/Madrid' },
    { city: 'Berlín', timeZone: 'Europe/Berlin' },
    { city: 'Moscú', timeZone: 'Europe/Moscow' },
    { city: 'Tokio', timeZone: 'Asia/Tokyo' },
    { city: 'Seúl', timeZone: 'Asia/Seoul' },
    { city: 'Pekín', timeZone: 'Asia/Shanghai' },
    { city: 'Sídney', timeZone: 'Australia/Sydney' },
    { city: 'Melbourne', timeZone: 'Australia/Melbourne' },
    { city: 'Delhi', timeZone: 'Asia/Kolkata' },
    { city: 'Bangkok', timeZone: 'Asia/Bangkok' },
    { city: 'Singapur', timeZone: 'Asia/Singapore' },
    { city: 'Dubai', timeZone: 'Asia/Dubai' },
    { city: 'Johannesburgo', timeZone: 'Africa/Johannesburg' },
    { city: 'El Cairo', timeZone: 'Africa/Cairo' },
    { city: 'Nairobi', timeZone: 'Africa/Nairobi' },
    { city: 'Honolulu', timeZone: 'Pacific/Honolulu' },
    { city: 'Anchorage', timeZone: 'America/Anchorage' },
    { city: 'Reikiavik', timeZone: 'Atlantic/Reykjavik' },
];

const WorldClock = () => {
    const [currentTime, setCurrentTime] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const updateTime = () => {
            const timeData: { [key: string]: string } = {};
            timeZones.forEach(({ city, timeZone }) => {
                const formatter = new Intl.DateTimeFormat('en-US', {
                    timeZone,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true,
                });

                timeData[city] = formatter.format(new Date());
            });
            setCurrentTime(timeData);
        };

        // Actualizar cada segundo
        const interval = setInterval(updateTime, 1000);

        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Reloj Mundial</Text>
            <FlatList
                data={timeZones}
                keyExtractor={(item) => item.city}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.city}>{item.city}</Text>
                        <Text style={styles.time}>{currentTime[item.city] || 'Cargando...'}</Text>
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
    card: {
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    city: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    time: {
        fontSize: 16,
        color: '#ccc',
        marginTop: 5,
    },
});

export default WorldClock;
