        // CookieKRG 1.0
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

        // Prediction: Detect swear words
        const swearWords = ["fuck", "shit", "asshole", "bitch", "dick", "pussy", "bastard"];

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

        // Improved Search Connection using Wikipedia (No Keys needed)
        async function getGlobalKnowledge(query) {
            status.innerText = "Querying Archives...";
            status.classList.add('text-yellow-500');
            
            try {
                // Wikipedia API is free and doesn't require keys or proxies usually
                const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
                const response = await fetch(url);
                if (!response.ok) throw new Error();
                
                const data = await response.json();
                return data.extract || "I found references to that topic, but no detailed summary is available right now.";
            } catch (e) {
                return "I explored the global network, but i couldn't find a stable connection to that specific topic. Can we talk about your favorites instead?";
            } finally {
                status.innerText = "Neural Link Stable";
                status.classList.remove('text-yellow-500');
            }
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const text = input.value.trim();
            if (!text) return;

            appendMessage(text, true);
            input.value = '';

            // Check for swear words first
            const lowerText = text.toLowerCase();
            const hasSwear = swearWords.some(word => lowerText.includes(word));

            if (hasSwear) {
                setTimeout(() => {
                    appendMessage("Sorry, I can’t do that thing as it uses swear words there actually also.", false);
                }, 400);
                return;
            }

            // Check local brain first
            const localMatch = internalBrain.find(b => b.keys.some(k => lowerText.includes(k)));

            if (localMatch) {
                setTimeout(() => {
                    appendMessage(localMatch.data, false);
                }, 500);
            } else {
                const globalData = await getGlobalKnowledge(text);
                appendMessage(globalData, false);
            }
        });
