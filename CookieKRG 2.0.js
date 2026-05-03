// CookieKRG 2.0 - Supreme Brain Logic
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

// Robust Prediction: Expanded safety layer
const swearWords = [
    "fuck", "shit", "asshole", "bitch", "dick", "pussy", "bastard", 
    "damn", "crap", "hell", "piss", "motherfucker", "fucker", "slut", "whore"
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

// DuckDuckGo KRG Execution (No keys, dynamic opinions)
async function getLiveKRG(query) {
    status.innerText = "Accessing KRG Archives...";
    status.classList.add('text-sky-500');
    
    try {
        // DDG API provides abstracts and related topics which include perspectives
        const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&pretty=1&no_html=1&skip_disambig=1`;
        const response = await fetch(url);
        const data = await response.json();
        
        // Prioritize Abstract or Textual definitions for opinionated facts
        if (data.AbstractText) {
            return `${data.AbstractText} (Reflected in KRG archives there also).`;
        } else if (data.RelatedTopics && data.RelatedTopics.length > 0) {
            return data.RelatedTopics[0].Text;
        } else {
            return "The KRG link is clear, but this specific entry is still being indexed in the nonfiction archives.";
        }
    } catch (e) {
        return "I explored the KRG network, but i couldn't find a stable connection to that specific topic. Can we talk about your favorites instead?";
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

    // Stage 1: Robust Filter
    const hasSwear = swearWords.some(word => lowerText.includes(word));
    if (hasSwear) {
        setTimeout(() => {
            appendMessage("Sorry, I can’t do that thing as it uses swear words there actually also.", false);
        }, 400);
        return;
    }

    // Stage 2: Greeting Protocol
    const isGreeting = greetings.some(word => lowerText === word || lowerText.startsWith(word + " "));
    if (isGreeting) {
        setTimeout(() => {
            appendMessage("Hello there! I am ready to help you with your queries today. 👋", false);
        }, 300);
        return;
    }

    // Stage 3: Local Brain Check
    const localMatch = internalBrain.find(b => b.keys.some(k => lowerText.includes(k)));

    if (localMatch) {
        setTimeout(() => {
            appendMessage(localMatch.data, false);
        }, 500);
    } else {
        // Stage 4: Live KRG Execution
        const liveData = await getLiveKRG(text);
        appendMessage(liveData, false);
    }
});
