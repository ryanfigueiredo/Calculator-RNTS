import React from 'react'
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight
} from 'react-native'

const styles = StyleSheet.create({
  button: {
    fontSize: 40,
    height: Dimensions.get('window').height / 7,
    width: Dimensions.get('window').width / 4,
    padding: 20,
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#888'
  },
  buttonOperation: {
    color: '#fff',
    backgroundColor: '#fa8231'
  },
  buttonDouble: {
    width: (Dimensions.get('window').width / 4) * 2
  },
  buttonTriple: {
    width: (Dimensions.get('window').width / 4) * 3
  }
})

interface IButton {
  label: string
  onClick: (label: string) => void,
  double?: true,
  triple?: true,
  operation?: true
}

export default ({ label, onClick, double, triple, operation }: IButton ) => {
  const stylesButton: any[] = [styles.button]
  if(double) stylesButton.push(styles.buttonDouble)
  if(triple) stylesButton.push(styles.buttonTriple)
  if(operation) stylesButton.push(styles.buttonOperation)

  return (
    <TouchableHighlight onPress={() => onClick(label)}>
      <Text style={stylesButton}>{label}</Text>
    </TouchableHighlight>
  )
}