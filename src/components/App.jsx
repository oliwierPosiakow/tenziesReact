import '../css/app.css'
import Dice from './Dice'

function App() {

  const diceArr = []

  for(let i=0; i<10; i++){
    const randomVal = Math.floor(Math.random() * 9)+1
    diceArr[i] = <Dice key={i} number={randomVal}/>
  }

  console.log(diceArr)

  return (
    <div className="App">
      <main>
        <div className="dice--container">
          {diceArr}
        </div>
      </main>
    </div>
  )
}

export default App
