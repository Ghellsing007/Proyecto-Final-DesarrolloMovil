import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

const TimerApp = () => {
    const [time, setTime] = useState<string>(""); // Tiempo ingresado por el usuario (en segundos)
    const [secondsLeft, setSecondsLeft] = useState<number | null>(null); // Segundos restantes
    const [isRunning, setIsRunning] = useState(false); // Estado del temporizador

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (isRunning && secondsLeft !== null) {
            timer = setInterval(() => {
                setSecondsLeft((prev) => {
                    if (prev && prev > 0) {
                        return prev - 1;
                    } else {
                        clearInterval(timer!);
                        setIsRunning(false);
                        Alert.alert("Tiempo finalizado", "El temporizador ha terminado.");
                        return null;
                    }
                });
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isRunning, secondsLeft]);

    const startTimer = () => {
        if (isNaN(Number(time)) || Number(time) <= 0) {
            Alert.alert("Error", "Por favor ingresa un tiempo válido en segundos.");
            return;
        }
        setSecondsLeft(Number(time));
        setIsRunning(true);
    };

    const stopTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setSecondsLeft(null);
        setTime("");
    };

    const formatTime = (seconds: number | null) => {
        if (seconds === null) return "00:00";
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Temporizador</Text>
            <TextInput
                style={styles.input}
                placeholder="Tiempo en segundos"
                keyboardType="numeric"
                value={time}
                onChangeText={setTime}
                editable={!isRunning}
            />
            <Text style={styles.timer}>{formatTime(secondsLeft)}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Iniciar" onPress={startTimer} disabled={isRunning} />
                <Button title="Detener" onPress={stopTimer} disabled={!isRunning} />
                <Button title="Reiniciar" onPress={resetTimer} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        width: "80%",
        marginBottom: 20,
        textAlign: "center",
        backgroundColor: "#fff",
    },
    timer: {
        fontSize: 48,
        fontWeight: "bold",
        marginBottom: 30,
        color: "#333",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
    },
});

export default TimerApp;
