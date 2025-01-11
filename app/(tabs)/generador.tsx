import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';

// Función para generar contraseñas
const generatePassword = (length: number, useUpperCase: boolean, useNumbers: boolean, useSymbols: boolean) => {
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let characters = lowerCaseChars;

    if (useUpperCase) characters += upperCaseChars;
    if (useNumbers) characters += numbers;
    if (useSymbols) characters += symbols;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    return password;
};

const PasswordGenerator = () => {
    const [length, setLength] = useState(12);
    const [useUpperCase, setUseUpperCase] = useState(false);
    const [useNumbers, setUseNumbers] = useState(false);
    const [useSymbols, setUseSymbols] = useState(false);
    const [password, setPassword] = useState('');

    const handleGeneratePassword = () => {
        const newPassword = generatePassword(length, useUpperCase, useNumbers, useSymbols);
        setPassword(newPassword);
    };

    const handleCopyPassword = () => {
        Alert.alert("Contraseña Copiada", password);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Generador de Contraseñas</Text>

            <Text style={styles.label}>Longitud de la Contraseña:</Text>
            <TextInput
                style={styles.input}
                value={String(length)}
                keyboardType="numeric"
                onChangeText={(text) => setLength(Number(text))}
            />

            <Text style={styles.label}>Incluir Mayúsculas:</Text>
            <Button
                title={useUpperCase ? "Sí" : "No"}
                onPress={() => setUseUpperCase(!useUpperCase)}
            />

            <Text style={styles.label}>Incluir Números:</Text>
            <Button
                title={useNumbers ? "Sí" : "No"}
                onPress={() => setUseNumbers(!useNumbers)}
            />

            <Text style={styles.label}>Incluir Símbolos:</Text>
            <Button
                title={useSymbols ? "Sí" : "No"}
                onPress={() => setUseSymbols(!useSymbols)}
            />

            <Button title="Generar Contraseña" onPress={handleGeneratePassword} />

            {password && (
                <View style={styles.passwordContainer}>
                    <Text style={styles.password}>{password}</Text>
                    <Button title="Copiar Contraseña" onPress={handleCopyPassword} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginVertical: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    passwordContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    password: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default PasswordGenerator;
