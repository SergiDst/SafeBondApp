import React from 'react';
import { StyleSheet, Image,View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon, Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { FormProvider } from './context/ContextLogin'
import LearningPathScreen from './screens/LearningPathScreen'
import LeccionMapaScreen from './screens/LeccionMapaScreen';
import InfanteScreen from './screens/InfanteScreen';
import Articulos from './screens/Articulos'
import Ejercicios from './screens/Ejercicios'
import Login from './screens/Login'
import ForgotPasswordScreen from './components/componentesLogin/ForgotPasswordScreen'
import FormularioInfanteScreen from './screens/FormularioInfanteScreen';
import { ListaArticulos } from './screens/ListaArticulos';

export default function App() {

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const TabNavigator = () => (
    <Tab.Navigator screenOptions={{
      tabBarStyle: styles.menuTab,
      tabBarActiveTintColor: '#000',
      tabBarInactiveTintColor: '#000',
      tabBarLabelStyle: {
        fontSize: 15,
        fontWeight: 'bold',
      },
    }}>
      <Tab.Screen
        name="Articulos"
        component={Articulos}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && { backgroundColor: 'white', padding: 6 },
              ]}
            >
              <Icon source="library" size={24} color={focused ? 'black' : 'gray'} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Camino"
        component={LearningPathScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && { backgroundColor: 'white', padding: 6 },
              ]}
            >
              <Icon source="road-variant" size={24} color={focused ? 'black' : 'gray'} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Infante"
        component={InfanteScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && { backgroundColor: 'white', padding: 6 },
              ]}
            >
              <Icon source="account-child" size={24} color={focused ? 'black' : 'gray'} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Ejercicios"
        component={Ejercicios}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && { backgroundColor: 'white', padding: 6 },
              ]}
            >
              <Icon source="dumbbell" size={24} color={focused ? 'black' : 'gray'} />
            </View>
          ),
        }}
      />

    </Tab.Navigator>
  )

  return (
    <GestureHandlerRootView>
      <FormProvider>
        <ApplicationProvider {...eva} theme={eva.light}>
          <PaperProvider>
            <SafeAreaProvider>
              <NavigationContainer>
                <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Login" component={Login} />
                   <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
                  <Stack.Screen name="TabNavigator" component={TabNavigator}></Stack.Screen>
                  <Stack.Screen name="Lecciones" component={LeccionMapaScreen}></Stack.Screen>
                  <Stack.Screen name="ListaArticulos" component={ListaArticulos}></Stack.Screen>
                  <Stack.Screen name="FormInfante" component={FormularioInfanteScreen}></Stack.Screen>
                </Stack.Navigator>
              </NavigationContainer>
            </SafeAreaProvider>
          </PaperProvider>
        </ApplicationProvider>
      </FormProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  menuTab: {
    borderWidth: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 80,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#FFD439',
  },
  iconTab: {
    width: 24,
    height: 24,
  },
  iconContainer: {
    borderRadius: 50,  // Hace que el fondo del ícono sea circular
    justifyContent: 'center',
    alignItems: 'center',
  },
});
