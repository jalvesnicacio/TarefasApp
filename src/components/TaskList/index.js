import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Feather from '@expo/vector-icons/Feather'

export default function TaskList({ data, deleteItem, editItem }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.taskTrash} onPress={() => deleteItem(data.key)}>
        <Feather name='trash' color={'#fff'} size={20} />
      </TouchableOpacity>
      <View style={{ paddingRight: 10 }}>
        <TouchableWithoutFeedback onPress={() => editItem(data)}>
          <Text style={styles.taskText}>{data.nome}</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#121212',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 4,

  },
  taskText: {
    color: '#fff',
    paddingRight: 10,
  },
  taskTrash: {
    marginRight: 10,
  }
})