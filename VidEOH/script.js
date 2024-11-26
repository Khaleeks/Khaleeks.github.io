document.addEventListener("DOMContentLoaded", () => {
    const playButton = document.getElementById("play-button");
    const startScreen = document.getElementById("start-screen");
    const videoContainer = document.getElementById("video-container");
    const iframeElement = document.getElementById("adventure-video");
    const choiceButtons = document.querySelector(".choice-buttons");
    const storyButtons = {
        1: document.getElementById("btn-story-1"),
        2: document.getElementById("btn-story-2"),
        3: document.getElementById("btn-story-3"),
    };
    const finalButton = document.getElementById("final-button");
    const replayButton = document.getElementById("replay-button");
    const consoleTextElement = document.getElementById("console-text");
    const consoleUnderscore = document.getElementById("console-underscore");
    const canvas = document.getElementById("spray-canvas");
    const ctx = canvas.getContext("2d");
    const sprayCan = document.getElementById("spray-can");
    const typingSound = new Audio("sounds/typing-sound.wav");  

    // YouTube Video URLs
    const videos = {
        intro: "https://www.youtube.com/embed/DDfwtLbAIWI?si=pti6qfMJZ10psOIE",
        story1: "https://www.youtube.com/embed/2yZQdGJVUu8?si=atOHbs5xlvtgl4Mh" ,
        story2: "https://www.youtube.com/embed/wRv8tYrBMUo?si=UwC4TDsQxdmqkYcE" ,
        story3: "https://www.youtube.com/embed/gbo39u9V29A?si=mTpED2f0zhISfy1Z",
        finale: "https://www.youtube.com/embed/Wt7SdwxHNg0?si=Y5hVbgbNNpH6WqRC" ,
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;  

    let mouseX = 0;
    let mouseY = 0;
    let particles = [];
    let sprayCanVisible = false;
    let sprayCanShown = false;

    let watchedStories = new Set();
     // Function to update spray can position based on mouse position
    function updateSprayCanPosition(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    sprayCan.style.left = `${mouseX - sprayCan.width / 2}px`;
    sprayCan.style.top = `${mouseY - sprayCan.height / 2}px`;
    }


    // Function to show the spray can after a delay
// function showSprayCan() {
//     if (sprayCanShown) return; // Prevent showing it again if it has already been shown

//     // Show the spray can
//     sprayCan.style.display = 'block';
//     sprayCanVisible = true;
//     sprayCanShown = true; // Mark the spray can as shown

//     // Display the instruction message
//     const message = document.createElement('div');
//     message.id = 'sprayMessage';
//     message.textContent = 'Press mouse to spray paint';
//     message.style.position = 'fixed';
//     message.style.top = '10%';
//     message.style.left = '50%';
//     message.style.transform = 'translateX(-50%)';
//     message.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
//     message.style.color = 'white';
//     message.style.padding = '10px 20px';
//     message.style.borderRadius = '5px';
//     message.style.fontSize = '18px';
//     message.style.zIndex = '1000';
//     document.body.appendChild(message);

//     // Remove the spray can and the message after 15 seconds
//     setTimeout(() => {
//         sprayCan.style.display = 'none';
//         sprayCanVisible = false;

//         // Remove the message from the screen
//         document.body.removeChild(message);
//     }, 15000); // Spray can and message disappear after 15 seconds
// }


    function drawSpray(event) {
        if (event.buttons !== 1) return; // Ensure the left mouse button is held down
        
        // Create a new spray particle with a timestamp
        const particle = {
            x: mouseX,
            y: mouseY,
            color: 'rgba(255, 0, 0, 0.5)',
            timestamp: Date.now(), // Store the creation time of the particle
        };
        
        // Add the particle to the particles array
        particles.push(particle);
    }

    function updateParticles() {
        const currentTime = Date.now();
        
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Loop through particles and draw them
        particles.forEach((particle, index) => {
            // If the particle is older than 2 seconds, remove it
            if (currentTime - particle.timestamp > 2000) {
                particles.splice(index, 1); // Remove the particle from the array
            } else {
                // Draw the particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, 10, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
            }
        });
    }
    
 // Add event listener for mouse movement
document.addEventListener('mousemove', (event) => {
    updateSprayCanPosition(event); // Update spray can position
    if (!sprayCanVisible) {
        setTimeout(showSprayCan, 36000); // Show the spray can after 3 seconds
    }
    drawSpray(event); // Draw spray effect
});

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') { // Check if space bar is pressed
        drawSpray(); // Draw spray effect when space bar is pressed
    }
});

