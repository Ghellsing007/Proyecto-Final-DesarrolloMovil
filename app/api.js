import axios from "axios";

const apiUrl = "http://192.168.16.78:8080/products"; // URL de tu API

// Función para obtener productos desde la API usando Axios
export async function fetchProducts() {
    try {
        const response = await axios.get(apiUrl); // Realiza la solicitud GET
        const products = response.data; // Datos de la respuesta
        
        // Aquí puedes asegurarte de que los datos tengan la estructura correcta
        return products.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            cant: product.cant,
            img: product.img,
        }));
    } catch (error) {
        console.error("Error al cargar los productos:", error.message);
        throw error; // Reenvía el error para manejarlo donde se llame esta función
    }
}
