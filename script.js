// Get the image and counter elements
const image = document.getElementById('heart');
const counter = document.getElementById('counter');

// Initialize the counter value
let count = 0;

// Create an array to hold references to the emoji elements
let emojis = [];

// Add a click event listener to the image
image.addEventListener('click', () => {
    count++; // Increment the counter
    counter.textContent = count; // Update the counter display

    // Show message and confetti every 10 clicks
    if (count % 10 == 0) {
        let message = document.getElementById('click-message');
    
        if (!message) {
            message = document.createElement('p');
            message.id = 'click-message';
            document.body.appendChild(message);
        }
    
        // Update message dynamically based on the count
        message.textContent = `You clicked the heart ${count} times! Keep going!`;
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });
    }

    // Display emojis every 50 clicks
    if (count % 50 === 0) {
        for (let i = 0; i < 100; i++) {
            const emoji = document.createElement('div');
            emoji.textContent = String.fromCodePoint(0x1F9E1); // Emoji character
            emoji.style.position = 'absolute';
            emoji.style.left = Math.random() * window.innerWidth + "px";
            emoji.style.top = Math.random() * window.innerHeight + "px";
            emoji.style.fontSize = "2rem";
            emoji.style.opacity = "0.8"; // Set transparency

            // Store the reference of the emoji in the emojis array
            emojis.push(emoji);

            document.body.appendChild(emoji);
        }
    }

    // Show a message when 100 clicks are reached
    if (count === 100) {
        const bigMessage = document.createElement('h1');
        bigMessage.textContent = "100 Clicks! You're Amazing!";
        bigMessage.style.position = 'fixed';
        bigMessage.style.top = '50%';
        bigMessage.style.left = '50%';
        bigMessage.style.transform = 'translate(-50%, -50%)';
        bigMessage.style.color = 'gold';
        bigMessage.style.fontSize = '3rem';
        bigMessage.style.textAlign = 'center';
        bigMessage.style.zIndex = '1000';
        document.body.appendChild(bigMessage);
    
        // Remove the message after 3 seconds
        setTimeout(() => {
            bigMessage.remove();
        }, 3000);

        // Show alert and reset after user clicks OK
        setTimeout(() => {
            alert("You've reached the maximum number of clicks! Counter will be reset.");
            resetEverything(); // Reset everything after the alert is dismissed
        }, 3000); // Wait for 3 seconds before alert
    }
});

// Function to reset everything
function resetEverything() {
    // Reset counter
    count = 0;
    counter.textContent = count;

    // Remove all the stored emoji elements
    emojis.forEach(emoji => emoji.remove());
    emojis = []; // Clear the emojis array

    // Remove any messages (e.g., bigMessage and click-message)
    const message = document.getElementById('click-message');
    if (message) {
        message.remove();
    }

    const bigMessage = document.querySelector('h1');
    if (bigMessage) {
        bigMessage.remove();
    }
}
