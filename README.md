# Hangman
This simple, yet addictive Hangman game is built with **.NET Core 8 with MVC architecture** and **Razor** views. Much of the game logic and functionality uses **Javascript**. I challenge you to give it a try! It's quite fun and is mobile friendly too.<br/> 

### Technologies
![.NET 8](https://img.shields.io/badge/.NET%208-000)
![Javascript](https://img.shields.io/badge/Javascript-06b6d4)
![HTML5](https://img.shields.io/badge/HTML5-green)
![CSS3](https://img.shields.io/badge/CSS3-3178c6)
![Bootstrap](https://img.shields.io/badge/Bootstrap%205-339933)

## Table of Contents
- [Description](#description)
- [Rules of Game](#rules-of-game)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

## Description
Hangman is a guessing game for two or more players. One player thinks of a word, phrase, or sentence and the other(s) tries to guess it by suggesting letters or numbers within a certain number of guesses. Originally a paper-and-pencil game, obviously we have online versions now. My version automatically chooses a secret word for the user to guess from a **list of 100 words** and simply lets the user know the number of letters in the word. See image below.<br/><br/>
![Hangman number of letters in secret word screenshot](https://imagestore-production.up.railway.app/images/hangman/hangman-wordlength.png)

## Rules of Game
The word to guess is represented by a row of dashes representing each letter or number of the word. If the guessing player suggests a letter which occurs in the word, the app adds the letter in all the places where it occurs in the word (if more than one place). If the suggested letter does not occur in the word, another element is added to the hanging stick figure which brings the poor stick man closer to his death (and the player closer to losing the game)! Generally, the game ends once the word is guessed (hooray!), or if the stick figure is complete — signifying that all guesses have been used and the player loses the game.

The player guessing the word may, at any time, attempt to guess the whole word. If the word is correct, the game is over immediately and the guesser wins. Otherwise, the guesser is penalised by adding another element to the stick figure. 

## Getting Started
This project is a .NET Core MVC web application. To run it outside of Visual Studio, you'll need the **.NET Core SDK** installed on your machine (the version that is compatible with this project is **8.0**). 

1. **Get the code (cloning the repository)** - You'll first need to get the code from Github. Follow these steps from your command line interface (CLI), such as Command Prompt, Powershell or Bash:<br/>
`git clone https://github.com/evanmalherbe/Hangman.git`
2. **Navigate to project directory** - Now use the `cd` command to move into the directory that contains the project's `.csproj` file.<br/>
`cd Hangman`
3. **Restore dependencies (optional but recommended):** Run the following command to download any necessary packages and dependencies. This is often done automatically, but this makes sure everything is in place.<br/>
`dotnet restore`
4. **Run the application:** Execute the project using the `dotnet run` command. <br/>`dotnet run`
5. **Access the application:** Once the application starts, the console output will show the urls where the app is listening. Usually, it will be something like `http://localhost:5000` or `http://localhost:5001`. Open your web browser (E.g. Microsoft Edge, Google Chrome etc) and type that address into your browser address bar to use the calculator.

## Usage
Once you open the project in your browser `http://localhost:5000` (or similar), you will see the main game screen. Since the app automatically chooses a secret word from the 100 word list for the user, you can immediately start making guesses by typing a letter into the box and clicking the **Guess letter** button. See image below.<br/><br/>
![Guess a letter - screenshot](https://imagestore-production.up.railway.app/images/hangman/hangman-guess.png)

## Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement" or "bug".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License
Distributed under the **MIT License**. See **[LICENSE](LICENSE)** for more information.

## Credits
This project was created by Evan Malherbe - October 2025 - [GitHub profile](https://github.com/evanmalherbe)
