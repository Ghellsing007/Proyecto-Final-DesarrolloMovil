import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image'; 

const PlaceholderImage = require('@/assets/images/background-image.png');
const PlaceholderImage2 = require('@/assets/images/e_commerce_Marketing_Report.jpg');
const PlaceholderImage3 = require('@/assets/images/271564-800-auto.webp');
const PlaceholderImage4 = require('@/assets/images/currency-converter-icon-free-vector.jpg');
const PlaceholderImage5 = require('@/assets/images/189778-800-auto.webp');

// Definir explícitamente las rutas como un tipo que coincida con las rutas predefinidas. 
type App = {
  title: string;
  image: any;
  route: "/ecommerce" | "/calculador" | "/coverter" | "/clima" | "/generador" |"/tempori" | "/other" | "/frasem" | "/imc" | "/agenda" | "/encuesta" | "/pregunta" | "/reloj" | "/about";
};

const apps: App[] = [
  { title: 'Ecommerce', image: PlaceholderImage2, route: '/ecommerce' },
  { title: 'Calculadora', image: PlaceholderImage3, route: '/calculador' },
  { title: 'Convertidor de Moneda', image: PlaceholderImage4, route: '/coverter' },
  { title: 'Temporizador', image: PlaceholderImage5, route: '/tempori' },
  { title: 'App de Sticker', image: PlaceholderImage, route: '/other' },
  { title: 'Frases Motivadoras', image: PlaceholderImage, route: '/frasem' },
  { title: 'Agenda', image: PlaceholderImage, route: '/agenda' },
  { title: 'Pregunta', image: PlaceholderImage, route: '/pregunta' },
  { title: 'Encuestas', image: PlaceholderImage, route: '/encuesta' },
  { title: 'Reloj Mundial', image: PlaceholderImage, route: '/reloj' },
  { title: 'Generador de Password', image: PlaceholderImage, route: '/generador' },
  { title: 'Calculadora de Masa Corporal', image: PlaceholderImage, route: '/imc' },
  { title: 'Clima Actual', image: PlaceholderImage, route: '/clima' },
  { title: 'About', image: PlaceholderImage, route: '/about' },
];

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>PROYECTO FINAL UAPA</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cardsContainer}>
          {apps.map((app, index) => (
            <Link key={index} href={app.route} style={styles.card}>
              <Image source={app.image} style={styles.image} />
              <Text style={styles.cardTitle}>{app.title}</Text>
            </Link>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    marginVertical: 20,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#333',
    margin: 10,
    borderRadius: 10,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
