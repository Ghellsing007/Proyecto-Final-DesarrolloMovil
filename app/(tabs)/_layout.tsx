import { Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';


export default function TabLayout() {
  return (
    <Tabs
  screenOptions={{
    tabBarActiveTintColor: '#ffd33d',
    headerStyle: {
      backgroundColor: '#25292e',
    },
    headerShadowVisible: false,
    headerTintColor: '#fff',
    tabBarStyle: {
    backgroundColor: '#25292e',
    },
  }}
>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />

  <Tabs.Screen
        name="ecommerce"
        options={{
          title: 'Ecommerce',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
          ),
        }}
      />

<Tabs.Screen
        name="calculador"
        options={{
          title: 'Calculadora',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'calculator' : 'calculator'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="coverter"
        options={{
          title: 'Convertidor de Moneda',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'calculator' : 'calculator'} color={color} size={24} />
          ),
        }}
      />

<Tabs.Screen
        name="tempori"
        options={{
          title: 'Temporizador',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="other"
        options={{
          title: 'App de Sticker',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
          ),
        }}
      />

<Tabs.Screen
        name="frasem"
        options={{
          title: 'Frases Motivadoras',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
          ),
        }}
      />

<Tabs.Screen
        name="agenda"
        options={{
          title: 'Agenda',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="pregunta"
        options={{
          title: 'Preguntas',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="encuesta"
        options={{
          title: 'Encuestas',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
          ),
        }}
      />

<Tabs.Screen
        name="reloj"
        options={{
          title: 'Reloj  Mundial',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
          ),
        }}
      />

<Tabs.Screen
        name="generador"
        options={{
          title: 'Generador de Password',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
          ),
        }}
      />

<Tabs.Screen
        name="imc"
        options={{
          title: 'Calculadora de Masa Corpotal',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="clima"
        options={{
          title: 'Clima Actual',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
          ),
        }}
      />
    </Tabs>

    
  );
}
