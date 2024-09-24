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

// Function to create and position the image
function createImage(id) {
    const img = document.createElement('img');
    img.src = imageMap[id]; // Set the image source
    img.alt = `${id} Image`; // Set alt text
    img.style.position = 'absolute';
    img.style.pointerEvents = 'none'; // Ensure the image doesn't interfere with mouse events
    img.style.display = 'none'; // Hide initially
    document.body.appendChild(img);
    return img;
}

// Object to store image elements
const images = {};

// Function to add hover functionality
function addHoverEffects() {
    for (const id in imageMap) {
        const svgElement = document.getElementById(id);
        if (svgElement) {
            images[id] = createImage(id); // Create image for this ID

            svgElement.addEventListener('mouseover', () => {
                const img = images[id];
                img.style.display = 'block'; // Show image on hover
                const bbox = svgElement.getBBox();
                img.style.left = `${bbox.x + 10}px`; // x position
                img.style.top = `${bbox.y - 30}px`; // y position
            });

            svgElement.addEventListener('mouseout', () => {
                const img = images[id];
                img.style.display = 'none'; // Hide image when not hovering
            });
        }
    }
}

// Call the function to add hover effects
addHoverEffects();