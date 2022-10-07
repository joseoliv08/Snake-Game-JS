import { getInputDirection } from "./input.js"

export const SNAKE_SPEED = 5 // how many times the snake moves per second
// A snake is basically a bunch of different segments that are all in a particular X,Y position on the grid
const snakeBody = [{ x: 11, y: 11 }] // to draw it n the center
// new segments added to the snake when it eats the food
let newSegments = 0


// Update the snake and food, also if we lost 
export function update() {
    addSegments()

    const inputDirection = getInputDirection()
    for (let i = snakeBody.length - 2; i >= 0; i--) { // use of for loop because we only want to loop through every segment except last one, because will basically diseppear when moving
        // last element will be set as the element i (middle one) because it will be their next position
        snakeBody[i + 1] = { ...snakeBody[i] } // shifting snake position by one
    }

    // update the snakes head based where we are moving
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

// Draw the snake or food when some event happens
export function draw(gameBoard) {
    snakeBody.forEach( segment => { // wanna loop through each one of our diferent segments/ piece of the snake we want to loop through
        const snakeElement = document.createElement('div') // its going inside our gameboard and add a particular XY coordinate
        snakeElement.style.gridRowStart = segment.y // setting X coordinate
        snakeElement.style.gridColumnStart = segment.x // setting Y coordinate
        snakeElement.classList.add('snake') // this snakeElement will have the same styling as the class snake in order to see it on gameboard
        gameBoard.appendChild(snakeElement) // append the snakeElement to the game board to be visible
    })
}

export function expandSnake(amount) {
    newSegments += amount
}

export function onSnake(position, {ignoreHead = false} = {}) {
    return snakeBody.some((segment, index) => { // for each one of our segments we will check if its on our snake // compare our 'position' with our 'segment' to see if they are equal
        if (ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
}

export function getSneakHead() {
    return snakeBody[0]
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], {ignoreHead: true})
}

function equalPositions(pos1, pos2) {
    return (
        pos1.x === pos2.x && pos1.y === pos2.y
    )
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        // basically we are taking the last element of our snake and duplicating that element to the end of our snake
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] }) // will append a new element on to the end of the snake
    }

    newSegments = 0 // to prevent allways adding one more while moving
}