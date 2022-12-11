const ScoreBoard = ({ games, scoreboardTitle }) => {
    return (
        <div>
            <h2>{scoreboardTitle}</h2>
            <div>
                {games.map((game) => (
                    <div className="game" key={game.id}>
                        <div>{game.homeTeam}</div>
                        <div>
                            {game.homeTeamScore}:{game.awayTeamScore}
                        </div>
                        <div>{game.awayTeam}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScoreBoard;
