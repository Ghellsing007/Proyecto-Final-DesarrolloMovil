import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Importa el Picker

const CurrencyConverter = () => {
    const [amount, setAmount] = useState("");
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [result, setResult] = useState<string | null>(null);
    const [currencies, setCurrencies] = useState<string[]>([]);

    useEffect(() => {
        fetchCurrencies();
    }, []);

    const fetchCurrencies = async () => {
        try {
            const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
            const data = await response.json();
            setCurrencies(Object.keys(data.rates));
        } catch (error) {
            console.error("Error fetching currencies:", error);
        }
    };

    const convertCurrency = async () => {
        if (!amount || isNaN(Number(amount))) {
            Alert.alert("Invalid Input", "Please enter a valid amount.");
            return;
        }

        try {
            const response = await fetch(
                `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
            );
            const data = await response.json();
            const rate = data.rates[toCurrency];
            const converted = (parseFloat(amount) * rate).toFixed(2);
            setResult(`${amount} ${fromCurrency} = ${converted} ${toCurrency}`);
        } catch (error) {
            console.error("Error converting currency:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Convertidor de Monedas</Text>
            <TextInput
                style={styles.input}
                placeholder="ingrese la Cantidad"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            <View style={styles.pickerContainer}>
                <Text style={styles.label}>De:</Text>
                <Picker
                    selectedValue={fromCurrency}
                    style={styles.picker}
                    onValueChange={(value) => setFromCurrency(value)}
                >
                    {currencies.map((currency) => (
                        <Picker.Item key={currency} label={currency} value={currency} />
                    ))}
                </Picker>
            </View>
            <View style={styles.pickerContainer}>
                <Text style={styles.label}>A:</Text>
                <Picker
                    selectedValue={toCurrency}
                    style={styles.picker}
                    onValueChange={(value) => setToCurrency(value)}
                >
                    {currencies.map((currency) => (
                        <Picker.Item key={currency} label={currency} value={currency} />
                    ))}
                </Picker>
            </View>
            <Button title="Convertir" onPress={convertCurrency} />
            {result && <Text style={styles.result}>{result}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    pickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginRight: 10,
    },
    picker: {
        flex: 1,
        height: 50,
    },
    result: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
    },
});

export default CurrencyConverter;
