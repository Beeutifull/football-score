import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { sortGamesByScore, intervalFunction } from "./utils/utils";

import "./App.css";
import { Button, InputField, ScoreBoard, Select } from "./components";

const OPTIONS = [
    { value: "giedrius", text: "Giedrius" },
    { value: "gytis", text: "Gytis" },
    { value: "michal", text: "Michal" },
    { value: "viktor", text: "Viktor" },
    { value: "nemanja", text: "Nemanja" },
];

const OPTIONS2 = [
    { value: "giedriusaaa", text: "Giedriusaaa" },
    { value: "gytisaaa", text: "Gytisaaa" },
    { value: "michalaaa", text: "Michalaaa" },
    { value: "viktoraaa", text: "Viktoraaa" },
    { value: "nemanjaaaa", text: "Nemanjaaaa" },
];

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
                <Select
                    label="Home Team"
                    selected={homeTeamName}
                    onChange={setHomeTeamName}
                    options={OPTIONS}
                    placeholder="Select Home Team"
                />
                <Select
                    label="Away Team"
                    selected={awayTeamName}
                    onChange={setAwayTeamName}
                    options={OPTIONS2}
                    placeholder="Select Away Team"
                />
                <Button onClick={handleGameStart}>Start Game</Button>
            </div>
            <ScoreBoard scoreboardTitle="Live Scoreboard" games={liveGames} />
            <ScoreBoard scoreboardTitle="Summary" games={finishedGames} />
        </div>
    );
}

export default App;
