import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Calculator = () => {
    const [input, setInput] = useState("0");
    const [result, setResult] = useState("");

    const handlePress = (value: string) => {
        if (input === "0" && !isNaN(Number(value))) {
            setInput(value); // Reemplazar el 0 inicial
        } else {
            setInput(input + value);
        }
    };

    const calculateResult = () => {
        try {
            const evalResult = eval(input); // Evalúa la operación
            setResult(evalResult.toString());
        } catch (error) {
            setResult("Error");
        }
    };

    const clearAll = () => {
        setInput("0");
        setResult("");
    };

    const renderButton = (label: string, onPress: () => void, style: any = {}) => (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Pantalla de entrada y resultado */}
            <View style={styles.screen}>
                <Text style={styles.inputText}>{input}</Text>
                {result !== "" && <Text style={styles.resultText}>= {result}</Text>}
            </View>

            {/* Botones */}
            <View style={styles.row}>
                {renderButton("AC", clearAll, { backgroundColor: "#ff4444" })}
                {renderButton("/", () => handlePress("/"), { backgroundColor: "#f1c40f" })}
            </View>

            {["7 8 9 *", "4 5 6 -", "1 2 3 +"].map((row) => (
                <View key={row} style={styles.row}>
                    {row.split(" ").map((item) =>
                        renderButton(item, () => handlePress(item), {
                            backgroundColor: isNaN(Number(item)) ? "#f1c40f" : "#2ecc71",
                        })
                    )}
                </View>
            ))}

            <View style={styles.row}>
                {renderButton("0", () => handlePress("0"))}
                {renderButton(".", () => handlePress("."))}
                {renderButton("=", calculateResult, { backgroundColor: "#3498db" })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    screen: {
        marginBottom: 20,
        padding: 20,
        backgroundColor: "#ddd",
        borderRadius: 10,
    },
    inputText: {
        fontSize: 36,
        textAlign: "right",
        fontWeight: "bold",
    },
    resultText: {
        fontSize: 24,
        textAlign: "right",
        color: "#888",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    button: {
        flex: 1,
        margin: 5,
        paddingVertical: 20,
        backgroundColor: "#ccc",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
    },
});

export default Calculator;
