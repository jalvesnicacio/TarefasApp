import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { auth } from '../../services/firebaseConnection'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({ changeStatus }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('login')
    const [userName, setUserName] = useState('')

    async function handleLogin() {

        if (!auth) {
            console.error("Firebase auth não inicializado!");
            return;
        }

        if (type === 'login') {
            await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user
                    changeStatus(user.uid)
                })
                .catch((err) => {
                    console.log(err)
                    alert("Alguma coisa deu errado :(")
                })
        } else {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user
                    changeStatus(user.uid)
                })
                .catch((err) => {
                    console.log(err)
                    alert("Não consegui realizar o cadastro!")
                })
        }

    }

    return (
        <SafeAreaView style={styles.container}>

            {type !== 'login' && (
                <TextInput
                    placeholder='Seu nome'
                    style={styles.input}
                    value={userName}
                    onChangeText={(text) => setUserName(text)}
                />
            )}


            <TextInput
                placeholder='Seu email'
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />

            <TextInput
                placeholder='********'
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />

            <TouchableOpacity
                style={[styles.handleLogin, { backgroundColor: type === 'login' ? '#3e56f2' : '#141414' }]}
                onPress={handleLogin}
            >
                <Text style={styles.loginText}>
                    {type === 'login' ? 'Acessar' : 'Cadastrar'}

                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setType(type => type === 'login' ? 'cadastrar' : 'login')}>
                <Text style={{ textAlign: 'center' }}>
                    {type === 'login' ? 'Criar uma conta' : 'Já tenho uma conta'}
                </Text>
            </TouchableOpacity>

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 80,
        backgroundColor: '#f2f6fc',
        marginHorizontal: 10,
    },
    input: {
        marginBottom: 10,
        backgroundColor: '#ffffff',
        borderRadius: 4,
        height: 45,
        padding: 10,
        borderColor: '#141414',
        borderWidth: 1,
    },
    handleLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        marginBottom: 10,

    },
    loginText: {
        color: '#fff',
        fontSize: 17,
    }

});
