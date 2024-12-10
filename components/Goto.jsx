import { Button, Text, TouchableOpacity, SafeAreaView } from "react-native"

export default function Goto({navigation}){
    const handleNavigation = ()=> {
        console.log('THIS IS HEADER RIGHT!')
        navigation.navigate('Add')
    }
    return(
        <SafeAreaView>
            <Button title="Add" onPress={handleNavigation}/>
        </SafeAreaView>
    )
}