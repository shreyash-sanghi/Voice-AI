(function () {
    "use strict";

    const script = document.currentScript;
    const userId = script?.dataset?.userId;
    // Derive asset base from wherever this script is hosted (works on any site)
    const ASSET_URL = new URL(script.src).origin;
    // API URL must be provided via data-api-url (backend lives on a different server)
    const API_URL = (script?.dataset?.apiUrl || "http://localhost:8000").replace(/\/$/, "");


    if (!userId) {
        console.warn("[VoiceAI] Missing data-user-id attribute on script tag.");
        return;
    }

    let assistantConfig = null;

    // ─── Load CSS ─────────────────────────────────────────────────────────────
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `${ASSET_URL}/assistant.css`;
    document.head.appendChild(link);

    // ─── Build Popup ──────────────────────────────────────────────────────────
    const popup = document.createElement("div");
    popup.className = "shifra-popup theme-dark";
    popup.innerHTML = `
    <div class="shifra-overlay"></div>
    <div class="shifra-header-actions">
      <button class="shifra-mute-btn" aria-label="Toggle Sound" title="Mute/Unmute">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
      </button>
      <button class="shifra-close-btn" aria-label="Close Assistant" title="Close">
        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
    <div class="shifra-content">
      <div class="shifra-top">
        <div class="shifra-orb-wrap">
          <div class="shifra-orb-glow"></div>
          <div class="shifra-orb"></div>
        </div>
        <h2 class="shifra-title">AI Website Assistant</h2>
        <p class="shifra-sub">
          Your smart voice guide.<br/>
          Ask anything about this site.
        </p>
        <div class="shifra-status">Tap to speak or type</div>
        <div class="shifra-wave">
          <span></span><span></span><span></span>
          <span></span><span></span><span></span>
        </div>
        <div class="shifra-user-text"></div>
        <div class="shifra-ai-text"></div>
      </div>
      <div class="shifra-bottom">
        <div class="shifra-chips">
           <button class="shifra-chip">Pricing Plans?</button>
           <button class="shifra-chip">Contact Support</button>
           <button class="shifra-chip">Where are you located?</button>
        </div>
        <div class="shifra-input-row">
            <button class="shifra-mic" aria-label="Start voice input">
              <img src="${ASSET_URL}/mic.svg" alt="mic" class="shifra-mic-icon"/>
            </button>
            <div class="shifra-text-group">
                <input type="text" class="shifra-text-input" placeholder="Type a message..." />
                <button class="shifra-send-btn" aria-label="Send">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
            </div>
        </div>
      </div>
    </div>
  `;
    document.body.appendChild(popup);

    // ─── Floating Toggle Button ────────────────────────────────────────────────
    const btn = document.createElement("button");
    btn.className = "shifra-btn theme-dark";
    btn.setAttribute("aria-label", "Open AI Assistant");
    btn.innerHTML = `<img src="${ASSET_URL}/logo.png" alt="VoiceAI"/>`;
    document.body.appendChild(btn);

    // ─── Toggle open/close ────────────────────────────────────────────────────
    let isOpen = false;
    btn.onclick = () => {
        isOpen = !isOpen;
        popup.style.display = isOpen ? "flex" : "none";
        btn.setAttribute("aria-expanded", String(isOpen));
    };

    // ─── Fetch config ─────────────────────────────────────────────────────────
    const loadAssistant = async () => {
        try {
            const res = await fetch(`${API_URL}/api/assistant/config/${userId}`);
            const data = await res.json();
            if (data?.user) {
                assistantConfig = data.user;
                applyConfig();
            }
        } catch (err) {
            console.warn("[VoiceAI] Could not load assistant config:", err);
        }
    };

    const applyConfig = () => {
        if (!assistantConfig) return;

        const theme = assistantConfig.theme || "dark";
        popup.className = `shifra-popup theme-${theme}`;
        btn.className = `shifra-btn theme-${theme}`;

        popup.querySelector(".shifra-title").textContent =
            `Hello! I'm ${assistantConfig.assistantName}`;

        popup.querySelector(".shifra-sub").innerHTML =
            `Welcome to ${assistantConfig.businessName}.<br/>Ask me anything about this site.`;
    };

    loadAssistant();

    // ─── Element refs ─────────────────────────────────────────────────────────
    const status = popup.querySelector(".shifra-status");
    const wave = popup.querySelector(".shifra-wave");
    const userText = popup.querySelector(".shifra-user-text");
    const aiText = popup.querySelector(".shifra-ai-text");
    const mic = popup.querySelector(".shifra-mic");

    const muteBtn = popup.querySelector(".shifra-mute-btn");
    const closeBtn = popup.querySelector(".shifra-close-btn");
    const textInput = popup.querySelector(".shifra-text-input");
    const sendBtn = popup.querySelector(".shifra-send-btn");
    const chips = popup.querySelectorAll(".shifra-chip");

    // ─── Mute & Close Logic ───────────────────────────────────────────────────
    let isMuted = false;
    muteBtn.onclick = () => {
        isMuted = !isMuted;
        if (isMuted) {
            window.speechSynthesis.cancel();
            muteBtn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
        } else {
            muteBtn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
        }
    };

    closeBtn.onclick = () => {
        isOpen = false;
        popup.style.display = "none";
        btn.setAttribute("aria-expanded", "false");
    };

    // ─── Core Processing Logic ────────────────────────────────────────────────
    const processMessage = async (transcript) => {
        userText.textContent = "You: " + transcript;
        status.textContent = "Thinking…";
        aiText.textContent = "";
        wave.classList.add("active");

        try {
            const res = await fetch(`${API_URL}/api/assistant/ask`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: transcript, userId }),
            });
            const data = await res.json();

            wave.classList.remove("active");

            if (data.success) {
                if (data.action === "navigate") {
                    speak(data.response);
                    setTimeout(() => { window.location.href = data.path; }, 1800);
                } else {
                    speak(data.aiResponse);
                }
            } else {
                speak("I couldn't get a response. Please check your plan or try again.");
            }
        } catch (err) {
            wave.classList.remove("active");
            speak("Something went wrong connecting to the AI. Please try again.");
        }
    };

    // ─── Text Input & Chips ───────────────────────────────────────────────────
    const submitText = () => {
        const val = textInput.value.trim();
        if (!val) return;
        textInput.value = "";
        processMessage(val);
    };

    sendBtn.onclick = submitText;
    textInput.onkeypress = (e) => {
        if (e.key === 'Enter') submitText();
    };

    chips.forEach(chip => {
        chip.onclick = () => {
            processMessage(chip.textContent);
        };
    });

    // ─── Text-to-speech ───────────────────────────────────────────────────────
    const speak = (text) => {
        window.speechSynthesis.cancel();
        aiText.textContent = text;
        status.textContent = "Tap to speak or type";

        if (isMuted) return;

        wave.classList.add("active");

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onend = () => {
            wave.classList.remove("active");
        };

        window.speechSynthesis.speak(utterance);
    };

    // ─── Speech Recognition ───────────────────────────────────────────────────
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        status.textContent = "Voice not supported in this browser";
        mic.style.opacity = "0.4";
        mic.style.pointerEvents = "none";
    } else {
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.continuous = false;
        recognition.interimResults = false;

        mic.onclick = () => {
            window.speechSynthesis.cancel();
            wave.classList.add("active");
            status.textContent = "Listening…";
            userText.textContent = "";
            aiText.textContent = "";
            try {
                recognition.start();
            } catch (e) {
                // already running
            }
        };

        recognition.onresult = async (e) => {
            const transcript = e.results[0][0].transcript;
            recognition.stop();
            wave.classList.remove("active");
            processMessage(transcript);
        };

        recognition.onerror = (e) => {
            console.warn("[VoiceAI] Speech error:", e.error);
            status.textContent = "Tap to speak or type";
            wave.classList.remove("active");
        };

        recognition.onend = () => {
            if (status.textContent === "Listening…") {
                status.textContent = "Tap to speak or type";
                wave.classList.remove("active");
            }
        };
    }

})();