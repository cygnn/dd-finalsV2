import { Button, Text, TouchableOpacity } from "react-native"

export default function Goto({navigation}){
    const handleNavigation = ()=> {
        console.log('Hello')
    }
    return(
        <Button title="ADd" onPress={handleNavigation}/>
    )
}