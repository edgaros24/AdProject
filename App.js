import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore } from 'redux';
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { commonStyles } from './styles';
import { TransitionPresets } from '@react-navigation/stack';

// Redux
const initialState = {
  ads: [],
};

const adReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_AD':
      return { ...state, ads: [...state.ads, action.payload] };

    case 'UPDATE_AD':
      const updatedAds = state.ads.map((ad) =>
        ad.id === action.payload.id ? action.payload : ad
      );
      return { ...state, ads: updatedAds };

    case 'DELETE_AD':
      const filteredAds = state.ads.filter((ad) => ad.id !== action.payload);
      return { ...state, ads: filteredAds };

    default:
      return state;
  }
};

const store = createStore(adReducer);

const addAd = (ad) => ({
  type: 'ADD_AD',
  payload: ad,
});

const updateAd = (ad) => ({
  type: 'UPDATE_AD',
  payload: ad,
});

const deleteAd = (adId) => ({
  type: 'DELETE_AD',
  payload: adId,
});

// Screens

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const ads = useSelector((state) => state.ads);

  const handleUpdateAd = (adId) => {
    navigation.navigate('UpdateAd', { adId });
  };

  const handleDeleteAd = (adId) => {
    dispatch(deleteAd(adId));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={commonStyles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={commonStyles.adContainer}>
          <Text style={commonStyles.bigTitle}>Home Screen</Text>
          {ads.map((ad) => (
            <View key={ad.id} style={commonStyles.adContainer}>
              <Text style={commonStyles.adTitle}>{ad.title}</Text>
              <Text style={commonStyles.adDescription}>{ad.description}</Text>
              {/* Display other ad details */}
              <TouchableOpacity
                onPress={() => handleUpdateAd(ad.id)}
                style={commonStyles.smallButton}
              >
                <Text style={commonStyles.smallButtonText}>Update Ad</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteAd(ad.id)}
                style={commonStyles.smallButton}
              >
                <Text style={commonStyles.smallButtonText}>Delete Ad</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddAd')}
        style={{ ...commonStyles.smallButton, width: '100%' }}
      >
        <Text style={commonStyles.smallButtonText}>Add Ad</Text>
      </TouchableOpacity>
    </View>
  );
};


const AddAdScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const handleAddAd = () => {
    if (!title.trim()) {
      setError('Please fill the title of the ad');
      return;
    }

    const newAd = {
      id: new Date().getTime().toString(),
      title,
      description,
    };

    dispatch(addAd(newAd));
    navigation.navigate('Home');
  };

  return (
    <View style={commonStyles.centeredContainer}>
      <Text style={commonStyles.bigTitle}>Add Ad Screen</Text>
      <View style={commonStyles.verticalSpace}></View>
      <TextInput
        style={commonStyles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => {
          setTitle(text);
          setError(''); // Clear error when typing
        }}
      />
      <View style={commonStyles.verticalSpace}></View>
      <TextInput
        style={commonStyles.input}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      {error ? (
        <Text style={{ color: 'red', marginTop: 5 }}>{error}</Text>
      ) : null}
      <View style={commonStyles.verticalSpace}></View>
      <TouchableOpacity
        onPress={handleAddAd}
        style={commonStyles.smallButton}
      >
        <Text style={commonStyles.smallButtonText}>Add Ad</Text>
      </TouchableOpacity>
      <View style={commonStyles.verticalSpace}></View>
    </View>
  );
};

const UpdateAdScreen = ({ route, navigation }) => {
  const adId = route.params?.adId;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const existingAd = useSelector((state) =>
    state.ads.find((ad) => ad.id === adId)
  );

  useEffect(() => {
    if (existingAd) {
      setTitle(existingAd.title);
      setDescription(existingAd.description);
    }
  }, [existingAd]);

  const dispatch = useDispatch();

  const handleUpdateAd = () => {
    if (!title.trim()) {
      setError('Please fill the title of the ad');
      return;
    }

    if (!existingAd) {
      setError('Ad not found');
      return;
    }

    const updatedAd = {
      id: adId,
      title,
      description,
    };

    dispatch(updateAd(updatedAd));
    navigation.navigate('Home');
  };

  return (
    <View style={commonStyles.centeredContainer}>
      <Text style={commonStyles.bigTitle}>Update Ad Screen</Text>
      <View style={commonStyles.verticalSpace}></View>
      <TextInput
        style={commonStyles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => {
          setTitle(text);
          setError(''); // Clear error when typing
        }}
      />
      <View style={commonStyles.verticalSpace}></View>
      <TextInput
        style={commonStyles.input}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      {error ? (
        <Text style={{ color: 'red', marginTop: 5 }}>{error}</Text>
      ) : null}
      <View style={commonStyles.verticalSpace}></View>
      <TouchableOpacity
        onPress={handleUpdateAd}
        style={commonStyles.smallButton}
      >
        <Text style={commonStyles.smallButtonText}>Update Ad</Text>
      </TouchableOpacity>
      <View style={commonStyles.verticalSpace}></View>
    </View>
  );
};



// App

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
