import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';

export const Clima = ({ resultado }) => {

  const { name, main } = resultado

  if (!name) return null;

  // grados kelvin
  const kelvin = 273.15;


  return (
    <View style={styles.clima}>

      <Text style={[styles.texto, styles.actual]}>{parseInt(main.temp - kelvin)}
        {/* para agregar el signo de Celsius */}
        <Text style={styles.temperatura}> &#x2103; </Text>
        <Image

          style={{ width: 66, height: 58, }}
          // para traer una imagen de la web
          source={{ uri: `https://openweathermap.org/img/w/${resultado.weather[0].icon}.png` }}

        />
      </Text>

      <View style={styles.temperaturas}>
        <Text style={styles.texto}> Min {''}
          <Text>{parseInt(main.temp_min - kelvin)}
            &#x2103;
          </Text>
        </Text>
        <Text style={styles.texto}> Max {''}

          <Text>{parseInt(main.temp_max - kelvin)}
            &#x2103;
          </Text>
        </Text>
      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  clima: {
    // se lo quito xk le coloco lo mismo al componente del ActivityIndicator
    // marginBottom: 20
  },
  texto: {
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
    marginRight: 20
  },
  actual: {
    fontSize: 80,
    marginRight: 0,
    fontWeight: 'bold'
  },
  temperatura: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  temperaturas: {
    flexDirection: 'row',
    justifyContent: 'center',

  },
});
