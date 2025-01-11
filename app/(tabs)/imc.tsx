import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// Definir tipos para los estados
type BMIData = {
    weight: string;
    height: string;
    bmi: string | null;
    interpretation: string;
};

// Función para calcular el IMC
const calculateBMI = (weight: number, height: number): string | null => {
    if (height <= 0 || weight <= 0) return null;  // Evitar divisiones por cero o valores negativos
    const bmi = weight / (height * height);
    return bmi.toFixed(2); // Redondear el IMC a dos decimales
};

// Función para obtener la interpretación del IMC
const getBMIInterpretation = (bmi: number): string => {
    if (bmi < 18.5) return 'Bajo peso';
    if (bmi >= 18.5 && bmi < 24.9) return 'Normal';
    if (bmi >= 25 && bmi < 29.9) return 'Sobrepeso';
    return 'Promedio';
};

const BMICalculator: React.FC = () => {
    const [weight, setWeight] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [bmi, setBmi] = useState<string | null>(null);
    const [interpretation, setInterpretation] = useState<string>('');

    const handleCalculate = () => {
        const weightValue = parseFloat(weight);
        const heightValue = parseFloat(height);

        if (!weightValue || !heightValue) {
            setBmi(null);
            setInterpretation('Por favor, ingrese valores válidos');
            return;
        }

        const bmiValue = calculateBMI(weightValue, heightValue);
        if (bmiValue) {
            setBmi(bmiValue);
            setInterpretation(getBMIInterpretation(parseFloat(bmiValue)));
        } else {
            setBmi(null);
            setInterpretation('Por favor, ingrese valores válidos');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Calculadora de IMC</Text>

            <Text style={styles.label}>Peso (kg):</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
            />

            <Text style={styles.label}>Altura (m):</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={height}
                onChangeText={setHeight}
            />

            <Button title="Calcular IMC" onPress={handleCalculate} />

            {bmi !== null && (
                <View style={styles.resultContainer}>
                    <Text style={styles.result}>IMC: {bmi}</Text>

                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginVertical: 5,
    },
    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    resultContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    result: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    interpretation: {
        fontSize: 16,
        color: '#888',
    },
});

export default BMICalculator;
