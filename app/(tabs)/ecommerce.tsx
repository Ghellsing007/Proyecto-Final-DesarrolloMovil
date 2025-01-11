import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    Button,
    TextInput,
    Alert,
} from "react-native";
import {
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../api";

interface Product {
    id: number;
    name: string;
    price: number;
    cant: number;
    img: string;
}

interface NewProduct {
    name: string;
    price: string;
    cant: string;
    img: string;
}

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [newProduct, setNewProduct] = useState<NewProduct>({
        name: "",
        price: "",
        cant: "",
        img: "",
    });

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const response = await fetchProducts();
            setProducts(response);
        } catch (error) {
            console.error("Error loading products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProduct = async () => {
        try {
            const product: Product = {
                id: Date.now(), // Genera un ID temporal para la lista
                name: newProduct.name,
                price: parseFloat(newProduct.price),
                cant: parseInt(newProduct.cant, 10),
                img: newProduct.img,
            };
            await createProduct(product);
            Alert.alert("Success", "Product created successfully");
            setNewProduct({ name: "", price: "", cant: "", img: "" });
            loadProducts();
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    const handleDeleteProduct = async (id: number) => {
        try {
            await deleteProduct(id);
            Alert.alert("Success", "Product deleted successfully");
            loadProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleUpdateProduct = async (
        id: number,
        updatedFields: Partial<Product>
    ) => {
        try {
            const product = products.find((p) => p.id === id);
            if (!product) {
                throw new Error("Product not found");
            }
            const updatedProduct = { ...product, ...updatedFields };
            await updateProduct(id, updatedProduct);
            Alert.alert("Success", "Product updated successfully");
            loadProducts();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    if (loading) return <Text style={styles.loadingText}>Loading...</Text>;

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.productCard}>
                        <Image
                            source={{ uri: item.img }}
                            style={styles.productImage}
                            resizeMode="cover"
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>Price: ${item.price}</Text>
                            <Text style={styles.quantity}>Quantity: {item.cant}</Text>
                        </View>
                        <Button
                            title="Edit"
                            onPress={() =>
                                handleUpdateProduct(item.id, { cant: item.cant + 1 })
                            }
                        />
                        <Button
                            title="Delete"
                            color="red"
                            onPress={() => handleDeleteProduct(item.id)}
                        />
                    </View>
                )}
            />
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={newProduct.name}
                    onChangeText={(text) =>
                        setNewProduct({ ...newProduct, name: text })
                    }
                />
                <TextInput
                    style={styles.input}
                    placeholder="Price"
                    keyboardType="numeric"
                    value={newProduct.price}
                    onChangeText={(text) =>
                        setNewProduct({ ...newProduct, price: text })
                    }
                />
                <TextInput
                    style={styles.input}
                    placeholder="Quantity"
                    keyboardType="numeric"
                    value={newProduct.cant}
                    onChangeText={(text) =>
                        setNewProduct({ ...newProduct, cant: text })
                    }
                />
                <TextInput
                    style={styles.input}
                    placeholder="Image URL"
                    value={newProduct.img}
                    onChangeText={(text) =>
                        setNewProduct({ ...newProduct, img: text })
                    }
                />
                <Button title="Add Product" onPress={handleCreateProduct} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    loadingText: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 20,
    },
    productCard: {
        flexDirection: "row",
        padding: 10,
        marginVertical: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
    },
    price: {
        fontSize: 16,
    },
    quantity: {
        fontSize: 14,
    },
    form: {
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
});

export default ProductList;
