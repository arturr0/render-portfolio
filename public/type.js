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

    let paragraphs = contentSets[0];
    let currentSetIndex = 0;
    let currentParagraph = 0;
    let index = 0;
    let isErasing = false;
    let typingTimeout;
    let isAnimating = false;
    let isTypingComplete = false;

    function resetAnimation() {
        clearTimeout(typingTimeout);
        textElement.textContent = "";
        index = 0;
        currentParagraph = 0;
        isErasing = false;
        isAnimating = false;
        isTypingComplete = false;
    }

    function typeParagraph() {
        const currentText = paragraphs[currentParagraph];
        if (index < currentText.length) {
            textElement.textContent += currentText.charAt(index);
            index++;
        } else {
            isTypingComplete = true;
            setTimeout(() => {
                if (isTypingComplete) {
                    isErasing = true;
                }
            }, 1000);
        }
    }

    function eraseParagraph() {
        const currentText = paragraphs[currentParagraph];
        if (index > 0) {
            textElement.textContent = currentText.substring(0, index - 1);
            index--;
        } else {
            currentParagraph++;
            isErasing = false;
            isTypingComplete = false;

            if (currentParagraph === paragraphs.length) {
                isAnimating = false;
            }
        }
    }

    function startInitialAnimation() {
        if (isAnimating) return;

        resetAnimation();
        isAnimating = true;

        function typeEraseLoop() {
            if (isErasing && currentParagraph < 2) {
                eraseParagraph();
                typingTimeout = setTimeout(typeEraseLoop, 50); // Faster erasing
            } else if (!isErasing) {
                typeParagraph();
                typingTimeout = setTimeout(typeEraseLoop, 75); // Slower typing
            } else {
                if (currentParagraph < paragraphs.length) {
                    typingTimeout = setTimeout(typeEraseLoop, 200);
                } else {
                    setTimeout(() => {
                        isAnimating = false;
                    }, 500);
                }
            }
        }

        typeEraseLoop();
    }

    function changeContent() {
        resetAnimation();
        currentSetIndex = (currentSetIndex + 1) % contentSets.length;
        paragraphs = contentSets[currentSetIndex];
        currentParagraph = 0;
        index = 0;
        startInitialAnimation();
    }

    document.getElementById('lang').addEventListener('click', changeContent);
    startInitialAnimation();
});
