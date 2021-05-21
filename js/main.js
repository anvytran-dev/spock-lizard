//Rock, Paper, Scissors, Lizard, Spock using es6 and served by a simple node server (http module), no peaking at your past R,P,S code and push to Github.

//Set Up event listeners for each of the images

let scoreHuman = 1;
let scoreComputer = 1;
let scoreDraw = 1;

const getValue = (e) => {
    let userChoice = e.target.getAttribute('value'); //rock, p, s, l, s
    
    makeRequest(userChoice);
}

document.querySelectorAll('.imgChoices').forEach(e => e.addEventListener('click', getValue))

document.querySelector('.buttonReset').addEventListener('click', resetGame)

let imageArrays = [

    ['rock', 'pic/rock.png'],
    ['paper', 'pic/paper.png'],
    ['scissors','pic/scissors.png'],
    ['lizard', 'pic/lizard.png'],
    ['spock', 'pic/spock.jpeg']
]

const getImage = (choice) => {

    for(imgArr of imageArrays) {

        if(imgArr[0] === choice) {

            return imgArr[1]
        }
    }

}

const displayUserChoiceImage = (userInput) =>  {

    document.querySelector('#summaryChoice').innerText = ""
    document.querySelector('#reportWinner').innerText = ""

    
    document.querySelector('#playerChoiceImage').setAttribute('src', getImage(userInput))
}


const makeRequest = (userInput) => {

    setTimeout(() => {displayUserChoiceImage(userInput)}, 500)

    fetch(`/api?choice=${userInput}`)

        .then(response => response.json())

        .then(data => {

            console.log(data);
            
            const displayComputerChoiceImage = () => {
                
                document.querySelector('#computerChoiceImage').setAttribute('src', getImage(data['choiceComputer']))
            
            }

            setTimeout(() => {displayComputerChoiceImage()}, 500)
            
            const humanBeatsComputer = () => {
                
                document.querySelector('#summaryChoice').innerText = data['choiceHuman'].toUpperCase() + ' beats ' + data['choiceComputer'].toUpperCase() + '.'
            }
            
            const computerBeatsHuman = () => {
            
                document.querySelector('#summaryChoice').innerText = data['choiceComputer'].toUpperCase() + ' beats ' +  data['choiceHuman'].toUpperCase() + '.'
            }

            if(data['winner'] === 'playerHuman') {

                setTimeout(() => {
                    
                    humanBeatsComputer(userInput)

                    increaseScore('human')

                    document.querySelector('#reportWinner').innerText = "You Win!"
                
                
                }, 500)

                
            
                
            } else if (data['winner'] === 'draw') {


                setTimeout(() => {
                    

                    increaseScore('draw')

                    document.querySelector('#reportWinner').innerText = "Draw!"
                
                
                }, 500)

            } 
            
            else {

                setTimeout(() => {
                    
                    computerBeatsHuman()

                    increaseScore('computer')
    
                    document.querySelector('#reportWinner').innerText = "Computer Wins!"
    
                
                
                }, 500)

            }

            
        })

}


function increaseScore(winner) {

    if(winner === 'human') {


        document.querySelector('#humanScore').innerText = scoreHuman++

    } else if (winner === 'computer') {


        document.querySelector('#computerScore').innerText = scoreComputer++
 
    } else if (winner === 'draw') {


        document.querySelector('#drawScore').innerText = scoreDraw++

    }

}

function resetGame() {

    scoreHuman = 1;
    scoreComputer = 1;
    scoreDraw = 1;

    document.querySelector('#humanScore').innerText = "0"

    document.querySelector('#computerScore').innerText = "0"

    document.querySelector('#drawScore').innerText = "0"

    document.querySelector('#summaryChoice').innerText = ""
    document.querySelector('#reportWinner').innerText = ""

    document.querySelector('#computerChoiceImage').setAttribute('src', "")

    document.querySelector('#playerChoiceImage').setAttribute('src', "")



}






