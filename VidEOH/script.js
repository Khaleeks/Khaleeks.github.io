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

    // Create the audio element for the sound to play on typing animation
    const typingSound = new Audio("sounds/typing-sound.wav");  

    // YouTube Video URLs
    const videos = {
        intro: "https://www.youtube.com/embed/OHMDIj9AL8Y?autoplay=1",
        story1: "https://www.youtube.com/embed/d_kx_VJjEUw?autoplay=1",
        story2: "https://www.youtube.com/embed/js1Wmds7br4?autoplay=1",
        story3: "https://www.youtube.com/embed/OHMDIj9AL8Y?autoplay=1",
        finale: "https://www.youtube.com/embed/d_kx_VJjEUw?autoplay=1",
    };

    let watchedStories = new Set();

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
    consoleText(['The Principals Secret.', 'Choose Your Own Adventure', 'Khaleeqa, Yerk, Ghaya, Tosshi.'], 'text', ['tomato', 'rebeccapurple', 'lightblue']);
    // You can call this function as needed elsewhere in the script

    // Step 1: Play the intro video
    playButton.addEventListener("click", () => {
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
        }, 5000); // Adjust based on intro video duration
    });

    // Step 2: Story Buttons Logic
    Object.keys(storyButtons).forEach((key) => {
        storyButtons[key].addEventListener("click", () => {
            choiceButtons.style.display = "none"; // Hide choices while watching
            iframeElement.src = videos[`story${key}`];
            watchedStories.add(key);

            // Check if all stories are watched
            setTimeout(() => {
                if (watchedStories.size === 3) {
                    finalButton.style.display = "block"; // Show finale button
                } else {
                    choiceButtons.style.display = "block"; // Show choices again
                }
            }, 5000); // Adjust based on story video duration
        });
    });

    // Step 3: Play the final video
    finalButton.addEventListener("click", () => {
        finalButton.style.display = "none";
        iframeElement.src = videos.finale;

        // Show replay button after final video
        setTimeout(() => {
            replayButton.style.display = "block";
        }, 5000); // Adjust based on finale video duration
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
});
