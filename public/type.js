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
    const changeContentButton = document.getElementById("change-content-button");

    let paragraphs = contentSets[0]; // Default content set
    let currentSetIndex = 0; // Tracks the current set of paragraphs
    let currentParagraph = 0; // Index of the current paragraph
    let index = 0; // Index of the current character
    let isErasing = false; // Flag for typing or erasing
    let typingTimeout; // Timeout to control the typing/erasing process
    let isAnimating = false; // Flag to prevent overlapping animations

    // Reset the animation state
    function resetAnimation() {
        clearTimeout(typingTimeout); // Clear any pending timeouts
        textElement.textContent = ""; // Clear the text
        index = 0; // Reset the character index
        currentParagraph = 0; // Start from the first paragraph
        isErasing = false; // Reset erasing state
        isAnimating = false; // Reset animation flag
    }

    // Typing function with erasing behavior
    function type() {
        if (currentParagraph >= paragraphs.length) {
            currentParagraph = 0; // Reset to first paragraph after the last one
        }

        const currentText = paragraphs[currentParagraph];

        if (!isErasing) {
            if (index < currentText.length) {
                textElement.textContent += currentText.charAt(index); // Add next character
                index++;
            } else {
                // After typing the whole paragraph, start erasing after a short delay
                isErasing = true;
            }
        } else {
            if (index > 0) {
                textElement.textContent = currentText.substring(0, index - 1); // Erase one character
                index--;
            } else {
                // Once the paragraph is erased, move to the next one
                currentParagraph++;
                isErasing = false;
            }
        }
    }

    // Start the animation from the first paragraph
    function startInitialAnimation() {
        resetAnimation(); // Reset the animation state
        isAnimating = true; // Mark the animation as started

        typingTimeout = setInterval(() => {
            type(); // Call type/erase logic every interval
            if (currentParagraph >= paragraphs.length && index === 0) {
                clearInterval(typingTimeout); // Stop the interval once all paragraphs are erased
                setTimeout(() => {
                    startInitialAnimation(); // Restart animation from the first paragraph
                }, 500); // Delay before restarting
            }
        }, 100); // Control typing/erasing speed (100ms interval)
    }

    // Change content when the button is clicked
    function changeContent() {
        console.log("Change content clicked");

        if (isAnimating) {
            resetAnimation(); // Stop the current animation immediately
        }

        // Switch to the next content set
        currentSetIndex = (currentSetIndex + 1) % contentSets.length; // Switch content set
        paragraphs = contentSets[currentSetIndex]; // Update paragraphs to the new set
        currentParagraph = 0; // Start from the first paragraph
        index = 0; // Reset character index
        startInitialAnimation(); // Start animation with the new content
    }

    // Add event listener to the button for content change
    //changeContentButton.addEventListener("click", changeContent);
    document.getElementById('lang').addEventListener('click', changeContent);
    // Start the initial animation when the page is loaded
    startInitialAnimation();
});
