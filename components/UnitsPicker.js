import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Picker } from '@react-native-community/picker'
export default function UnitsPicker({unitsSystem, setUnitsSystem}) {
    return (
        <View style={styles.units}>
            <Picker selectedValue={unitsSystem} mode="dropdown" onValueChange={(item)=> setUnitsSystem(item)}>
                <Picker.Item label="C" value="metric" />
                <Picker.Item label="F" value="imperial" />
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    units:{
        position: 'absolute',
        width: 100,
        height: 50,
        top: 30,
        left: 20
    },
})
