import { Picker } from '@react-native-picker/picker';
import React, { useRef, useState } from 'react'
import { Alert, Animated, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'

export const Formulario = ({ busqueda, setBusqueda, setConsultar}) => {

    const { ciudad, pais } = busqueda

    // para la animacion del valor
    // const [animacionBoton] = useState(new Animated.Value(1)); 
    // en la documentacion dice utilizar esto xk sino da un error de useNativeDriver: true
    const animacionBoton = useRef(new Animated.Value(1)).current; // este uno significa el tamaño

    const consultarClima = () => {
        if (ciudad.trim() === '' || pais.trim() === '') {
            mostrarAlerta();
            return
        }

        setConsultar(true);

    }

    const mostrarAlerta = () => {
        Alert.alert('Error', 
        'Debe completar los campos',
        [{text: 'Entendido'}]
        )
    }

    // para animar el boton inicio
    const animacionEntrada = () => {
        Animated.spring(animacionBoton, {
            // es hacia donde va a terminar la animacion
            toValue: .8,
            useNativeDriver: true
        }).start();
    }
    const animacionSalida = () => {
        Animated.spring(animacionBoton, {
            toValue: 1,
            useNativeDriver: true,
            // es como controlar el rebote de la animacion
            friction: 2,
            // va hacer lo suave del movimiento
            tension: 30
        }).start();
    }
    const estiloAnimacion = {
        transform: [{ scale: animacionBoton }]
    }
    // para animar el boton Fin


    return (
        <>
            <View style={styles.sectionContainer}>

                <View>
                    <TextInput
                        value={ciudad}
                        onChangeText={ciudad => setBusqueda({ ...busqueda, ciudad })}
                        style={styles.input}
                        placeholder='Ciudad'
                        // para cambiar el color del placeholder
                        placeholderTextColor='#666'
                    />

                </View>


                <View>
                    <Picker
                        selectedValue={pais}
                        style={styles.item}
                        onValueChange={pais => setBusqueda({ ...busqueda, pais })}
                    >
                        <Picker.Item label='-- Seleccione un pais --' value='' />
                        <Picker.Item label='Estados Unidos' value='US' />
                        <Picker.Item label='Mexico' value='MX' />
                        <Picker.Item label='Honduras' value='HN' />
                        <Picker.Item label='Argentina' value='AR' />
                        <Picker.Item label='Colomia' value='CO' />
                        <Picker.Item label='Costa Rica' value='CR' />
                        <Picker.Item label='España' value='ES' />
                        <Picker.Item label='Peru' value='PE' />
                    </Picker>
                </View>

                <TouchableWithoutFeedback
                    onPressIn={() => animacionEntrada()}
                    onPressOut={() => animacionSalida()}
                    onPress={() => consultarClima()}
                >
                    <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>

                        <Text style={styles.textBuscar}>Buscar Clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>

            </View>


        </>
    )
}


const styles = StyleSheet.create({
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#FFF',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    item: {
        height: 80,
        backgroundColor: '#FFF'
    },
    btnBuscar: {
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center',
        borderRadius: 20
    },
    textBuscar: {
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18
    }

});
