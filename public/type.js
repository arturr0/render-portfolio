const contentSets = [
            [
                "Hello, I'm Artur",
                "I'm an electromechanic and a software developer",
                "Welcome to my portfolio"
            ],
            [
                "This is the updated content!",
                "Here you can see my new projects.",
                "Thanks for visiting my portfolio."
            ],
            [
                "Another content set!",
                "Feel free to explore.",
                "Stay tuned for updates!"
            ]
        ];

        const textElement = document.getElementById("text");
        const changeContentButton = document.getElementById("change-content-button");
        let paragraphs = contentSets[0]; // Default content
        let currentSetIndex = 0; // Tracks the current set of paragraphs
        let currentParagraph = 0; // Index of the current paragraph
        let index = 0; // Index of the current character
        let isErasing = false; // Flag for typing or erasing
        let typingInterval; // To control the animation interval

        function type() {
            const currentText = paragraphs[currentParagraph];

            if (!isErasing) {
                // Typing characters
                if (index < currentText.length) {
                    textElement.textContent += currentText.charAt(index);
                    index++;
                } else {
                    // Finished typing, start erasing after a delay
                    clearInterval(typingInterval);
                    setTimeout(() => {
                        isErasing = true;
                        typingInterval = setInterval(type, 100); // Erasing speed
                    }, 1000); // Delay before erasing
                }
            } else {
                // Erasing characters
                if (index > 0) {
                    textElement.textContent = currentText.substring(0, index - 1);
                    index--;
                } else {
                    // Finished erasing
                    clearInterval(typingInterval);
                    isErasing = false;
                    currentParagraph = (currentParagraph + 1) % paragraphs.length; // Move to the next paragraph
                    setTimeout(() => {
                        typingInterval = setInterval(type, 150); // Typing speed
                    }, 500); // Delay before typing the next paragraph
                }
            }
        }

        function changeContent() {
            clearInterval(typingInterval); // Stop any ongoing animation
            currentSetIndex = (currentSetIndex + 1) % contentSets.length; // Cycle to the next content set
            paragraphs = contentSets[currentSetIndex]; // Update the paragraphs array
            currentParagraph = 0; // Reset to the first paragraph in the new set
            index = 0; // Reset character index
            isErasing = false; // Reset erasing flag
            textElement.textContent = ""; // Clear current text
            typingInterval = setInterval(type, 150); // Restart animation
        }

        // Attach the event listener for the button
        changeContentButton.addEventListener("click", changeContent);

        // Start the typing animation when the page loads
        window.onload = () => {
            typingInterval = setInterval(type, 150);
        };
