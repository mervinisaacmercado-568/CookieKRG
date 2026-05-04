// CookieKRG 3.0 - Supreme Brain Logic (Major Release / Generation III)
const internalBrain = [
    {
        keys: ["boboiboy hitech", "vancouver", "wildbrain", "2021"],
        data: "BoBoiBoy HiTech was a Vancouver based series released in 2021 which was made by the original creator and Wildbrain Productions there also. The cast featured Shannon Kent as BoBoiBoy, Tabitha Germain as Yaya, and even Zac Efron as Gopal!"
    },
    {
        keys: ["ying", "voice", "andrea libman"],
        data: "According to credits, Ying from BoBoiBoy was voiced by Andrea Libman at WildBrain and 4Kids dub."
    },
    {
        keys: ["star fox", "fox mccloud", "malay"],
        data: "The Malay voice actors for Star Fox are Anas Abdul Aziz as Fox McCloud and Nur Fathiah Diaz as Veronica McCloud. The team also includes Azman Zulkiply, Shafiq Isa, and Usamah Zaid Yasin!"
    },
    {
        keys: ["history", "fiction"],
        data: "History must be referred to as nonfiction because it is a factual record of real events. It is definitely not fiction."
    },
    {
        keys: ["loopy", "pororo", "yap ee jean"],
        data: "Loopy from Pororo the Little Penguin was voiced by Yap Ee Jean at the Malaysian dub. She also voiced Liann Wu because Liann is of Asian heritage!"
    },
    {
        keys: ["toothless", "light fury", "fathiah diaz"],
        data: "Nur Fathiah Diaz voiced Light Fury in the Malay dub, while her brother Muhammad Fathi Diaz voiced Toothless in the 2016 Malay dub."
    }
];

// Generation III Safety Layer
const swearWords = [
    "fuck", "shit", "asshole", "bitch", "dick", "pussy", "bastard", 
    "damn", "crap", "piss", "motherfucker", "fucker", "slut", "whore"
];
const greetings = ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "yo", "sup"];

const display = document.getElementById('chat-display');
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const status = document.getElementById('brain-status');

function appendMessage(text, isUser) {
    const wrapper = document.createElement('div');
    wrapper.className = `flex ${isUser ? 'justify-end' : 'justify-start'} w-full animate-msg`;
    const html = isUser 
        ? `<div class="user-bubble px-5 py-3 text-white max-w-[85%] text-sm font-semibold shadow-xl">${text}</div>`
        : `<div class="ai-bubble px-5 py-4 text-slate-200 max-w-[85%] text-sm leading-relaxed shadow-lg">${text}</div>`;
    wrapper.innerHTML = html;
    display.appendChild(wrapper);
    display.scrollTop = display.scrollHeight;
}

// v3.0 Supreme KRG Connection
async function getGlobalKnowledge(query) {
    status.innerText = "Accessing Generation III Archives...";
    status.classList.add('text-sky-500');
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); 

    try {
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error();
        
        const data = await response.json();
        return data.extract || "This query involves currently unsupported knowledge in our active KRG sectors there actually also.";
    } catch (e) {
        return "The KRG network is shifting connections at there. Try again in a moment!";
    } finally {
        status.innerText = "Neural Link Stable";
        status.classList.remove('text-sky-500');
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    appendMessage(text, true);
    input.value = '';

    const lowerText = text.toLowerCase();
    const words = lowerText.split(/\s+/);

    // Stage 1: Generation III Filter
    if (words.some(word => swearWords.includes(word))) {
        setTimeout(() => {
            appendMessage("Sorry, I can’t do that thing as it uses swear words there actually also.", false);
        }, 400);
        return;
    }

    // Stage 2: Original Repeat Protocol (Generation III)
    if (lowerText.startsWith("repeat after me:") || lowerText.startsWith("repeat after me ")) {
        // Logic to detect if a colon is used or just a space
        const prefix = lowerText.startsWith("repeat after me:") ? 16 : 16;
        const repeatText = text.slice(prefix).trim(); 
        setTimeout(() => {
            appendMessage(repeatText, false);
        }, 300);
        return;
    }

    // Stage 3: Identity Logic
    if (lowerText.includes("your name") || lowerText.includes("who are you")) {
        setTimeout(() => {
            appendMessage("I am the CookieKRG 3.0, the core executor of this Supreme Brain system there actually also! 👋", false);
        }, 300);
        return;
    }

    // Stage 4: Greeting Protocol
    if (greetings.some(word => lowerText === word || lowerText.startsWith(word + " "))) {
        setTimeout(() => {
            appendMessage("Hello there! I am ready to help you with your queries today. 👋", false);
        }, 300);
        return;
    }

    // Stage 5: Local Brain Check
    const localMatch = internalBrain.find(b => b.keys.some(k => lowerText.includes(k)));

    if (localMatch) {
        setTimeout(() => {
            appendMessage(localMatch.data, false);
        }, 500);
    } else {
        // Stage 6: Global KRG Execution
        const globalData = await getGlobalKnowledge(text);
        appendMessage(globalData, false);
    }
});
