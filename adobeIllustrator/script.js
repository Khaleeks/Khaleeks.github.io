// Object mapping IDs to image paths
const imageMap = {
    "Arima": "images1/arima.jpg",
    "portOfSpain": "images1/portOfspain.jpg",
    "scarborough": "images1/scarborough.jpg",
    "chaguanas": "images1/chaguanas.jpg",
    "rioClaro": "imaages1/rioClaro.jpg",
    "sanFernando": "images1/sanFernando.jpg",
    "pointFortin": "images1/pointFortin.jpg"
};

// Function to add images to the SVG elements
function addImages() {
    for (const id in imageMap) {
        // Get the SVG element by ID
        const svgElement = document.getElementById(id);
        if (svgElement) {
            // Create an img element
            const img = document.createElement('img');
            img.src = imageMap[id]; // Set the image source
            img.alt = `${id} Image`; // Set alt text

            // Set the position of the image (modify these values as needed)
            img.style.position = 'absolute';
            img.style.left = `${svgElement.getBBox().x + 10}px`; // x position
            img.style.top = `${svgElement.getBBox().y - 30}px`; // y position

            // Append the image to the body (or to a specific container)
            document.body.appendChild(img);
        }
    }
}

// Call the function to add images
addImages();