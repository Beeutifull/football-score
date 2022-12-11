import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { sortGamesByScore, intervalFunction } from "./utils/utils";

import "./App.css";
import { Button, ScoreBoard, Select } from "./components";
import { AWAY_TEAM, HOME_TEAM } from "./constants/constants";

function App() {
    //useReducer here
    const [homeTeamName, setHomeTeamName] = useState("");
    const [awayTeamName, setAwayTeamName] = useState("");
    const [liveGames, setLiveGames] = useState([]);
    const [finishedGames, setFinishedGames] = useState([]);

    const isStartGameButtonDisabled =
        awayTeamName === "" || homeTeamName === "" ? true : false;

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
                <Select
                    label="Home Team"
                    selected={homeTeamName}
                    onChange={setHomeTeamName}
                    options={HOME_TEAM}
                    placeholder="Select Home Team"
                />
                <Select
                    label="Away Team"
                    selected={awayTeamName}
                    onChange={setAwayTeamName}
                    options={AWAY_TEAM}
                    placeholder="Select Away Team"
                />
                <Button
                    disabled={isStartGameButtonDisabled}
                    onClick={handleGameStart}
                >
                    Start Game
                </Button>
            </div>
            <ScoreBoard scoreboardTitle="Live Scoreboard" games={liveGames} />
            <ScoreBoard scoreboardTitle="Summary" games={finishedGames} />
        </div>
    );
}

export default App;
