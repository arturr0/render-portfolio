const contentSets = [
[
    "Hello, I'm Artur",
    "I'm an electromechanic and a programmer",
    "Feel free to explore my portfolio"
],
[
    "Witam, mam na imię Artur",
    "Jestem elektromechanikiem i programistą",
    "Zapraszam do zapoznania się z moim portfolio"
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

// Function to stop and reset animation
function resetAnimation() {
clearTimeout(typingTimeout); // Clear any ongoing typing or erasing timeout
textElement.textContent = ""; // Clear current text
index = 0; // Reset character index
currentParagraph = 0; // Start from the first paragraph
isErasing = false; // Reset erasing flag
}

// Typing function with callback when paragraph completes
function type() {
const currentText = paragraphs[currentParagraph];

if (!isErasing) {
    if (index < currentText.length) {
        textElement.textContent += currentText.charAt(index);
        index++;
        typingTimeout = setTimeout(type, 50); // Controlled speed for typing
    } else {
        setTimeout(() => {
            isErasing = true;
            typingTimeout = setTimeout(type, 20); // Start erasing after delay
        }, 1000); // Delay before erasing
    }
} else {
    if (index > 0) {
        textElement.textContent = currentText.substring(0, index - 1);
        index--;
        typingTimeout = setTimeout(type, 20); // Controlled speed for erasing
    } else {
        // Check if we are at the end of the current set
        isErasing = false;
        currentParagraph = (currentParagraph + 1) % paragraphs.length; // Move to next paragraph
        if (currentParagraph === 0) {
            // Restart the animation once all paragraphs are finished
            setTimeout(() => {
                type(); // Start from the first paragraph again
            }, 500); // Delay before restarting
        } else {
            setTimeout(() => {
                type(); // Delay before typing the next paragraph
            }, 500);
        }
    }
}
}

// Function to change content when button is clicked
function changeContent() {
if (isAnimating) {
    resetAnimation(); // Reset animation if it's running
}

// Switch to the next content set
currentSetIndex = (currentSetIndex + 1) % contentSets.length; 
paragraphs = contentSets[currentSetIndex]; // Update paragraphs to the new set
resetAnimation(); // Reset the text display to start fresh from the first paragraph
isAnimating = true; // Set flag to indicate animation is now running
type(); // Start typing from the first paragraph of the new set
}

//changeContentButton.addEventListener("click", changeContent);

// Start the typing animation when the page loads
window.onload = () => {
type(); // Start typing animation on load from the first set
};
document.getElementById('lang').addEventListener('click', changeContent);
