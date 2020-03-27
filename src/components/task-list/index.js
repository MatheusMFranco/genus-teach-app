import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import * as Animatable from 'react-native-animatable';

export default function TaskList({ data, handleDelete }) {
    return(
        <Animatable.View
            style={styles.container}
            animation="bounceIn"
            useNativeDriver
        >
            <TouchableOpacity onPress={ ()=> handleDelete(data) }>
                <Ionicons 
                    name="md-checkmark-circle"
                    size={30}
                    color="#121212"
                />
            </TouchableOpacity>
            <View>
                <Text style={styles.text}> { data.task } </Text>
            </View>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#000',
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 10,
    },
    text: {
        fontSize: 20,
        paddingLeft: 8,
        paddingRight: 20,
    },
});