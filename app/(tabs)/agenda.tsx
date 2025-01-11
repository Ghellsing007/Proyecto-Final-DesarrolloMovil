import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native';

// Define el tipo de los contactos
interface Contact {
    id: string;
    name: string;
    number: string;
}

const App = () => {
    const [contacts, setContacts] = useState<Contact[]>([]); // Define el tipo del estado como un arreglo de Contact
    const [newContact, setNewContact] = useState<Contact>({
        id: '',
        name: '',
        number: '',
    });

    const handleAddContact = () => {
        if (newContact.name && newContact.number) {
            const newId = Math.random().toString(); // Genera un id único para cada contacto
            setContacts([
                ...contacts,
                { id: newId, name: newContact.name, number: newContact.number }, // Asigna el id generado
            ]);
            setNewContact({ id: '', name: '', number: '' });
            Alert.alert('Success', 'Contact added!');
        } else {
            Alert.alert('Error', 'Please provide both name and number');
        }
    };

    const handleDeleteContact = (id: string) => {
        setContacts(contacts.filter((contact) => contact.id !== id));
        Alert.alert('Success', 'Contact deleted');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Agenda de Contactos</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={newContact.name}
                    onChangeText={(text) => setNewContact({ ...newContact, name: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    keyboardType="numeric"
                    value={newContact.number}
                    onChangeText={(text) => setNewContact({ ...newContact, number: text })}
                />
                <Button title="Add Contact" onPress={handleAddContact} />
            </View>

            <FlatList
                data={contacts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.contactCard}>
                        <Text style={styles.contactName}>{item.name}</Text>
                        <Text style={styles.contactNumber}>{item.number}</Text>
                        <TouchableOpacity onPress={() => handleDeleteContact(item.id)}>
                            <Text style={styles.deleteButton}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    form: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    contactCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginBottom: 10,
    },
    contactName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contactNumber: {
        fontSize: 16,
    },
    deleteButton: {
        fontSize: 14,
        color: 'red',
    },
});

export default App;
