import React, { useState } from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

export default props => {

    const [displayValue, setDisplayValue] = useState('0')
    const [clearDisplay, setClearDisplay] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [values, setValues] = useState([0,0])
    const [operation, setOperation] = useState(null)

    const clearMemory = () => {
        setDisplayValue("0")
        setClearDisplay(false)
        setCurrentIndex(0)
        setValues([0,0])
        setOperation(null)
    }

    const getOperation = (op) => {
        console.log("displayValue", displayValue)
        console.log("values", values)
        if( currentIndex === 0) {
            setOperation(op)
            setCurrentIndex(1)
            setClearDisplay(true)
        } else {
            const equals = op === '='
            const currentOperation = operation

            const newValues = [...values]
            try {
                newValues[0] = eval(`${newValues[0]} ${currentOperation} ${newValues[1]}`)
            } catch (e) {
                newValues[0] = newValues[0]
            }
            newValues[1] = 0

            setDisplayValue(newValues[0])
            setOperation(equals ? null : op)
            setCurrentIndex(equals ? 0 : 1)
            setClearDisplay(!equals)
            setValues(newValues)
        }
    }

    const addDigit = (n) => {
        if (n === '.' && displayValue.includes('.')) return

        const newClearDisplay = displayValue === '0' || clearDisplay
        const currentValue = newClearDisplay ? '' : displayValue
        const newDisplayValue = currentValue + n
        setDisplayValue(newDisplayValue)
        setClearDisplay(false)

        if (n !== '.') {
            const i = currentIndex
            console.log("INDEX = ", i)
            const newValue = parseFloat(displayValue)
            const newValues = [...values]
            newValues[i] = newValue
            setValues(newValues)
            console.log("newValues[0]", newValues[i])
            console.log("newValues", [...newValues])
            console.log("values = ", values)
            // console.log("displayValue = ", displayValue)
            // console.log("newValues = ", newValues)
        }  
    }

    return(
        <div className="calculator">
            <Display value={displayValue}></Display>
            <Button label="AC" triple click={clearMemory}/>
            <Button label="/" operation click={getOperation}/>

            <Button label="7" click={addDigit}/>
            <Button label="8" click={addDigit}/>
            <Button label="9" click={addDigit}/>
            <Button label="*" operation click={getOperation}/>

            <Button label="4" click={addDigit}/>
            <Button label="5" click={addDigit}/>
            <Button label="6" click={addDigit}/>
            <Button label="-" operation click={getOperation}/>

            <Button label="1" click={addDigit}/>
            <Button label="2" click={addDigit}/>
            <Button label="3" click={addDigit}/>
            <Button label="+" operation click={getOperation}/>

            <Button label="0" click={addDigit} double/>
            <Button label="." click={addDigit}/>
            <Button label="=" operation click={getOperation}/>
        </div>
    )

}