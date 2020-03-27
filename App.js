import React, { useState, useCallback, useEffect } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal, 
  Text,
  View,
  TextInput,
  AsyncStorage,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import * as Animatable from 'react-native-animatable';

import TaskList from './src/components/task-list';
import { styles } from './App.style';

const AnimatedButton = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {

  const [task, setTask] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    async function loadTasks() {
      const taskStorage = await AsyncStorage.getItem('@task');
      if (taskStorage) {
        setTask(JSON.parse(taskStorage));
      }
    }
    loadTasks();
  }, []);

  useEffect(() => {
    async function saveTasks() {
      await AsyncStorage.setItem('@task', JSON.stringify(task));
    }
    saveTasks();
  }, [task]);

  function handleAdd() {
    if (!input) {
      return;
    }
    const data = {
      key: input,
      task: input,
    };
    setTask([...task, data]);
    setOpenModal(false);
    setInput('');
  }

  const handleDelete = useCallback((data)=> {
    const find = task.filter(r => r.key !== data.key);
    setTask(find);
  })

  return (
    <SafeAreaView style={styles.container}>
      
      <FlatList
        marginHorizontal={10}
        showsHorizontalScrollIndicator={false}
        data={ task }
        keyExtractor={ (item) => `${item.key}` }
        renderItem={ ({item}) => <TaskList data={item} handleDelete={handleDelete} /> }
      />
      
      <Modal animationType="slide" transparent={false} visible={openModal}>
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={ () => setOpenModal(false) }>
              <Ionicons
                style={{marginLeft: 5, marginRight: 5}}
                name="md-arrow-back"
                size={40}
                color="#000"
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>New Task</Text>
          </View>

          <Animatable.View
            animation="fadeInUp"
            useNativeDriver
            style={styles.modalBody}
          >
            <TextInput
              style={styles.input}
              placeholder="Name"
              multiline={true}
              autoCorrect={false}
              placeholderTextColor="#747474"
              value={input}
              onChangeText={ (text) => setInput(text) }

            />

            <TouchableOpacity
              style={styles.handleAdd}
              onPress={ handleAdd }
            >
              <Text style={styles.handleAddText}>Create</Text>
            </TouchableOpacity>

          </Animatable.View>

        </SafeAreaView>
      </Modal>

      <AnimatedButton
        style={styles.fab}
        useNativeDriver
        animation="bounceInUp"
        duration={1500}
        onPress={ ()=> setOpenModal(true)}
      >
        <Ionicons name="ios-add" size={35} color="#fff" />
      </AnimatedButton>
    </SafeAreaView>
  );
}
