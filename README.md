# RetroGameTracker

RetroGameTracker is a website that allows you to discover your next favorite game. It allows you to organize your games, while also allowing you to rate the games yourself. You can find our website at https://retro-game-tracker.herokuapp.com/

## Contributors
* [Eric Quan](https://www.google.com)
* [Johnny Park](https://github.com/gobugi)
* [Anthony Seefried](https://github.com/goldeneye5671)
* [Huan Ai](https://github.com/Huan4Ai)


## Development
* Our agile process can be found on our wiki/project tab located at
    1. https://github.com/equan1090/retro-tracker/projects
    2. https://github.com/equan1090/retro-tracker/wiki
* To start our development:
    1. Clone the repository at https://github.com/equan1090/retro-tracker.git
    2. Run go to the root directory and type "npm install" into the terminal to install dependencies
    3. Run the "npm start" to launch the server
    4. Navigate to config/index.js to locate the port number specified

## Technologies Used
* Node.js
* Javascript
* Pug
* HTML/CSS
* Postgres
* Express
* Sequelize
* Git/Github
* Heroku

## Features
* Users
    * Users can sign up, log in, log out
    * Users can use the demo to test the site
    * Users cannot use certain features without logging in. i.e adding reviews to specific video games
    * The Bcrypt hashing algorithm is used to maintain password security.
    * All forms are protected against Csurf attacks


* Collections
    * Upon registration, Users have access to 3 provided collections
    * Games can be added to or removed from specific collections

* Games
    * A list of games can be viewed by both authorized and unauthorized users
    * Each game has its own individual detail/review page
    * Games may have multiple reviews

* Reviews
    * Authorized user may add a review to a specific game
    * Users may edit/remove their own reviews

## What we learned and challenges we faced
* One of the major skills we learned was to implement git and github. Learning to commit early, and constantly pulling form the main branch to merge with our current branch.
* We learned how to communicate with each other effectively.
* One challenge we faced was the time constraints. We learned that we cannot add every single feature we want within our given time slot. Learning to add only the important feature to get the minimum viable product working.
* Learned how to dynamically use database queries
* We found it difficult to use css styling to accuractely position our html elements.
* Adding user authentication was extremely difficult

## Code Highlights
* Adding a game to the collection
    ```
        const allButtons = document.querySelectorAll('.addGameBtn');
        for (let button of allButtons) {
            button.addEventListener('click', async (event) => {
                const gameId = event.target.parentElement.parentElement.id;
                console.log(gameId)
                const selectCurrentVal = document.querySelector(`.select-${gameId}`);
                const collectionId = selectCurrentVal.options[selectCurrentVal.selectedIndex].value;
                const value = await fetch(`/api/collections/${collectionId}`, {method:'POST', body: JSON.stringify({gameId}), headers: {'Content-Type': 'application/json'}})
                alert("Game has been added!")
                console.log(value.body);
            })
        }
    ```
* Deleting a game from a collection
 ```
    const allButtons = document.querySelectorAll('.removeGame');
    if (allButtons) {
        for (let button of allButtons) {
            button.addEventListener('click', async (event) => {
                const gameId = event.target.parentElement.id;
                const collectionId = document.querySelector(".collectionName").id;
                const value = await fetch(`/api/collections/${collectionId}/games`, { method: 'DELETE', body: JSON.stringify({ gameId }), headers: { 'Content-Type': 'application/json' } });
                const row = document.getElementById(gameId);
                row.remove();
                alert("Game has been deleted!");
            })
        }
    }
```

## Database Structure
![image](https://user-images.githubusercontent.com/76127850/131228440-cc5b362f-327c-4c05-acc4-5df784769fd3.png)


