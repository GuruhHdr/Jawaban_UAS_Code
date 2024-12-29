//jAWABAN NO 2 
import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ToDoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), name: task }]);
      setTask('');
    }
  };

  return (
    <View style={styles.container}>
      {/* Input Form */}
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity style={styles.button} onPress={addTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>

      {/* Display Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  button: { backgroundColor: 'blue', padding: 10 },
  buttonText: { color: 'white', textAlign: 'center' },
  taskItem: { padding: 10, borderBottomWidth: 1 },
});

export default ToDoApp;


// jAWABAN NO 3
// store.js
import { createStore } from 'redux';

const initialState = { tasks: [] };

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.payload) };
    default:
      return state;
  }
};

const store = createStore(taskReducer);
export default store;

// jAWABAN NO 4
const deleteTask = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/tasks/${id}`);
    setTasks(tasks.filter((task) => task.id !== id));
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};


// jAWABAN NO 5
// Data persistence 
const addTask = async (task) => {
  try {
    const response = await axios.post('http://localhost:3000/tasks', task);
    setTasks([...tasks, response.data]);
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

// Komunikasi dengan backend
 const fetchTasks = async () => {
  const response = await axios.get('http://localhost:3000/tasks');
  setTasks(response.data);
};