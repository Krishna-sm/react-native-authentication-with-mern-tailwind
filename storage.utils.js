import AsyncStorage from "@react-native-async-storage/async-storage"

export const setItem = async (key,value) => {
 
      await AsyncStorage.setItem(key, value)
      console.log('Done.')

  
  }

  export const getItem = async (key) => {
 
   const data =  await AsyncStorage.getItem(key) || ''
   return data
    console.log('Done.')


}


export const removeItem = async (key) => {
   await AsyncStorage.removeItem(key) || ''
  
     console.log('delete')
 
 
 }