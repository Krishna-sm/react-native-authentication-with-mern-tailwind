import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Text, View } from 'react-native';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Toast from 'react-native-toast-message';
import { useEffect, useState } from 'react';
import { getItem } from './storage.utils';
import tw from 'twrnc'

export default function App() {

  const Stack = createNativeStackNavigator()

  const [loading,setLoading] = useState(false);

  const [initial,setInital] = useState('');

  const chckInital =async ()=>{
    setLoading(true)
    try {
           const token = await getItem("token") || ''
            if(!token){
              setInital("login")
              return
            }else{
                 setInital("home")
              return
            }

      } catch (error) {
      console.log(error.message);
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    chckInital()
  },[])


if (loading){
    return <>
    
        <View style={tw`flex-1 bg-white justify-center items-center `}>
        <ActivityIndicator size={'large'} color={"black"} />
        <Text>loading...</Text>
        </View>
    </>
  }
  return (
   <>
       <NavigationContainer>

            <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName={initial}>
              <Stack.Screen name='home' component={HomePage} />
              <Stack.Screen name='login' component={LoginPage} />
              <Stack.Screen name='register' component={RegisterPage} />
            </Stack.Navigator>
    </NavigationContainer>
        <Toast/>
      
      <StatusBar style="light" backgroundColor='black' translucent networkActivityIndicatorVisible />
   
   </>
  );
}
