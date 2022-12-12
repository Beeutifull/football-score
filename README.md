# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

You may also see any lint errors in the console.

## About the App

Footbal fans app is designed to for you to select from 2 teams (Home and Away) and run games which will in certain time result in different/same score.

Live score is presented under **Live Scoreboard** heading and finished games are displayed under the **Games Summary** heading. After selecting 2 teams from the dropdown menu you can **Start the Game**.

### Things to note

-   Each game lasts 9min (scaled 90min to 9). You can scale this even more inside **App.js** on line 42
-   For selecting pairs I've moved from **_text input_** to **_select input_** so mistakes like same team playing against itself won't happen, or making spelling mistake while typing
-   Button **_Start Game_** will remain disabled until you select both teams
-   After starting the game teams from select menu will disapier, so user can't make mistake of having same team playing 2 or more matches at the same time
-   It is assumptioned that **_games are finished with no extension time_**
