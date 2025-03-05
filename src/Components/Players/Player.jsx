import { useState } from 'react'

const Player = ({InitialName, symbol, isActive}) => {
    const [playerName, setPlayerName] = useState(InitialName);  // initialize the name state with the provided name prop
    const[isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing((editing) => !editing);// schedule a state update to true
    }

    const handleChange = (e) => {
        setPlayerName(e.target.value); // update the name state with the entered value
    }

    return (
        <li className={isActive ? 'active' : ''}>
            <span className="player">
                {!isEditing ? <input type='text' required value={playerName} onChange={handleChange}/> : <span className="player-name">{playerName}</span>}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{!isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}

export default Player