import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { commonStyles } from './styles';
import { addAd } from './redux/actions';

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
          setError('');
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

export default AddAdScreen;
