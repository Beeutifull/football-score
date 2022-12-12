import styles from "./_styles.module.scss";

const ScoreBoard = ({ games, scoreboardTitle }) => {
    return (
        <div>
            <h2>{scoreboardTitle}</h2>
            <div>
                {games.length > 0
                    ? games.map((game) => (
                          <div className={styles.game} key={game.id}>
                              <div>{game.homeTeam}</div>
                              <div>
                                  {game.homeTeamScore}:{game.awayTeamScore}
                              </div>
                              <div>{game.awayTeam}</div>
                          </div>
                      ))
                    : "No Games here currently"}
            </div>
        </div>
    );
};

export default ScoreBoard;
