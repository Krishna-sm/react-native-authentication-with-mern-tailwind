import { View, Text, SafeAreaView, TextInput, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import Toast from 'react-native-toast-message'
import { BACKEND_URI, validateEmail } from '../constant'
import { setItem } from '../storage.utils'
import axios from 'axios'
const LoginPage = ({navigation}) => {


  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)


  const onSubmitHandler = async () => {
    setLoading(true)

    try {

      if (!email || !password ) {
        Toast.show({
          type: 'error',
          text1: 'Please Fill All Details',
          position: 'top'
        })
        return
      }
      if (!validateEmail(email)) {
        Toast.show({
          type: 'error',
          text1: 'Please Enter Valid Email',
          position: 'top'
        })
        return
      }


      const { data } = await axios.post(BACKEND_URI + "/login", {
       email, password
      })



      await setItem("token", data.token)






      Toast.show({
        type: 'success',
        text1: 'Login success',
        position: 'top'
      })

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'home'
          }
        ]
      })

    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.error || 'something went wrong',
        position: 'top'
      })
    } finally {
      setEmail('')
      setPassword('')
      setLoading(false)
    }
  } 

  // console.log({navigation});
  return (
        <View style={[{flex:1,backgroundColor:'white',width:'100%'},tw` px-5 py-20`]}>
           <SafeAreaView>
           <View style={tw`w-full mb-3 flex flex-col gap-y-3`}>
        <Text style={tw`text-5xl font-normal`}>Login</Text>
</View>
<View style={tw`w-full mb-3 flex flex-col gap-y-3`}>
        <Text >Enter Email</Text>
            <TextInput value={email} onChangeText={setEmail} style={tw`w-full border-[.2px] py-3 px-4 rounded-sm`} keyboardType='email-address' placeholder='Enter Email Address' />
</View>
<View style={tw`w-full mb-3 flex flex-col gap-y-3`}>
        <Text >Enter Password</Text>
            <TextInput value={password} onChangeText={setPassword} style={tw`w-full border-[.2px] py-3 px-4 rounded-sm`} secureTextEntry placeholder='********' />
</View>
<View style={tw`w-full mb-3`}>
          <TouchableWithoutFeedback disabled={loading} onPress={onSubmitHandler} style={tw`w-full items-center`}>
          <Text style={tw`text-lg bg-black py-2 rounded-lg text-white text-center`}>{
              loading ? <ActivityIndicator size={'large'} color={"white"} /> : `Login`

          }</Text>
        </TouchableWithoutFeedback>

</View>

<View  style={tw`w-full my-3 flex flex-col gap-y-3 items-end`}>
            <Text onPress={()=>navigation.navigate("register")}> Dont Have An Account ? <Text style={tw`font-semibold`}>Register</Text> </Text>
</View>

</SafeAreaView>
        </View>
  )
}

export default LoginPage