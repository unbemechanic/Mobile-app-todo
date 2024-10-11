/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  StatusBar,
  StyleSheet,
  FlatList,
  Text,
  View,
  TextInput,
  Pressable,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { Task } from './src/types/todo';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather'
import Ant from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

function generateKey(): string {
  return `${Math.random().toString(8).substr(2, 9)}-${Date.now()}`
}
console.log(generateKey())
function App(): React.JSX.Element {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const handleSubmit = () => {
    if (task) {
      setTasks([...tasks, { key: generateKey(), value: task }]);
      setTask('');
    }
  };

  const handleDelete = () => {
    setTasks([]);
    setCompletedTasks(new Set());
  };

  const handleDeleteItem = (taskKey: string) => {
    setTasks(tasks.filter(task => task.key !== taskKey));
    setCompletedTasks(new Set([...completedTasks].filter(key => key !== taskKey)));
  };

  const handleDecor = (taskKey: string) => {
    const newCompletedTasks = new Set(completedTasks);
    if (newCompletedTasks.has(taskKey)) {
      newCompletedTasks.delete(taskKey);
    } else {
      newCompletedTasks.add(taskKey);
    }
    setCompletedTasks(newCompletedTasks);
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'light-content'} backgroundColor={''} />
      <LinearGradient style={styles.linearGradient} colors={['#6a195961', '#8d3b9867', '#4c669f60']}>
        <TextInput
          placeholder="Add new task"
          value={task}
          onChangeText={setTask}
          style={styles.input}
        />
        <Pressable onPress={handleSubmit}>
          <Text style={styles.add}>Add</Text>
        </Pressable>
      </LinearGradient>
      <LinearGradient colors={['#4c669fa9', '#8d3b9897', '#6a195988']} style={styles.container}>
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <View style={{ width: '100%' }}>
              <View style={styles.todos}>
                <Text
                  style={{
                    textDecorationLine: completedTasks.has(item.key) ? 'line-through' : 'none',
                    color: completedTasks.has(item.key) ? 'green' : 'black',
                    fontSize: 20,
                    paddingLeft: 20,
                    flex: 3,
                  }}
                  key={item.key}
                >
                  {item.value}
                </Text>
                <Pressable onPress={() => handleDecor(item.key)}>
                  {completedTasks.has(item.key) ? (
                    <Icon size={34} style={{ color: 'green' }} name="check-circle" />
                  ) : (
                    <Entypo size={34} style={{ color: 'gray', marginRight: 33 }} name="circle" />
                  )}
                </Pressable>
                <Pressable onPress={() => handleDeleteItem(item.key)}>
                  {completedTasks.has(item.key) ? <Ant size={34} style={{ color: 'red' }} name="delete" /> : ''}
                </Pressable>
              </View>
            </View>
          )}
        />
        <Pressable
          style={{
            position: 'absolute',
            left: 170,
            bottom: 130,
            backgroundColor: 'red',
            padding: 20,
            borderRadius: 10,
          }}
          onPress={handleDelete}
        >
          <Text style={{ color: 'white' }}>Delete All</Text>
        </Pressable>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({
 linearGradient: {
  height: 100,
  width: '100%',
  padding: 10,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent:'space-between',

 },
 input: {
  width:'70%',
  backgroundColor:'white',
  borderRadius: 5,
  borderColor:'white',
  padding: 10,
  height: 40
 },
 add: {
  backgroundColor:'#0fe60f',
  justifyContent:'center',
  color:'#fff',
  padding: 10,
  height: 40,
  paddingHorizontal: 20,
  borderRadius: 5

 },
 container: {
  height:'100%'
 },
 x: {
  height: 30,
  width: 30,
  borderRadius:15,
  backgroundColor:'red',
  color:'#fff',
  alignItems:'center',
  textAlign:'center'
 },
 todos: {
  height:60,
  width:'90%',
  marginHorizontal: 20,
  flexDirection:'row',
  backgroundColor:'white',
  padding:10,
  // justifyContent:'space-between',
  marginTop: 20,
  marginBottom:20,
  borderRadius: 20,
  alignItems: 'center'
 }
});


