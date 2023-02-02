import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Clima } from './components/Clima';
import { Formulario } from './components/Formulario';

const App = () => {

  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  })

  const [consultar, setConsultar] = useState(false);

  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)

  // para cambiar el color del fondo segun temperatura
  const [bgcolor, setBgcolor] = useState('rgb(71,149,212)')

  const { ciudad, pais } = busqueda


  useEffect(() => {
    const consultarClima = async () => {
      if (consultar) {
        const appId = 'd569138957c84d6e614b63324d2dc334'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

        try {
          // cuando utlizo fetch tiene que ser doble await

          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          
          // ocultar el spinner y mostrar el resultado
          setCargando(true);
          setTimeout(() => {
            setResultado(resultado)
            setConsultar(false)
            setCargando(false);

            // modifica los colores de fondo basado en la temperatura
            const kelvin = 273.15;
            const { main } = resultado;
            const actual = main.temp - kelvin;

            if (actual < 10) {
              setBgcolor('rgb(105,108,149)')
            } else if (actual >= 10 && actual < 25) {
              setBgcolor('rgb(71,149,212)')
            } else {
              setBgcolor('rgb(178,28,61)')
            }

          }, 2000);



          // validacion del cod que nos regresa yq se siempre manda status(200)
          if (resultado.cod === "404") {
            mostrarAlerta();
          }
        }
        // el catch solo se ejecuta cuando el api regresa un 404 en este caso no lo regresa siempre manda un 200
        // por eso agregamos la validacion en la parte del try
        catch (error) {
          mostrarAlerta();
        }
      }
    }
    consultarClima();
  }, [consultar])

  const mostrarAlerta = () => {
    Alert.alert('Error',
      'No hay resultado intenta con otra ciudad o pais',
      [{ text: 'Entendido' }]
    )
  }


  const ocultarTeclado = () => {
    Keyboard.dismiss() // para cerrar el teclado
  }

  const bgColorApp = {
    backgroundColor: bgcolor
  }


  // mostrar el spinner o el resultado
  // ActivityIndicator es el spinner
  const componente = cargando
    ? <ActivityIndicator size='large' color='#5E49E2' />
    : <Clima
      resultado={resultado}
    />


  return (
    <>
      <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.contenido}>

            <View style={{ marginBottom: 20 }}>
              {componente}
            </View>

            <Formulario
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              setConsultar={setConsultar}
            />
          </View>
        </View>

      </TouchableWithoutFeedback>

    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    //  color como rgb
    // backgroundColor: 'rgb(71,149,212)',
    justifyContent: 'center'

  },
  contenido: {
    marginHorizontal: '2.5%'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
