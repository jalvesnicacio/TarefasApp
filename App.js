import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import Login from './src/components/Login';
import TaskList from './src/components/TaskList';
import { database } from './src/services/firebaseConnection';
import { ref, child, set, push, get, remove, update } from 'firebase/database';
import Feather from '@expo/vector-icons/Feather'


export default function App() {
  const [user, setUser] = useState(null)
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [key, setKey] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    function getUser() {
      if (!user) {
        return
      }

      const tarefasRef = ref(database, 'tarefas');
      const userTarefasRef = child(tarefasRef, user);
      const listaTarefas = get(userTarefasRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            // console.log('Dados encontrados:', snapshot.val())
            setTasks([]);
            snapshot.forEach((childItem) => {
              let data = {
                key: childItem.key,
                nome: childItem.val().nome
              }
              setTasks(oldTasks => [...oldTasks, data]);
            })
          } else {
            console.log('Nenhum dado encontrado')
          }
        })
        .catch((error) => {
          console.error('Erro ao ler os dados:', error)
        });
    }
    getUser();
  }, [user])


  function handleAdd() {
    if (newTask === '') {
      return;
    }

    // Referência para o nó "tarefas"
    const tarefasRef = ref(database, 'tarefas');

    // Referência para o nó do usuário atual dentro de "tarefas"
    const userTarefasRef = child(tarefasRef, user);

    // Usuario quer editar tarefa
    if (key !== '') {
      const editTarefa = child(userTarefasRef, key)
      update(editTarefa, {
        nome: newTask
      })
        .then(() => {
          const taskIndex = tasks.findIndex(item => item.key === key)
          const taskClone = tasks
          taskClone[taskIndex].nome = newTask
          setTasks([...taskClone])
        })
        .catch((error) => {
          console.error('Erro ao editar tarefa:', error);
        });

      Keyboard.dismiss()
      setKey('')
      setNewTask('')

    }
    // Usuario quer criar nova tarefa:
    else {
      const novaTarefaRef = push(userTarefasRef);
      let chave = novaTarefaRef.key;

      set(child(userTarefasRef, chave), {
        nome: newTask
      })
        .then(() => {
          const data = {
            key: chave,
            nome: newTask
          }
          setTasks(oldTasks => [...oldTasks, data])
        })
        .catch((error) => {
          console.error('Erro ao adicionar tarefa:', error);
        });
      Keyboard.dismiss();
      setNewTask('');
    }
  }

  function handleDelete(key) {
    const tarefasRef = ref(database, 'tarefas');
    const userTarefasRef = child(tarefasRef, user);
    const deleteTarefa = child(userTarefasRef, key);
    remove(deleteTarefa)
      .then(() => {
        const findTasks = tasks.filter(item => item.key !== key)
        setTasks(findTasks)
      })
      .catch((error) => {
        console.error('Erro ao deletar tarefa:', error);
      });
  }

  function handleEdit(data) {
    setKey(data.key)
    setNewTask(data.nome)
    inputRef.current.focus()
  }

  function cancelEdit() {
    setKey('')
    setNewTask('')
    Keyboard.dismiss()
  }

  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />
  }

  return (
    <SafeAreaView style={styles.container}>
      {key.length > 0 && (
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <TouchableOpacity onPress={cancelEdit}>
            <Feather name="x-circle" size={20} color="#ff0000" />
          </TouchableOpacity>
          <Text style={{ marginLeft: 5, color: "#ff0000" }}>
            Você está editando uma tarefa!
          </Text>
        </View>
      )}

      <View style={styles.containerTask}>
        <TextInput
          style={styles.input}
          placeholder="O que vai fazer hoje?"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
          ref={inputRef}
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
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

    </SafeAreaView >
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
