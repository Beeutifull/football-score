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
    const [homeTeamOptions, setHomeTeamOptions] = useState(HOME_TEAM);
    const [awayTeamOptions, setAwayTeamOptions] = useState(AWAY_TEAM);

    const isStartGameButtonDisabled =
        awayTeamName === "" || homeTeamName === "" ? true : false;

    const handleGameStart = () => {
        const game = {
            id: uuidv4(),
            homeTeam: homeTeamOptions.find((el) => el.value === homeTeamName)
                .text,
            awayTeam: awayTeamOptions.find((el) => el.value === awayTeamName)
                .text,
            homeTeamScore: 0,
            awayTeamScore: 0,
            gameTime: 0,
        };
        setHomeTeamName("");
        setAwayTeamName("");
        setAwayTeamOptions(
            awayTeamOptions.filter((team) => team.value !== awayTeamName)
        );
        setHomeTeamOptions(
            homeTeamOptions.filter((team) => team.value !== homeTeamName)
        );
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
            1000 * 60
            // change this interval and game will last longer or shorter
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
                    options={homeTeamOptions}
                    placeholder="Select Home Team"
                />
                <Select
                    label="Away Team"
                    selected={awayTeamName}
                    onChange={setAwayTeamName}
                    options={awayTeamOptions}
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
            <ScoreBoard scoreboardTitle="Games Summary" games={finishedGames} />
        </div>
    );
}

export default App;
