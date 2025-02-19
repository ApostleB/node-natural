const API_KEY = "YOUR_OPENAI_API_KEY"; // OpenAI API 키 입력
const API_URL = "https://api.openai.com/v1/chat/completions";

document.addEventListener("DOMContentLoaded", () => {
    const chatContainer = document.getElementById("chat-container");
});

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function sendMessage() {
    const inputField = document.getElementById("user-input");
    const userMessage = inputField.value.trim();

    if (userMessage === "") return;

    addMessage(userMessage, "user");
    inputField.value = "";

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }]
        })
    })
        .then(response => response.json())
        .then(data => {
            const botMessage = data.choices[0].message.content;
            addMessage(botMessage, "bot");
        })
        .catch(error => {
            console.error("Error:", error);
            addMessage("오류가 발생했습니다. 다시 시도해 주세요.", "bot");
        });
}

function addMessage(text, sender) {
    const chatContainer = document.getElementById("chat-container");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.innerText = text;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
