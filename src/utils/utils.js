export const twentyPercentChanceScore = (games) => {
    return games.map((game) => {
        const a = Math.floor(Math.random() * 11);
        if (a >= 8) {
            const b = Math.floor(Math.random() * 2 + 1); // random 1 or 2
            const team =
                b !== 2
                    ? { homeTeamScore: game.homeTeamScore + 1 }
                    : { awayTeamScore: game.awayTeamScore + 1 };
            return { ...game, ...team };
        } else return game;
    });
};

export const sortGamesByScore = (games) => {
    return games.sort((a, b) => {
        const numberOfGoalsFirst = a.homeTeamScore + a.awayTeamScore;
        const numberOfGoalsSecond = b.homeTeamScore + b.awayTeamScore;
        return numberOfGoalsSecond - numberOfGoalsFirst;
    });
};

export const intervalFunction = (games, setLiveGames, setFinishedGames) => {
    const incrementedGames = increaseTime(games);
    const finishedGames = incrementedGames.filter((game) => game.gameTime > 90);
    const liveGames = incrementedGames.filter((game) => game.gameTime <= 90);
    setLiveGames(twentyPercentChanceScore(liveGames));
    setFinishedGames((prevState) => [...prevState, ...finishedGames]);
};

export const increaseTime = (games) => {
    return games.map((game) => ({ ...game, gameTime: game.gameTime + 5 }));
};

export const getSelectedText = (options, selected) => {
    if (options && selected) {
        const item = options.find((item) => item.value === selected);
        return item.text;
    }
};
