// CookieKRG 2.0 - Supreme Brain Logic (Stable Library Edition)
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

const greetings = ["hello", "hi", "hey", "good morning", "yo", "sup"];
const swearWords = ["fuck", "shit", "asshole", "bitch", "dick", "pussy", "bastard", "damn", "crap", "piss"]; 

// Live KRG Connection: Open Library Stable Protocol
async function executeKRGLink(query) {
    status.innerText = "Accessing KRG Archives...";
    status.classList.add('text-sky-500');
    
    try {
        const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=1`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data.docs && data.docs.length > 0) {
            const entry = data.docs[0];
            const title = entry.title;
            const author = entry.author_name ? entry.author_name[0] : "Unknown Author";
            const year = entry.first_publish_year || "Various Years";
            
            return `I have located archives for "${title}" by ${author}, first documented in ${year}. (Records held in KRG nonfiction database there also).`;
        } else {
            return "This query involves currently unsupported knowledge in our active KRG sectors there actually also.";
        }
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

    // Stage 1: Robust Filter
    if (words.some(word => swearWords.includes(word))) {
        appendMessage("Sorry, I can’t do that thing as it uses swear words there actually also.", false);
        return;
    }

    // Stage 2: Identity Logic (Updated Model Name)
    if (lowerText.includes("your name") || lowerText.includes("who are you")) {
        appendMessage("I am the CookieKRG 2.0, the core executor of this Supreme Brain system there actually also! 👋", false);
        return;
    }

    // Stage 3: Greeting Protocol
    if (greetings.some(word => lowerText.startsWith(word))) {
        appendMessage("Hello there! I am ready to help you with your queries today. 👋", false);
        return;
    }

    // Stage 4: Local Brain
    const localMatch = internalBrain.find(b => b.keys.some(k => lowerText.includes(k)));
    if (localMatch) {
        setTimeout(() => {
            appendMessage(localMatch.data, false);
        }, 500);
    } else {
        // Stage 5: Live KRG
        const result = await executeKRGLink(text);
        appendMessage(result, false);
    }
});
