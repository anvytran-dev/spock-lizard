//Rock, Paper, Scissors, Lizard, Spock using es6 and served by a simple node server (http module), no peaking at your past R,P,S code and push to Github.

//These variables store the modules that we need to use. 
const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet');

var PORT = process.env.PORT || 8000;

class Game {
    constructor(playerPerson, playerComputer) {

        this.playerPerson = playerPerson
        this.playerComputer = playerComputer
        this.playerComputerChoice = null
        this.currentState = 'continue'
        this.winner = null
        this.score = 0
        
    }

    getCurrentState() {

        return this.currentState;
    }

    setCurrentState() {

        return this.currentState;
    }

    increaseScore() {
        
        this.score++
    }


    getRandomizedComputerChoice() {

        let randomNumber = Math.random()

        if(randomNumber <= 0.2) {
            return this.playerComputerChoice = 'rock'
        } else if (randomNumber <= 0.4) {
            return this.playerComputerChoice = 'paper'
        } else if (randomNumber <= 0.6) {
            return this.playerComputerChoice = 'scissors'
        } else if (randomNumber <= 0.7) {
            return this.playerComputerChoice = 'lizard'
        } else if (randomNumber <= 1) {
            return this.playerComputerChoice = 'spock'
        }
    }
}

class Player{
    constructor(name) {
        this.name = name
        this.score = 0
    }
}

let playerHuman = new Player('player1')
let playerCPU = new Player('playerCPU')

let rpsls = new Game(playerHuman, playerCPU);

let winningArrays = [

    ['rock', 'scissors', 'lizard'],
    ['paper','rock', 'spock'],
    ['scissors', 'paper', 'lizard'],
    ['lizard', 'paper', 'spock'],
    ['spock', 'rock', 'scissors']

]

function checkWinner(userChoice) {

    let computerChoice = rpsls.getRandomizedComputerChoice()
    console.log(computerChoice)

    for(winArr of winningArrays) {

        if(userChoice === winArr[0] && (computerChoice === winArr[1] || computerChoice === winArr[2])) {

            return [userChoice, computerChoice, 'playerHuman']

            //return {player: userChoice, computer: computerChoice, winner: 'playerHuman'}

        } else if (userChoice === computerChoice) {

            return [userChoice, computerChoice, 'draw']

        } else if (userChoice === winArr[0] && (computerChoice != winArr[1] || computerChoice != winArr[2])) {

            return [userChoice, computerChoice, 'playerComputer']
        }
        
    } 

}

//The function expression creates the server. 

const server = http.createServer(function(req, res) {

//The 'page' variable contains the path of the url--the string after the host name and before the query. 

    const page = url.parse(req.url).pathname; 

    //https:localhost8000/ --> page === "/"

    const params = querystring.parse(url.parse(req.url).query); 

    //https:localhost8000/api?word=cat -> {word:cat}

    if(page === "/") {

        fs.readFile('index.html', function(err, data) {

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });

    } else if (page === '/api') {


        const array = checkWinner(params['choice']) 

        const resultToJson = {

            choiceHuman: array[0], //rock

            choiceComputer : array[1], //scissors

            winner: array[2] //human
            
            
        }

        console.log(resultToJson)


        res.writeHead(200, {'Content-Type' : 'application/json'});


        res.write(JSON.stringify(resultToJson)); 

        res.end()

    } else if (page === '/css/style.css') {

        fs.readFile('css/style.css', function(err, data) {

            res.write(data);
            res.end();
        });

    } else if (page === '/pic/bg.jpeg') {

        fs.readFile('pic/bg.jpeg', function(err, data) {

            res.write(data);
            res.end();

        }); 

    } else if (page === '/pic/lizard.png') {

        fs.readFile('pic/lizard.png', function(err, data) {

            res.write(data);
            res.end();

        }); 

    } else if (page === '/pic/paper.png') {

        fs.readFile('pic/paper.png', function(err, data) {

            res.write(data);
            res.end();

        }); 

    } else if (page === '/pic/rock.png') {

        fs.readFile('pic/rock.png', function(err, data) {

            res.write(data);
            res.end();

        }); 

    } else if (page === '/pic/scissors.png') {

        fs.readFile('pic/scissors.png', function(err, data) {

            res.write(data);
            res.end();

        }); 

    } else if (page === '/pic/spock.jpeg') {

        fs.readFile('pic/spock.jpeg', function(err, data) {

            res.write(data);
            res.end();

        }); 

    } else if (page === '/css/normalize.css') {

        fs.readFile('css/normalize.css', function(err, data) {

            res.write(data);
            res.end();
        });

    } else if (page === '/pic/bg.png') {

        fs.readFile('pic/bg.png', function(err, data) {

            res.write(data);
            res.end();

        });

    } else if (page === '/js/main.js') {

        fs.readFile('js/main.js', function(err, data) {

            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.write(data);
            res.end();

        });

    } else {

        figlet('404!!', function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            res.write(data);
            res.end();
          });
    }
});

server.listen(PORT);



