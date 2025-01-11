import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// Lista de frases inspiradoras
const quotes = [
    "La mejor manera de predecir el futuro es crearlo.",
    "Cree que puedes y ya estás a mitad de camino.",
    "Actúa como si lo que haces tiene importancia. Lo tiene.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito.",
    "Eres más fuerte de lo que piensas.",
    "Sueña en grande y atrévete a fallar.",
    "Sigue adelante. Todo lo que necesitas llegará a ti en el momento perfecto.",
    "No mires el reloj; haz lo que él hace. Sigue adelante.",
    "Solo fallas cuando dejas de intentarlo.",
    "Tu limitación, solo es tu imaginación.",
    "El éxito suele llegar a quienes están demasiado ocupados buscando lo que hacen.",
    "La única manera de hacer un gran trabajo es amar lo que haces.",
    "El futuro pertenece a quienes creen en la belleza de sus sueños.",
    "No esperes la oportunidad. Créala.",
    "Cuanto más trabajas por algo, más grande será la satisfacción cuando lo logres.",
    "No te detengas cuando estés cansado. Detente cuando hayas terminado.",
    "Cree en ti mismo y en todo lo que eres. Sabe que dentro de ti hay algo más grande que cualquier obstáculo.",
    "Siempre parece imposible hasta que se hace.",
    "El único límite para nuestra realización del mañana son nuestras dudas de hoy.",
    "Tu vida no mejora por casualidad, mejora por cambio."
];

const InspirationalQuotesApp = () => {
    const [currentQuote, setCurrentQuote] = useState("Toca el Boton para Inpirar!");

    // Función para generar una frase al azar
    const generateQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setCurrentQuote(quotes[randomIndex]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Frases Motivadoras</Text>
            <View style={styles.quoteContainer}>
                <Text style={styles.quoteText}>{currentQuote}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={generateQuote}>
                <Text style={styles.buttonText}>Nueva Frase</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    quoteContainer: {
        marginVertical: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#fff",
        elevation: 5, // Sombra para Android
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    quoteText: {
        fontSize: 18,
        fontStyle: "italic",
        textAlign: "center",
        color: "#555",
    },
    button: {
        backgroundColor: "#4caf50",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        elevation: 3,
    },
    buttonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
});

export default InspirationalQuotesApp;
