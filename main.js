import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSneakHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

// currentTime is the exact timestamp of when this function runs
// We want to recall this main function imediatly so that we set another loop that is going to happen next
// This function is going to loop over and over again
function main(currentTime) {
    if (gameOver) {
        if (confirm('You Lost! Press "Ok" to restart the game.')) {
            window.location = '/' // allows to refresh the page
        }
        return 
    }


    window.requestAnimationFrame(main) // wait for browser to tell when to request for the next frame, and when that frame renders, tell us the currentTime 
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return // if the time since last rendered is less then 0.5, we dont need to move
    

    lastRenderTime = currentTime


    update()
    draw()
}

window.requestAnimationFrame(main)

// Update the snake and food, also if we lost 
function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

// Draw the snake or food when some event happens
function draw() {
    gameBoard.innerHTML = '' // will clear everything in our view, and when updating the snake it will move and not add just another square
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSneakHead()) || snakeIntersection()
}