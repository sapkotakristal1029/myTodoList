import { Text, StyleSheet,Button, View, Pressable,Alert, TextInput, ScrollView, FlatList } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { AntDesign } from '@expo/vector-icons';

import { useEffect } from "react";
import {  useNavigation } from '@react-navigation/native';



export const NewTodo = () =>{
  const navigation = useNavigation();
  
  // const route = useRoute();
  
  const [todoList, settodoList] = useState([
    {key:'1',title:'Task 1', description:'Description about it what to do and other thing' },
    {key:'2',title:'Task 2', description:'Description about it what to do and other thing' },
    {key:'3',title:'Task 3', description:'Important task' },
    {key:'4',title:'Task 3', description:'Important task' },
    {key:'5',title:'Task 3', description:'Important task' } 
  ])

  // useEffect(() => {
  //   navigation.navigate('TodoApp', { todoList:todoList });
  // }, []);

 
  
  const [titletext,setTitleText] = useState('')
  const changeTitleTextHandler = (val) =>setTitleText(val)
  const [descriptiontext,setDescriptionText] = useState('')
  const changeDescriptionTextHandler = (val) =>setDescriptionText(val)
  
  const [cancelBtnText,backBtnText] = useState ('CANCEL');
  const textCancel =()=>{
    backBtnText("BACK")
  }

 


  const saveButtonHandler = ()=>{
    if ((titletext == '')&&(descriptiontext == '')){
      Alert.alert('Both Title field and Description Field is empty')
    }else if (titletext == ''){
      Alert.alert('Title field is empty')
    }else if (descriptiontext == ''){
      Alert.alert('Description field is empty')
    }else{
      Alert.alert('Todo Added Successfully')
      setTitleText("");
      setDescriptionText('');
      {textCancel};

      const newTodo = {key:(todoList.length+1).toString(), title: titletext, description:descriptiontext }
      
      // settodoList([...todoList,newTodo])
      
      const updatedTodoList = [...todoList, newTodo];

      // console.log({settodoList})
      settodoList(updatedTodoList);

      
      
      console.log("NewTodo todoList:", todoList);
      navigation.navigate('NewTodo', { todoList: updatedTodoList })
      
      
  }
  
 

  console.log(todoList)
}


    return(
      <View style = {styles.container}>
        <Text style = {styles.header}>Add New To Do</Text>
        <Pressable style = {({pressed}) =>[(pressed? {opacity: 0.2}:{}), styles.backicon,]}
          onPress ={() =>{navigation.navigate("TodoApp")}}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        
        <View style = {styles.writingArea}>
          <View style = {styles.newtitlebox}>
            <Text style = {styles.newtitle}>TITLE</Text>
            <TextInput 
              placeholder="Write Title"
              editable
              style = {styles.newtitlewriting} 
              value = {titletext}
              onChangeText={changeTitleTextHandler}
              />                  
          </View>


          <View style = {styles.newdescriptionbox}>
            
              <Text style = {styles.newdescription}>DESCRIPTION</Text>
              {/* <ScrollView> */}
                <TextInput 
                  editable
                  multiline
                  numberOfLines={3}
                  placeholder="Write More about Title here"
                  value = {descriptiontext}
                  style = {styles.newdescriptionwriting}
                  onChangeText={changeDescriptionTextHandler}/>
              {/* </ScrollView>  */}
          </View>
        </View>
        <View style = {styles.todobuttons}>
          <Pressable 
            onPress={()=>{
              saveButtonHandler();
              textCancel();


            }}
            style = {({pressed}) => [(pressed ? {opacity: 0.2}:{}), styles.savebutton,]}>
              <Ionicons name="save" size={20} color="black" />
              <Text style = {styles.savetext} >SAVE</Text>
          </Pressable>
         
          <View style = {styles.inbetweenbutton}></View>
          <Pressable 
            onPress={()=> navigation.goBack()}
            style = {({pressed}) => [(pressed ? {opacity: 0.2}:{}), styles.savebutton,]}>
              
              {/* <AntDesign name="caretleft" size={20} color="black" style = {styles.hideIcon} /> */}
              <MaterialIcons style = {styles.showIcon} name="delete" size={20} color="black" />
              <Text style = {styles.savetext} >{cancelBtnText}</Text>
          </Pressable>
        </View>  
      </View>
    
)}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffeacb',
        alignItems: 'center',
  },
  header:{
    
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 70,
    width: '100%',
    textAlign: 'center',
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffd596',
  },
  backicon:{
    position: "absolute", 
    left: 10,
    top:40,
  },
  writingArea:{
    
    width:385,
    paddingBottom: 15,
    paddingTop: 10,
    paddingRight: 7,
    paddingLeft: 7,
    marginBottom: 50,
    // height: 500,
    backgroundColor: '#ffd596',
    flexWrap: 'wrap',
    flexDirection: 'column',
    gap: 5,
    justifyContent: 'gap-between',

  },
  newtitlebox:{
    
    backgroundColor:'#ffb64a',
    width: 370,
    height: 100,
    paddingBottom: 50,
    alignItems: 'center',
    marginBottom:10,


  }, 
  newtitle:{
    fontSize: 25,
    fontWeight: 'bold',
  },

  newtitlewriting:{
    fontSize: 15,
  },
  newdescriptionbox:{
    backgroundColor:'#ffb64a',
    width: 370,
    height: 140 ,
    paddingBottom: 50,
    alignItems: 'center',
    // marginBottom:10,


  }, 
  newdescription:{
    fontSize: 25,
    fontWeight: 'bold',
  },

  newdescriptionwriting:{
    fontSize: 15,
    justifyContent: 'center',
  },

  todobuttons:{
    flexDirection: 'row',

  },
  savebutton:{
    flexDirection: 'row',
    padding:5,
    width: 100,
    height:30,
    backgroundColor: '#ffb64a',
    textAlign: 'center',
    justifyContent: 'center',
    
  },
  savetext:{
    fontWeight: 'bold',
    fontSize: 15,
  },
  inbetweenbutton:{
    width: 150,
  },
  // showIcon:{
  //   display:'block',
  // },
  // hideIcon:{
  //   display:'none',
  // }
  
})