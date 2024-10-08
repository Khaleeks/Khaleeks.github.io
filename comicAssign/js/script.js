$(document).ready(function () {

    // ------------------------- Page 5 Overlay Logic -------------------------
    const page5 = $("#page5");
    const images = [
        'images/image1.jpg',
        'images/image2.jpg',
        'images/image3.jpg',
        'images/image4.jpg',
        'images/image5.jpg'
    ]; 

    const innerCircleRadius = 350; // Radius of the empty circle in the middle

    // Function to handle the button click and add images
    $("#addImagesBtn").click(function () {
        console.log("Button clicked!");

        // Create a new image element
        const newImage = $('<img>');
        
        // Select a random image from the array
        const randomIndex = Math.floor(Math.random() * images.length);
        newImage.attr("src", images[randomIndex]);
        newImage.addClass("overlay-image");

        let randomX, randomY;

        // Generate positions until we find one outside the inner circle
        do {
            randomX = Math.random() * (page5.width() - 100);
            randomY = Math.random() * (page5.height() - 100);
        } while (Math.sqrt(Math.pow(randomX - (page5.width() / 2), 2) + Math.pow(randomY - (page5.height() / 2), 2)) < innerCircleRadius);

        newImage.css({
            left: `${randomX}px`,
            top: `${randomY}px`,
            position: 'absolute',
            width: '100px',
            height: '100px'
        });

        page5.append(newImage);
    });

    // ------------------------- Page 2 Overlay Logic -------------------------
    const overlayImages2 = [
        'images/2friendsw.webp',
        'images/image3.jpg',
        'images/image1.jpg'
    ];

    let currentImageIndex2 = 0;

    function changeOverlayImage2() {
        console.log("Changing overlay image to: ", overlayImages2[currentImageIndex2]);
        $('#page2').css('--overlay-image', `url(${overlayImages2[currentImageIndex2]})`);
    }

    changeOverlayImage2();

    // Keydown event for page 2
    $('#page2').on('keydown', (event) => {
        event.preventDefault(); // Prevent default action for the key press
        console.log("Key pressed on page 2: ", event.key);

        if (event.key === 'ArrowRight') {
            console.log("Right arrow pressed on page 2");
            currentImageIndex2 = (currentImageIndex2 + 1) % overlayImages2.length;
            changeOverlayImage2();
        } else if (event.key === 'ArrowLeft') {
            console.log("Left arrow pressed on page 2");
            currentImageIndex2 = (currentImageIndex2 - 1 + overlayImages2.length) % overlayImages2.length;
            changeOverlayImage2();
        }
    });

    // ------------------------- Page 3 Overlay Logic -------------------------
    const overlayImages3 = [
        'images/3asking.webp',
        'images/image2.jpg',
        'images/image5.jpg'
    ];

    let currentImageIndex3 = 0;

    function changeOverlayImage3() {
        console.log("Changing overlay image on page 3 to: ", overlayImages3[currentImageIndex3]);
        $('#page3').css('--overlay-image', `url(${overlayImages3[currentImageIndex3]})`);
    }

    changeOverlayImage3();

    // Keydown event for page 3
    $('#page3').on('keydown', (event) => {
        event.preventDefault(); // Prevent default action for the key press
        console.log("Key pressed on page 3: ", event.key);

        if (event.key === 'ArrowRight') {
            console.log("Right arrow pressed on page 3");
            currentImageIndex3 = (currentImageIndex3 + 1) % overlayImages3.length;
            changeOverlayImage3();
        } else if (event.key === 'ArrowLeft') {
            console.log("Left arrow pressed on page 3");
            currentImageIndex3 = (currentImageIndex3 - 1 + overlayImages3.length) % overlayImages3.length;
            changeOverlayImage3();
        }
    });

    // ------------------------- Page 4 Overlay Logic -------------------------
    const overlayImages4 = [
        'images/4angry.webp',
        'images/image2.jpg',
        'images/image5.jpg'
    ];

    let currentImageIndex4 = 0;

    function changeOverlayImage4() {
        console.log("Changing overlay image on page 4 to: ", overlayImages4[currentImageIndex4]);
        $('#page4').css('--overlay-image', `url(${overlayImages4[currentImageIndex4]})`);
    }

    changeOverlayImage4();

    // Keydown event for page 4
    $('#page4').on('keydown', (event) => {
        event.preventDefault(); // Prevent default action for the key press
        console.log("Key pressed on page 4: ", event.key);

        if (event.key === 'ArrowRight') {
            console.log("Right arrow pressed on page 4");
            currentImageIndex4 = (currentImageIndex4 + 1) % overlayImages4.length;
            changeOverlayImage4();
        } else if (event.key === 'ArrowLeft') {
            console.log("Left arrow pressed on page 4");
            currentImageIndex4 = (currentImageIndex4 - 1 + overlayImages4.length) % overlayImages4.length;
            changeOverlayImage4();
        }
    });

 // ------------------------- Page 6 Overlay Logic  -------------------------
 const overlayImages6 = ['images/6takeover.webp', 'images/image5.jpg'];
 let currentImageIndex6 = 0;

 function changeOverlayImage6() {
     $('#page6').css('--overlay-image', `url(${overlayImages6[currentImageIndex6]})`);
 }

 changeOverlayImage6();

 $('#page6').on('keydown', (event) => {
     event.preventDefault();
     if (event.key === 'ArrowRight') {
         currentImageIndex6 = (currentImageIndex6 + 1) % overlayImages6.length;
         changeOverlayImage6();
     } else if (event.key === 'ArrowLeft') {
         currentImageIndex6 = (currentImageIndex6 - 1 + overlayImages6.length) % overlayImages6.length;
         changeOverlayImage6();
     }
 });

 // ------------------------- Page 8 Overlay Logic  -------------------------
 const overlayImages8 = ['images/8ending.webp', 'images/image5.jpg'];
 let currentImageIndex8 = 0;

 function changeOverlayImage8() {
     $('#page8').css('--overlay-image', `url(${overlayImages8[currentImageIndex8]})`);
 }

 changeOverlayImage8();

 $('#page8').on('keydown', (event) => {
     event.preventDefault();
     if (event.key === 'ArrowRight') {
         currentImageIndex8 = (currentImageIndex8 + 1) % overlayImages8.length;
         changeOverlayImage8();
     } else if (event.key === 'ArrowLeft') {
         currentImageIndex8 = (currentImageIndex8 - 1 + overlayImages8.length) % overlayImages8.length;
         changeOverlayImage8();
     }
 });
    // Set focus to the active page
    function setFocusToPage(pageId) {
        $(pageId).focus();
    }

    // Example of switching between pages (make sure to call this function when changing pages)
    function switchPage(toPageId) {
        $(".page").hide(); // Assuming you have a class `page` for all pages
        $(toPageId).show();
        setFocusToPage(toPageId);
    }
});
