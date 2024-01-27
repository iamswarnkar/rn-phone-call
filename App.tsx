import React from 'react';
import Home from './pages/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PhoneCall from './pages/PhoneCall';
import DummyData from './pages/DummyData';

const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{}} />
        <Stack.Screen name="PhoneCall" component={PhoneCall} options={{}} />
        <Stack.Screen name="DummyData" component={DummyData} options={{}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
