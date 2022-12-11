const InputField = ({ value, onChange, isHomeTeam = false }) => (
    <div className="input-wrapper">
        <label htmlFor="team">
            {isHomeTeam ? "Home Team Name" : "Away Team Name"}
        </label>
        <input
            name={`${isHomeTeam ? "homeTeam" : "awayTeam"}Name`}
            value={value}
            onChange={onChange}
            placeholder="Enter team name"
        />
    </div>
);

export default InputField;