// Set an interval to update the particles every 50 milliseconds
setInterval(updateParticles, 10);

    function consoleText(words, id, colors) {
        if (colors === undefined) colors = ['#fff']; // Default color if none is provided
        
        let visible = true;
        let con = document.getElementById('console'); // Console container for the underscore
        let letterCount = 1;
        let x = 1;
        let waiting = false;
        let target = document.getElementById(id); // Target where the text will be typed
        target.setAttribute('style', 'color:' + colors[0]); // Set initial color of text
    
        window.setInterval(function() {
            if (letterCount === 0 && !waiting) {
                waiting = true;
                target.innerHTML = words[0].substring(0, letterCount); // Clear text
                window.setTimeout(function() {
                    // Cycle to next word and color
                    let usedColor = colors.shift();
                    colors.push(usedColor); // Recycle color to the back of the array
                    let usedWord = words.shift();
                    words.push(usedWord); // Recycle word to the back of the array
    
                    x = 1; // Reset the letter count direction (to typing)
                    target.setAttribute('style', 'color:' + colors[0]); // Change text color
                    letterCount += x; // Start typing the next word
                    waiting = false;
                }, 1000); // Delay before typing next word
            } else if (letterCount === words[0].length + 1 && !waiting) {
                waiting = true;
                window.setTimeout(function() {
                    x = -1; // Reverse typing direction (backspacing)
                    letterCount += x;
                    waiting = false;
                }, 1000); // Delay before backspacing
            } else if (!waiting) {
                target.innerHTML = words[0].substring(0, letterCount);
                letterCount += x; // Increment or decrement letterCount based on direction
    
                // Only play the typing sound if it is not disabled
                if (!typingSound.disabled) {
                    typingSound.play();
                }
            }
        }, 120); // Speed of typing (120ms per letter)
    
        // Blinking underscore effect
        window.setInterval(function() {
            if (visible) {
                con.className = 'console-underscore hidden'; // Hide the underscore
                visible = false;
            } else {
                con.className = 'console-underscore'; // Show the underscore
                visible = true;
            }
        }, 400); // Blink every 400ms
    }
    

    // Usage example: Start typing animation with three strings and color cycling
    consoleText(['The Desperate Students of Saadiyat Island', 'An Interactive Film', 'Khaleeqa, Yerk, Ghaya, Tosshi.'], 'text', ['tomato', 'rebeccapurple', 'lightblue']);
    // You can call this function as needed elsewhere in the script

    // Step 1: Play the intro video
    playButton.addEventListener("click", () => {
         fancyTransition(startScreen, videoContainer);
         videoContainer.classList.add("active");
        startScreen.style.display = "none";
        videoContainer.style.display = "block";
        iframeElement.src = videos.intro;

        // Stop the typing sound when the play button is clicked
        typingSound.pause(); // Pause the sound
        typingSound.currentTime = 0; // Reset to the start
        typingSound.disabled = true;

        // Show choices after intro video duration
        setTimeout(() => {
            choiceButtons.style.display = "block";
        }, 35000); // Adjust based on intro video duration
    });

    // Step 2: Story Buttons Logic (Grouped)
Object.keys(storyButtons).forEach((key) => {
    storyButtons[key].addEventListener("click", () => {
        choiceButtons.style.display = "none"; // Hide choices while watching
        iframeElement.src = videos[`story${key}`]; // Dynamic video selection based on button key
        watchedStories.add(Number(key)); // Add the story to the watched set (convert key to number)

        // Check if all stories are watched
        setTimeout(() => {
            if (watchedStories.size === 3) {
                setTimeout(() => {
                    finalButton.style.display = "block"; // Show the finale button after 45 seconds
                }, 5000); // 45 seconds delay
            } else {
                choiceButtons.style.display = "block"; // Show choices again
            }
        }, 45000); // Adjust based on story video duration
    });
});
    // Step 3: Play the final video
    finalButton.addEventListener("click", () => {
        finalButton.style.display = "none";
        iframeElement.src = videos.finale;

        // Show replay button after final video
        setTimeout(() => {
            replayButton.style.display = "block";
        }, 21000); // Adjust based on finale video duration
    });

    // Step 4: Replay the story from the beginning
    replayButton.addEventListener("click", () => {
        // Hide replay button and reset all elements to start
        replayButton.style.display = "none";
        finalButton.style.display = "none";
        choiceButtons.style.display = "none";
        watchedStories.clear(); // Clear the watched stories

        // Go back to the intro screen
        startScreen.style.display = "block";
        videoContainer.style.display = "none";
        iframeElement.src = ""; // Clear the video source

        // Reset console animation for replay
        consoleTextElement.textContent = "";
        consoleUnderscore.style.visibility = "hidden";
        setTimeout(() => {
            typeText("Choose Your Own Adventure", consoleTextElement);
        }, 500); // Restart animation
    });

    function fancyTransition(fromScreen, toScreen) {
        // Add twisting animation to the current screen
        fromScreen.classList.add('twist-out');
    
        // Wait for the twist-out animation to complete
        setTimeout(() => {
            // Hide the current screen
            fromScreen.style.display = 'none';
            fromScreen.classList.remove('twist-out');
    
            // Show the next screen with a swirl-in animation
            toScreen.style.display = 'block';
            toScreen.classList.add('swirl-in');
    
            // Remove the swirl-in class after animation completes
            setTimeout(() => {
                toScreen.classList.remove('swirl-in');
            }, 1500); // Match the duration of the swirl-in animation
        }, 1500); // Match the duration of the twist-out animation
    }
}); 