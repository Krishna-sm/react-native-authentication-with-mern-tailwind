import { View, Text, SafeAreaView, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import Toast from 'react-native-toast-message'
import { getItem, removeItem } from '../storage.utils'
import axios from 'axios'
import { BACKEND_URI } from '../constant'
const HomePage = ({navigation}) => {


  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)

  const fetchUser = async()=>{
    setLoading
        try {
                const token = await getItem("token") || ''
          if (!token){
            await removeItem("token")
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'login'
                }
              ]
            })
            return
          }

 


          const {data} = await axios.get(BACKEND_URI+"/profile",{
            headers:{
              'Authorization': 'Bearer ' + token
            }
          })
 

          if (!data){
            await removeItem("token")
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'login'
                }
              ]
            })
            return
          }


          setUser(data.user)


        } catch (error) {

          console.log(error);
          await removeItem("token")
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'login'
              }
            ]
          })
          Toast.show({
            type: 'error',
            text1: error.response.data.error || 'something went wrong',
            position: 'top'
          })
        }finally{
          setLoading(false)
        }

  }

  useEffect(()=>{
    fetchUser()
  },[])


  const onLogoutHandler  = async()=>{
    try {
      
      Toast.show({
        type:'success',
        text1: 'logout success',
        position:'top'
      })



      await removeItem("token")

      navigation.reset({
        index:0,
        routes:[
          {
            name:'login'
          }
        ]
      })
      
    } catch (error) {
      Toast.show({
        type:'error',
        text1:error.message || 'something went wrong',
        position:'top'
      })
    }
  }

  if (loading){
    return <>
    
        <View style={tw`flex-1 bg-white justify-center items-center `}>
        <ActivityIndicator size={'large'} color={"black"} />
        <Text>loading...</Text>
        </View>
    </>
  }

  return (
    <View style={[{flex:1,backgroundColor:'white',width:'100%'},tw` px-5 py-20`]}>
           <SafeAreaView>

           <View style={tw`w-full mb-3 flex flex-col gap-y-3`}>
        <Text style={tw`text-5xl font-normal`}>Dashboard</Text>
</View>
        <View style={tw`flex flex-col gap-y-4 w-full items-center`}>
          <Text style={tw`text-xl`}>Name: {user && user.name}</Text>
          <Text style={tw`text-xl`}>Email: {user && user.email}</Text>
        </View>

        <View style={tw`w-full my-3`}>
        <TouchableWithoutFeedback onPress={onLogoutHandler} style={tw`w-full `}>
          <Text style={tw`text-lg bg-black py-2 rounded-lg text-white text-center`}>Logout</Text>
        </TouchableWithoutFeedback>

</View>



           </SafeAreaView>
           </View>
  )
}

export default HomePage