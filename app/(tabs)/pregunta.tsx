import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

// Definir la interfaz de pregunta
interface Question {
    question: string;
    options: string[];
    answer: string;
}

const QuizApp = () => {
    // Lista de preguntas de opción múltiple
    const questions: Question[] = [
        {
            question: "¿Cuál es la capital de Francia?",
            options: ["Londres", "París", "Madrid", "Roma"],
            answer: "París",
        },
        {
            question: "¿Quién pintó la Mona Lisa?",
            options: ["Picasso", "Van Gogh", "Da Vinci", "Rembrandt"],
            answer: "Da Vinci",
        },
        {
            question: "¿Cuál es el océano más grande?",
            options: ["Atlántico", "Indico", "Ártico", "Pacífico"],
            answer: "Pacífico",
        },
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

    // Función para manejar las respuestas
    const handleAnswer = (selectedOption: string) => {
        if (selectedOption === questions[currentQuestionIndex].answer) {
            setScore(score + 1);
        }

        // Pasar a la siguiente pregunta o terminar el cuestionario
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizCompleted(true);
        }
    };

    return (
        <View style={styles.container}>
            {quizCompleted ? (
                <View style={styles.finalScreen}>
                    <Text style={styles.finalText}>
                        ¡Has completado el cuestionario!
                    </Text>
                    <Text style={styles.finalText}>Puntaje final: {score} / 3</Text>
                </View>
            ) : (
                <View style={styles.quizScreen}>
                    <Text style={styles.questionText}>
                        {questions[currentQuestionIndex].question}
                    </Text>
                    {questions[currentQuestionIndex].options.map((option, index) => (
                        <Button
                            key={index}
                            title={option}
                            onPress={() => handleAnswer(option)}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    quizScreen: {
        alignItems: "center",
    },
    questionText: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    finalScreen: {
        alignItems: "center",
    },
    finalText: {
        fontSize: 24,
        fontWeight: "bold",
    },
});

export default QuizApp;
