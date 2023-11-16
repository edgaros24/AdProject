import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { TransitionPresets } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import AddAdScreen from './AddAdScreen';
import UpdateAdScreen from './UpdateAdScreen';
import adReducer from './redux/reducer';

// Redux
const store = createStore(adReducer);

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddAd" component={AddAdScreen} />
          <Stack.Screen name="UpdateAd" component={UpdateAdScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
