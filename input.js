let inputDirection = { x: 0, y: 0 }
let lastInputDirection = {x: 0, y: 0}

// set up the code for modifying this input direction, whenever we click a key
window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (lastInputDirection.y !== 0) break // if moving up or down, ignore the y value input to not let the snake inverse
            inputDirection = { x: 0, y: -1 }
            break
        case 'ArrowDown':
            if (lastInputDirection.y !== 0) break
            inputDirection = { x: 0, y: 1 }
            break
        case 'ArrowLeft':
            if (lastInputDirection.x !== 0) break // if moving left or right, ignore the x value input to not let the snake inverse
            inputDirection = { x: -1, y: 0 }
            break
        case 'ArrowRight':
            if (lastInputDirection.x !== 0) break
            inputDirection = { x: 1, y: 0 }
            break
    }
})

export function getInputDirection() {
    // make sure the snake cant go to the inverse direction
    lastInputDirection = inputDirection
    return inputDirection
}