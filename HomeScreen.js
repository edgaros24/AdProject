import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { commonStyles } from './styles';
import { deleteAd } from './redux/actions';

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

export default HomeScreen;
