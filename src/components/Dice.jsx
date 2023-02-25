import '../css/dice.css'

export default function Dice(props){
    const styles = {
        backgroundColor: props.isHeld === true ? '#59e390' : 'white'
    }
    return(
        <div className='dice' style={styles} onClick={props.handleClick}>
            <h2>{props.number}</h2>
        </div>
    )
}