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

    // YouTube Video URLs
    const videos = {
        intro: "https://www.youtube.com/embed/OHMDIj9AL8Y?autoplay=1",
        story1: "https://www.youtube.com/embed/d_kx_VJjEUw?autoplay=1",
        story2: "https://www.youtube.com/embed/js1Wmds7br4?autoplay=1",
        story3: "https://www.youtube.com/embed/OHMDIj9AL8Y?autoplay=1",
        finale: "https://www.youtube.com/embed/d_kx_VJjEUw?autoplay=1",
    };

    let watchedStories = new Set();

    // Step 1: Play the intro video
    playButton.addEventListener("click", () => {
        startScreen.style.display = "none";
        videoContainer.style.display = "block";
        iframeElement.src = videos.intro;

        // Show choices after intro video duration
        setTimeout(() => {
            choiceButtons.style.display = "block";
        }, 10000); // Adjust based on intro video duration
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
            }, 10000); // Adjust based on story video duration
        });
    });

    // Step 3: Play the final video
    finalButton.addEventListener("click", () => {
        finalButton.style.display = "none";
        iframeElement.src = videos.finale;

        // Show replay button after final video
        setTimeout(() => {
            replayButton.style.display = "block";
        }, 10000); // Adjust based on finale video duration
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
    });
});
