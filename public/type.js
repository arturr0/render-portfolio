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

        let paragraphs = contentSets[0]; // Default content
        let currentSetIndex = 0; // Tracks the current set of paragraphs
        let currentParagraph = 0; // Index of the current paragraph
        let index = 0; // Index of the current character
        let isErasing = false; // Flag for typing or erasing
        let typingTimeout; // Timeout to control the typing/erasing process

        function type() {
            const currentText = paragraphs[currentParagraph];

            if (!isErasing) {
                if (index < currentText.length) {
                    textElement.textContent += currentText.charAt(index);
                    index++;
                    typingTimeout = setTimeout(type, 50); // Continue typing at controlled speed
                } else {
                    setTimeout(() => {
                        isErasing = true;
                        type(); // Start erasing after delay
                    }, 1000); // Delay before erasing
                }
            } else {
                if (index > 0) {
                    textElement.textContent = currentText.substring(0, index - 1);
                    index--;
                    typingTimeout = setTimeout(type, 20); // Continue erasing at controlled speed
                } else {
                    isErasing = false;
                    currentParagraph = (currentParagraph + 1) % paragraphs.length; // Move to next paragraph
                    setTimeout(type, 500); // Delay before typing the next paragraph
                }
            }
        }

        function changeContent() {
            clearTimeout(typingTimeout); // Stop any ongoing typing or erasing
            currentSetIndex = (currentSetIndex + 1) % contentSets.length; // Cycle to the next content set
            paragraphs = contentSets[currentSetIndex]; // Update paragraphs
            currentParagraph = 0; // Start with the first paragraph
            index = 0; // Reset character index
            isErasing = false; // Reset erasing flag
            textElement.textContent = ""; // Clear current text
            type(); // Start typing animation from the beginning
        }

        //changeContentButton.addEventListener("click", changeContent);

        // Start the typing animation when the page loads
        window.onload = () => {
            type(); // Start typing animation
        };
        document.getElementById('lang').addEventListener('click', changeContent);
