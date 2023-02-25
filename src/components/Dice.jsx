import '../css/dice.css'

export default function Dice(props){
    return(
        <div className="dice">
            <h2>{props.number}</h2>
        </div>
    )
}