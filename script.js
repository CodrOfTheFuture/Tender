// Get the card element
const card = document.getElementById('card');
// Variable to store the original X position of the card
let originalX = 0;
// Variable to store the animation frame ID
let animationFrameId;

// Event listeners for keydown and keyup events
document.addEventListener('keydown', startDrag);
document.addEventListener('keyup', endDrag);

// Function to start dragging when arrow keys are pressed
function startDrag(e) {
    // Check if left or right arrow key is pressed
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        // Get the current X position of the card
        originalX = parseFloat(card.style.transform.replace(/[^\d.-]/g, '')) || 0;
        // Start the dragging animation
        animationFrameId = requestAnimationFrame(() => {
            drag(e.key);
        });
    }
}

// Function to handle dragging
function drag(key) {
    // Set the amount to move based on the arrow key pressed
    let offsetX = 0;
    if (key === 'ArrowLeft') {
        offsetX = -2; // Adjust the speed as needed
    } else if (key === 'ArrowRight') {
        offsetX = 2; // Adjust the speed as needed
    }
    // Calculate the new X position
    const newX = originalX + offsetX;
    // Move the card to the new position
    card.style.transform = `translateX(${newX}px)`;
    // Continue the dragging animation
    animationFrameId = requestAnimationFrame(() => {
        drag(key);
    });
}

// Function to end dragging
function endDrag(e) {
    // Check if left or right arrow key is released
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        // Cancel the animation frame
        cancelAnimationFrame(animationFrameId);
        // Return the card to its original position
        returnToOriginalPosition();
    }
}

// Function to return the card to its original position after dragging
function returnToOriginalPosition() {
    // Get the current X position of the card
    const currentX = parseFloat(card.style.transform.replace(/[^\d.-]/g, '')) || 0;
    // Duration of the transition in milliseconds
    const transitionDuration = 300;
    // Number of steps for the transition
    const steps = 30;
    // Amount to move per step
    const stepX = (originalX - currentX) / steps;
    let stepCount = 0;

    // Function to animate the return to original position
    function animateReturn() {
        if (stepCount < steps) {
            const newX = currentX + stepX;
            card.style.transform = `translateX(${newX}px)`;
            stepCount++;
            // Continue the animation
            requestAnimationFrame(animateReturn);
        } else {
            // Ensure exact position at the end of the animation
            card.style.transform = `translateX(${originalX}px)`;
        }
    }

    // Start the animation
    animateReturn();
}
