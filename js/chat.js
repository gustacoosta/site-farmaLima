import { GoogleGenerativeAI } from "@google/generative-ai";

// Use uma variável de ambiente para a API Key
const apiKey = "AIzaSyBC9swEUuKkD00O8f-80CDyL5gL3k-8Gbs";

const genAI = new GoogleGenerativeAI(apiKey);

let model; // Variável global para o modelo

const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null;
const inputInitHeight = chatInput.scrollHeight;

async function runModel(prompt) {
    if (!model) {
        model = genAI.getGenerativeModel({ model: "gemini-pro" });
    }
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text;
}

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = async (chatElement, userMessage) => {
    const messageElement = chatElement.querySelector("p");

    try {
        const answer = await runModel(userMessage);
        messageElement.textContent = answer;
    } catch (error) {
        console.error("Failed to generate response: ", error);
        messageElement.textContent = "Ocorreu um erro. Por favor, tente novamente.";
        // Adicione um elemento visual para indicar o erro
    }

    chatbox.scrollTo(0, chatbox.scrollHeight);
};

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    const outgoingChatLi = createChatLi(userMessage, "outgoing");
    chatbox.appendChild(outgoingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Pensando...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi, userMessage);
    }, 600);
};

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));