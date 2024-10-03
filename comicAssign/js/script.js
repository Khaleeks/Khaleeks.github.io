$(document).ready(function () {
    const page5 = $("#page5");

    // Array of images stored in the 'images/' folder
    const images = [
        'images/image1.jpg',
        'images/image2.jpg',
        'images/image3.jpg',
        'images/image4.jpg',
        'images/image5.jpg'
    ]; 

    // Function to handle the button click and add images
    $("#addImagesBtn").click(function () {
        console.log("Button clicked!"); // Log to ensure button is clicked

        // Create a new image element
        const newImage = $('<img>');

        // Select a random image from the array
        const randomIndex = Math.floor(Math.random() * images.length);
        newImage.attr("src", images[randomIndex]); // Set the image source to a random image
        newImage.addClass("overlay-image");

        // Set random positions within the page5 section
        const randomX = Math.random() * (page5.width() - 100); // Image width is 100px
        const randomY = Math.random() * (page5.height() - 100); // Image height is 100px

        // Position the image
        newImage.css({
            left: `${randomX}px`,
            top: `${randomY}px`,
            position: 'absolute'
        });

        // Append the new image to page5
        page5.append(newImage);
    });
});
