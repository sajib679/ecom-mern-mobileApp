import AsyncStorage from '@react-native-community/async-storage';

export const getItem = async(item) => {
    try {
        const value = await AsyncStorage.getItem(item);
        return JSON.parse(value);
    } catch (error) {
        console.log("GetItem error ",error)

        return null;
    }
};

export const setItem = async(item,value)=>{
    try {
        await AsyncStorage.setItem(item, JSON.stringify(value));
    } catch (error) {
        console.log("SetItem error ",error)
        return null;
    }
}

export const removeItem = async (key)=> {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch(exception) {
        return false;
    }
}