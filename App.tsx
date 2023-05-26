"use client"

import { useState } from 'react'
import Display from './src/components/Display'
import Button from './src/components/Button'
import { StyleSheet, View } from 'react-native'

interface ICalculator {
  displayValue: string
  clearDisplay: boolean
  operation: '/' | '*' | '+' | '-' | '=' | null
  values: number[]
  current: number
}

const initialState: ICalculator = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
}

export default function App() {
  const [calculator, setCalculator] = useState<ICalculator>(initialState)

  const clearDisplay = () => { return calculator.displayValue === '0' || calculator.clearDisplay }
  const currentValue = () => { return clearDisplay() ? '' : calculator.displayValue }

  const addDigit = (digit: string) => {
    if ((digit === '.' && !(clearDisplay())) && calculator.displayValue.includes('.')) return;
    
    const displayValue = currentValue() + digit

    setCalculator(prevFields => ({
      ...prevFields,
      displayValue,
      clearDisplay: false,
    }))

    if (digit !== '.') {
      const newValue = parseFloat(displayValue)
      const values = [...calculator.values]

      values[calculator.current] = newValue

      setCalculator(prevFields => ({
        ...prevFields,
        displayValue,
        clearDisplay: false,
        values,
      }))
    }
  }

  const clearOperation = () => {
    setCalculator({ ...initialState });
  }

  const setOperation = (operation: '/' | '*' | '+' | '-' | '=') => {
    if (calculator.current === 0) {
      setCalculator(prevFields => ({
        ...prevFields,
        operation,
        current: 1,
        clearDisplay: true,
      }))
    } else {
      const equals = operation === '='
      const values = [...calculator.values]

      try {
        values[0] = 
          eval(`${values[0]} ${calculator.operation} ${values[1]}`)
      } catch (e) {
        values[0] = calculator.values[0]
      }
  
      values[1] = 0

      setCalculator(prevFields => ({
        ...prevFields,
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        //clearDisplay: !equals,
        clearDisplay: true,
        values,
      }))
    }
  }

  return (
    <View style={styles.container}>
      <Display value={calculator.displayValue} />

      <View style={styles.buttons}>
        <Button label='AC' triple onClick={clearOperation} />
        <Button label='/' operation onClick={() => setOperation('/')} />
        <Button label='7' onClick={() => addDigit('7')} />
        <Button label='8' onClick={() => addDigit('8')} />
        <Button label='9' onClick={() => addDigit('9')} />
        <Button label='*' operation onClick={() => setOperation('*')}  />
        <Button label='4' onClick={() => addDigit('4')} />
        <Button label='5' onClick={() => addDigit('5')} />
        <Button label='6' onClick={() => addDigit('6')} />
        <Button label='-' operation onClick={() => setOperation('-')} />
        <Button label='1' onClick={() => addDigit('1')} />
        <Button label='2' onClick={() => addDigit('2')} />
        <Button label='3' onClick={() => addDigit('3')} />
        <Button label='+' operation onClick={() => setOperation('+')} />
        <Button label='0' double onClick={() => addDigit('0')}  />
        <Button label='.' onClick={() => addDigit('.')} />
        <Button label='=' operation onClick={() => setOperation('=')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});