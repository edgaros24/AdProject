import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
    bigTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    adTitle: {
      fontSize: 18,  
      fontWeight: 'bold',
      marginBottom: 5,
    },
    smallButton: {
      fontSize: 12,  
      backgroundColor: 'black',
      marginBottom: 10,
      width: 160,
      alignItems: 'center'
    },
    smallButtonText: {
        fontSize: 32,
        color: 'white',  
        alignItems: 'center'
      },
      adDescription: {
        fontSize: 16,
        marginBottom: 20,
    
    },
    centeredContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      verticalSpace: {
        marginVertical: 5,
      },
      input: {
        fontSize: 32, 
        height: 80,   
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
      },
  });