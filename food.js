import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'

let food = getRandomFoodPosition() 
const EXPANSION_RATE = 2

// Update the snake and food, also if we lost 
export function update() {
    // if this function that has a parameter (food coordinates) is on our snake, returns true
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE)
        // change food position
        food = getRandomFoodPosition()
    }
}

// Draw the snake or food when some event happens
export function draw(gameBoard) {
        const foodElement = document.createElement('div') // its going inside our gameboard and add a particular XY coordinate
        foodElement.style.gridRowStart = food.y // setting X coordinate
        foodElement.style.gridColumnStart = food.x // setting Y coordinate
        foodElement.classList.add('food') // this snakeElement will have the same styling as the class snake in order to see it on gameboard
        gameBoard.appendChild(foodElement) // append the snakeElement to the game board to be visible
}

function getRandomFoodPosition() {
    let newFoodPosition
    // whatever our food is null or the food is on the snake already -> get new food position 
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}