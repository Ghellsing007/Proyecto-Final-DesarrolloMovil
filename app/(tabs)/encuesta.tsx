import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";

// Definir las opciones de la encuesta
interface SurveyQuestion {
    id: number;
    question: string;
    options: string[];
    selectedAnswer: string | null;
}

const App = () => {
    const [questions, setQuestions] = useState<SurveyQuestion[]>([
        {
            id: 1,
            question: "¿Cuál es tu color favorito?",
            options: ["Rojo", "Azul", "Verde", "Amarillo"],
            selectedAnswer: null
        },
        {
            id: 2,
            question: "¿Cuál es tu fruta favorita?",
            options: ["Manzana", "Plátano", "Fresa", "Uva"],
            selectedAnswer: null
        }
    ]);
    const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);

    // Función para seleccionar una respuesta
    const handleSelectAnswer = (questionId: number, answer: string) => {
        const updatedQuestions = questions.map(question => {
            if (question.id === questionId) {
                return { ...question, selectedAnswer: answer };
            }
            return question;
        });
        setQuestions(updatedQuestions);
    };

    // Función para calcular los resultados
    const calculateResults = () => {
        const results = questions.map(question => {
            const totalAnswers = question.options.reduce((acc, option) => {
                acc[option] = 0;
                return acc;
            }, {} as Record<string, number>);

            questions.forEach(q => {
                if (q.selectedAnswer) {
                    totalAnswers[q.selectedAnswer] += 1;
                }
            });

            return {
                question: question.question,
                answers: totalAnswers
            };
        });
        return results;
    };

    // Función para ir a la pantalla de resultados
    const goToResults = () => {
        setIsSurveyCompleted(true);
    };

    // Función para reiniciar la encuesta
    const resetSurvey = () => {
        setIsSurveyCompleted(false);
        setQuestions(
            questions.map(question => ({
                ...question,
                selectedAnswer: null
            }))
        );
    };

    return (
        <View style={styles.container}>
            {!isSurveyCompleted
                ? <View>
                    <Text style={styles.header}>Encuesta</Text>
                    {questions.map(question =>
                        <View key={question.id} style={styles.questionContainer}>
                            <Text style={styles.question}>
                                {question.question}
                            </Text>
                            {question.options.map((option, index) =>
                                <TouchableOpacity
                                    key={index}
                                    style={styles.optionButton}
                                    onPress={() => handleSelectAnswer(question.id, option)}
                                >
                                    <Text style={styles.optionText}>
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                    <Button title="Ver Resultados" onPress={goToResults} />
                </View>
                : <View>
                    <Text style={styles.header}>Resultados</Text>
                    {calculateResults().map((result, index) =>
                        <View key={index} style={styles.resultContainer}>
                            <Text style={styles.resultQuestion}>
                                {result.question}
                            </Text>
                            {Object.entries(result.answers).map(([option, count], idx) =>
                                <Text key={idx} style={styles.resultText}>
                                    {option}: {count} voto(s)
                                </Text>
                            )}
                        </View>
                    )}
                    <Button title="Reiniciar Encuesta" onPress={resetSurvey} />
                </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20
    },
    questionContainer: {
        marginBottom: 20
    },
    question: {
        fontSize: 18,
        fontWeight: "bold"
    },
    optionButton: {
        padding: 10,
        backgroundColor: "#ddd",
        borderRadius: 8,
        marginVertical: 5
    },
    optionText: {
        fontSize: 16,
        textAlign: "center"
    },
    resultContainer: {
        marginBottom: 20
    },
    resultQuestion: {
        fontSize: 18,
        fontWeight: "bold"
    },
    resultText: {
        fontSize: 16
    }
});

export default App;
