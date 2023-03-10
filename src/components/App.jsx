import '../css/app.css'
import Dice from './Dice'
import React from 'react'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [diceArr, setDiceArr] = React.useState(newDice())
  const diceElements = diceArr.map(el => <Dice key={el.id} number={el.value} isHeld={el.isHeld} handleClick={() => {tenzies ? '' : holdDice(el.id)}}/>)
  const [tenzies, setTenzies] = React.useState(false)
  const [rolls, setRolls] = React.useState(0)


  React.useEffect(() => {
    const allHeld = diceArr.every(die => die.isHeld)
    const firstVal = diceArr[0].value
    const everyValue = diceArr.every(die => die.value === firstVal)
    if(allHeld && everyValue){
      setTenzies(true)
    }
  },[diceArr])

  function newDie(){
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function saveRun(){
    const localBest = JSON.parse(localStorage.getItem('bestRun'))
    if(!localBest){
      localStorage.setItem('bestRun', JSON.stringify(rolls))
    }
    else if(localBest && localBest > rolls){
      localStorage.setItem('bestRun', JSON.stringify(rolls))
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
    setRolls(prevRolls => prevRolls + 1) 
  }

  function newGame(){
    saveRun()
    setTenzies(prevTenzies => !prevTenzies)
    setDiceArr(newDice())
    setRolls(0)
  }

  function newDice(){
    const diceArr = []
    for(let i=0; i<10; i++){
      diceArr.push(newDie())
    }
    return diceArr
  }

  const bestStyles = {
    display: JSON.parse(localStorage.getItem('bestRun')) ? 'block' : 'none'
  }

  return (
    <div className="App">
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <div className="info">
          <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <p className="best-run" style={bestStyles}>Best run: {JSON.parse(localStorage.getItem('bestRun'))} rolls</p>
        </div> 
        <div className="dice--container">
          {diceElements}
        </div>
        <div className="rolls-counter">
          Rolls: {rolls}
        </div>
        <button onClick={tenzies ? newGame : handleRoll} className="rollDice">{tenzies ? 'New Game' : 'Roll'}</button>
      </main>
    </div>
  )
}

export default App
