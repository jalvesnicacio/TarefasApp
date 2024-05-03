import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import Login from './src/components/Login';
import TaskList from './src/components/TaskList';

let tasks = [
  { key: '1', nome: 'Comprar Coca cola' },
  { key: '2', nome: 'Estudar javascript' }
]

export default function App() {
  const [user, setUser] = useState(null)
  const [newTask, setNewTask] = useState('')

  function handleDelete(key) {
    console.log(key)
  }

  function handleEdit(data) {
    console.log('Item clicado: ', data);
  }

  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.containerTask}>
        <TextInput
          style={styles.input}
          placeholder="O que vai fazer hoje?"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
        />
        <TouchableOpacity style={styles.buttonAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>


      <FlatList
        data={tasks}
        style={styles.containerList}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit} />
        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: '#F2f6fC'
  },
  containerTask: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#141414',
    height: 45,
  },
  buttonAdd: {
    backgroundColor: '#141414',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 22,
  },
  containerList: {
    paddingHorizontal: 10
  }
})
