// CookieKRG 2.0 - Supreme Multi-Link Logic
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

// Live KRG Connection: Global Metadata Protocol
async function executeKRGLink(query) {
    status.innerText = "Accessing KRG Archives...";
    status.classList.add('text-sky-500');
    
    try {
        // Active Connection: RestCountries KRG
        const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(query)}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data[0]) {
            const country = data[0];
            const name = country.name.common;
            const region = country.region;
            const capital = country.capital ? country.capital[0] : "N/A";
            const population = country.population.toLocaleString();
            
            return `${name} is a country located in ${region}. Its capital is ${capital} with a population of approximately ${population}. (Data verified in KRG metadata there also).`;
        } else {
            return "The KRG link is active, but that specific nation or metadata entry is still being indexed.";
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
    const words = lowerText.split(/\s+/); // Critical: Whole-word detection

    // Stage 1: Robust Filter (Hello is safe!)
    if (words.some(word => swearWords.includes(word))) {
        appendMessage("Sorry, I can’t do that thing as it uses swear words there actually also.", false);
        return;
    }

    // Stage 2: Greeting Protocol
    if (greetings.some(word => lowerText.startsWith(word))) {
        appendMessage("Hello there! I am ready to help you with your queries today. 👋", false);
        return;
    }

    // Stage 3: Local Brain (BoBoiBoy / Star Fox / History)
    const localMatch = internalBrain.find(b => b.keys.some(k => lowerText.includes(k)));
    if (localMatch) {
        setTimeout(() => {
            appendMessage(localMatch.data, false);
        }, 500);
    } else {
        // Stage 4: Live KRG (RestCountries Protocol)
        const result = await executeKRGLink(text);
        appendMessage(result, false);
    }
});
