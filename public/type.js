document.addEventListener("DOMContentLoaded", () => {
    const contentSets = [
        [
            "Hello, I'm Artur",
            "I'm a mechanic and a programmer",
            "Feel free to explore my portfolio"
        ],
        [
            "Witam, mam na imię Artur",
            "Jestem mechanikiem i programistą",
            "Zapraszam do mojego portfolio"
        ]
    ];

    const textElement = document.getElementById("text");
    //const changeContentButton = document.getElementById("change-content-button");

    let paragraphs = contentSets[0]; // Default content set
    let currentSetIndex = 0; // Tracks the current set of paragraphs
    let currentParagraph = 0; // Index of the current paragraph
    let index = 0; // Index of the current character
    let isErasing = false; // Flag for typing or erasing
    let typingTimeout; // Timeout to control the typing/erasing process
    let isAnimating = false; // Flag to prevent overlapping animations
    let isTypingComplete = false; // Track if typing is complete

    // Reset the animation state
    function resetAnimation() {
        clearTimeout(typingTimeout); // Clear any pending timeouts
        textElement.textContent = ""; // Clear the text
        index = 0; // Reset the character index
        currentParagraph = 0; // Start from the first paragraph
        isErasing = false; // Reset erasing state
        isAnimating = false; // Reset animation flag
        isTypingComplete = false; // Reset typing completion flag
    }

    // Function for typing a single paragraph
    function typeParagraph() {
        const currentText = paragraphs[currentParagraph];

        if (index < currentText.length) {
            textElement.textContent += currentText.charAt(index); // Add next character
            index++;
        } else {
            // After typing the whole paragraph, mark typing as complete
            isTypingComplete = true;

            // After a delay, start erasing
            setTimeout(() => {
                if (isTypingComplete) {
                    isErasing = true; // Start erasing once typing is complete
                }
            }, 1000); // Delay before erasing starts
        }
    }

    // Function for erasing a paragraph
    function eraseParagraph() {
        const currentText = paragraphs[currentParagraph];

        if (index > 0) {
            textElement.textContent = currentText.substring(0, index - 1); // Erase one character
            index--;
        } else {
            // Once the paragraph is erased, move to the next one
            currentParagraph++;
            isErasing = false; // Reset the erasing state
            isTypingComplete = false; // Reset the typing flag

            // Stop erasing after the third paragraph is complete
            if (currentParagraph === paragraphs.length) {
                isAnimating = false; // Stop animation after the last paragraph
            }
        }
    }

    // Function to start the typing animation for the current set
    function startInitialAnimation() {
        if (isAnimating) return; // Prevent overlapping animations

        resetAnimation(); // Reset the animation state
        isAnimating = true; // Mark the animation as started

        function typeEraseLoop() {
            if (isErasing && currentParagraph < 2) {
                // Erase paragraphs except the third one
                eraseParagraph();
            } else if (!isErasing) {
                // Type paragraphs
                typeParagraph();
            }

            // Continue typing/erasing until the current paragraph is fully handled
            if (currentParagraph < paragraphs.length) {
                typingTimeout = setTimeout(typeEraseLoop, 100); // Loop every 100ms
            } else {
                // Reset after the last paragraph is fully typed and erased
                setTimeout(() => {
                    isAnimating = false;
                    // The animation stops after the last paragraph is typed without erasing it
                }, 500); // Delay before finishing the animation
            }
        }

        // Start the type/erase loop
        typeEraseLoop();
    }

    // Change content when the button is clicked
    function changeContent() {
        console.log("Change content clicked");

        // Reset the animation and start over
        resetAnimation();
        
        // Switch to the next content set
        currentSetIndex = (currentSetIndex + 1) % contentSets.length; // Switch content set
        paragraphs = contentSets[currentSetIndex]; // Update paragraphs to the new set
        currentParagraph = 0; // Start from the first paragraph
        index = 0; // Reset character index

        // Start the animation with the new content
        startInitialAnimation();
    }

    // Add event listener to the button for content change
    //changeContentButton.addEventListener('click', changeContent);
    document.getElementById('lang').addEventListener('click', changeContent);

    // Start the initial animation when the page is loaded
    startInitialAnimation();
});
