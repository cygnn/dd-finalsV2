import { Button, Text, TouchableOpacity } from "react-native"

export default function Goto({navigation}){
    const handleNavigation = ()=> {
        console.log('THIS IS HEADER RIGHT!')
        navigation.navigate('Add')
    }
    return(
        <Button title="Add" onPress={handleNavigation}/>
    )
}