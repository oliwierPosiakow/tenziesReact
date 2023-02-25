import '../css/app.css'
import Dice from './Dice'
import React from 'react'
import {nanoid} from 'nanoid'

function App() {
  const [diceArr, setDiceArr] = React.useState(newDice())
  const diceElements = diceArr.map(el => <Dice key={el.id} number={el.value} isHeld={el.isHeld} handleClick={() => holdDice(el.id)}/>)

  function newDie(){
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function holdDice(id){
    setDiceArr(prevDiceArr => {
      const newDiceArr = prevDiceArr.map(dice => {
        if(dice.id === id){
          dice = {...dice, isHeld: !dice.isHeld}
        }
        return dice
      })
      return newDiceArr
    })
  }

  function handleRoll(){
    setDiceArr(prevDiceArr => prevDiceArr.map(dice => {
        return dice.isHeld  ? dice : newDie()
      })
    ) 
  }

  function newDice(){
    const diceArr = []
    for(let i=0; i<10; i++){
      diceArr.push(newDie())
    }
    return diceArr
  }

  return (
    <div className="App">
      <main>
        <h1 className="title">Tenzies</h1>
        <div className="info">
          <p>Roll util all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </div>
        <div className="dice--container">
          {diceElements}
        </div>
        <button onClick={handleRoll} className="rollDice">Roll</button>
      </main>
    </div>
  )
}

export default App
