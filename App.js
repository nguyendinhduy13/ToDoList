import React, { useState } from "react";
import { StyleSheet,View,SafeAreaView,Text, Modal,FlatList, Alert} from "react-native";
import { BottomSheet, Button, colors, ListItem} from "react-native-elements"
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
export default function App(){
    const [Title,settitle]=useState('')
    const [id,setid]=useState('')
    const[description,setdescription]=useState('')
    const[startday,setstartday]=useState('')
    const[endday,setendday]=useState('')
    const[completed,setcompleted]=useState(true)
    const[isModalvisible,setisModalvisible]=useState(false)
    const [todo,settodo]=useState([])
    const onPressItem=()=>{
        setisModalvisible(true);
    }
    const ListItem=({todo}) =>{
        return(
            <View style={styles.ListItem}>
                <View style={{flex:1}}>
                    <Text
                    style={{fontWeight:"bold",
                    fontSize:15,
                    color:colors.primary,
                    textDecorationLine:todo?.completed?"line-through":"none"}}
                    >{todo?.Title} {todo?.description} {todo?.startday} {todo?.endday}</Text>
                </View>
                {
                    !todo?.completed&&(
                <Button style={styles.actionIcon} onPress={()=>markTodoComplete(todo?.id)}>
                   <Icon name="done" size={20} color={colors.white}/>
               </Button>
                    )
                }

               <Button style={[styles.actionIcon,{backgroundColor:"red"}]} onPress={()=>deleteTodo(todo?.id)} >
                   <Icon name="delete" size={20} color={colors.white}/>
               </Button>
            </View>
        )
    }

    const addtodo =()=>{
        const newtodo={
            id:Math.random(),
            Title,
            description,
            startday,
            endday,
            completed:false
        };
        settodo([...todo,newtodo]);
        setisModalvisible(false)
    }
    const markTodoComplete=todoId=>{
        const newTodo=todo.map((item)=>{
            if(item.id==todoId){
                return {...item,completed:true}
            }
            return item;
        })
        settodo(newTodo);
    };
    const deleteTodo=(todoId)=>{
        const newTodo=todo.filter(item=>item.id!=todoId);
        settodo(newTodo);
    }
    const clearTodo=()=>{
        Alert.alert('Confirm','Clear todo?',[
            {
                text:'Yes',
                onPress:()=>settodo([])
            },
            {text:'No'}
        ])
    }
    return(
        <SafeAreaView
        style={{flex:1,backgroundColor:colors.white}}
        >
            <View style={styles.header}>
                <Text style={{fontWeight:"bold",fontSize:20,color:colors.primary}}>
                    TO DO APP
                </Text>
                <Icon name="delete" size={25} color="red" onPress={clearTodo}/>
            </View>
            <FlatList data={todo} 
                renderItem={({item})=><ListItem todo={item} />}
                contentContainerStyle={{padding:20,paddingBottom:100}}
                showsVerticalScrollIndicator={false}
                />
            <View style={{alignItems:"flex-end", marginHorizontal:20,marginTop:20}}>
                <Button 
                title="Add"
                buttonStyle={styles.createButton}
                titleStyle={styles.createButtonTittle}
                onPress={()=>onPressItem()}
                >
                </Button>
            </View>
                
            <Modal
            animationType="fade"
            visible={isModalvisible}
            onRequestClose={()=>setisModalvisible(false)}
            >
                <View style={styles.container}>
          
          <View style={{marginTop:20,alignItems:"center"}}>
              <Text>Pop Up</Text>
          </View>
          <View style={{marginTop:40}}>
              <View>
                  <TextInput style={styles.textinput1}
                  onChangeText={Title=>settitle(Title)}
                  placeholder="Title"
                  />
              </View>
          </View>
          <View style={{marginTop:30}}>
              <View>
                  <TextInput style={styles.textinput2}
                   onChangeText={description=>setdescription(description)}
                   placeholder="Description"
                  />
              </View>
          </View>
      
          <View>
          <TextInput style={styles.textinput3}
            onChangeText={startday=>setstartday(startday)}
            placeholder="Start"
          />
          </View>

          <View style={{marginTop:-72}}>
          <View style={{alignItems:"flex-end"}}>
          <TextInput style={styles.textinput3}
            onChangeText={endday=>setendday(endday)}
            placeholder="End"
          />
          </View>
          </View>

         <View style={{alignItems:"flex-end", marginHorizontal:20,marginTop:20} }>
         <Button
          title="Save"
          buttonStyle={styles.createButton}
          titleStyle={styles.createButtonTittle}
          onPress={()=>addtodo()}
          
          />
         </View>
      </View> 
            </Modal>
           
            
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    header:{
        padding:20,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    footer:{
        position:"absolute",
        bottom:0,
        color:colors.white,
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:20,
    },
    inputContainer:{
        backgroundColor:colors.white,
        elevation:40,
        flex:1,
        height:50,
        marginVertical:20,
        marginRight:20,
        borderRadius:30,
        paddingHorizontal:20,
    },
    container :{
        flex:1
    },
        
    textinput1:{
        borderWidth:1,
        borderColor:"#86939e",
        marginHorizontal:20,
        borderRadius:12,
        marginBottom:20,
    },  
    textinput2:{
        borderWidth:1,
        borderColor:"#86939e",
        marginHorizontal:20,
        borderRadius:12,
        marginBottom:20,
        height:200
    },  
    textinput3:{
        borderWidth:1,
        borderColor:"#86939e",
        marginHorizontal:20,
        borderRadius:12,
        marginBottom:20,
        width:135
        
    },  
    createButton:{
        backgroundColor:"white",
        alignContent:"center",
        justifyContent:"center",
        borderRadius:12,
        borderWidth:1,
        borderColor:"#1db0e3",
        height:40,
        paddingHorizontal:20
    },
    createButtonTittle:{
        color:"#1db0e3",
        fontSize:16,
        fontWeight:"bold",
        alignItems:"center",
        justifyContent:"center",
        marginTop:-3
    },
    iconContainer:{
        height:50,
        width:50,
        backgroundColor:colors.primary,
        borderRadius:25,
        elevation:40,
        justifyContent:"center",
        alignItems:"center"
    },
    actionIcon:{
        height:25,
        width:25,
        backgroundColor:"green",
        justifyContent:"center",
        alignItems:"center",
        marginLeft:5,
        borderRadius:3,
    },
    ListItem:{
        padding:20,
        backgroundColor:colors.white,
        flexDirection:"row",
        elevation:12,
        borderRadius:7,
        marginVertical:10,
    },
})