import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    fab: {
      position: 'absolute',
      width: 60,
      height: 60,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      right: 25,
      bottom: 25,
      elevation: 2,
      zIndex: 9,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: {
        width: 1,
        height: 3,
      },
    },
    modal: {
      flex: 1,
    },
    modalHeader: {
      marginLeft: 10,
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    modalTitle: {
      marginLeft: 15,
      fontSize: 20,
    },
    modalBody: {
      marginTop: 15,
    },
    input: {
      fontSize: 15,
      margin: 10,
      marginTop: 30,
      borderWidth: 1,
      borderColor: '#000',
      borderStyle: 'solid',
      padding: 10,
      textAlignVertical: 'top',
      color: '#000',
    },
    handleAdd: {
      backgroundColor: '#000',
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
      height: 40,
    },
    handleAddText: {
      fontSize: 20,
      color: '#fff',
    }
});
  