import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { sortGamesByScore, intervalFunction } from "./utils/utils";

import "./App.css";
import { Button, InputField, ScoreBoard } from "./components";

function App() {
    //useReducer here
    const [homeTeamName, setHomeTeamName] = useState("");
    const [awayTeamName, setAwayTeamName] = useState("");
    const [liveGames, setLiveGames] = useState([]);
    const [finishedGames, setFinishedGames] = useState([]);

    const handleGameStart = () => {
        const game = {
            id: uuidv4(),
            homeTeam: homeTeamName,
            awayTeam: awayTeamName,
            homeTeamScore: 0,
            awayTeamScore: 0,
            gameTime: 0,
        };
        setHomeTeamName("");
        setAwayTeamName("");
        setLiveGames((prevState) => [...prevState, game]);
    };

    useEffect(() => {
        const interval = setInterval(
            () =>
                intervalFunction(
                    liveGames,
                    setLiveGames,
                    setFinishedGames,
                    finishedGames
                ),
            1000
        );
        return () => clearInterval(interval);
    }, [finishedGames, liveGames]);

    useEffect(() => {
        sortGamesByScore(finishedGames);
    }, [finishedGames]);

    return (
        <div className="App">
            <h2>Football Fans</h2>
            <div className="inputs-wrapper">
                <InputField
                    value={homeTeamName}
                    onChange={(e) => setHomeTeamName(e.target.value)}
                    isHomeTeam
                />
                <InputField
                    value={awayTeamName}
                    onChange={(e) => setAwayTeamName(e.target.value)}
                    isHomeTeam
                />
                <Button onClick={handleGameStart}>Start Game</Button>
            </div>
            <ScoreBoard scoreboardTitle="Live Scoreboard" games={liveGames} />
            <ScoreBoard scoreboardTitle="Summary" games={finishedGames} />
        </div>
    );
}

export default App;
