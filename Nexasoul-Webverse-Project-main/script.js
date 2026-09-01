/* ==========================================================================
   Aura Detector — JavaScript Logic (Interactive Aura Upgrade)
   Existing questions, IDs, and quiz flow preserved.
   ========================================================================== */

// --------------------------------------------------------------------------
// 1. QUESTION DATA (unchanged)
// --------------------------------------------------------------------------
const questions = [
    {
        question: "Q1. Your friend says 'Bro, let's go out.' You:",
        options: [
            { text: "A. Already ready 🚀", score: 10 },
            { text: "B. 'Where?' 👀", score: 7 },
            { text: "C. 'I'm broke bro 💀'", score: 5 },
            { text: "D. Leaves the message on seen 🤐", score: 2 }
        ]
    },
    {
        question: "Q2. Your assignment is due tomorrow at 11:59 PM. You:",
        options: [
            { text: "A. Finished it last week 🤓", score: 10 },
            { text: "B. Start today after lunch 💻", score: 7 },
            { text: "C. Start at 11:45 PM with adrenaline ⚡", score: 5 },
            { text: "D. 'Bro, can you send yours?' 💀", score: 2 }
        ]
    },
    {
        question: "Q3. Someone replies to your message with just 'K.' Your reaction:",
        options: [
            { text: "A. Normal, it's just a letter 👍", score: 10 },
            { text: "B. 'Are they angry?' 👀", score: 7 },
            { text: "C. Overthink everything for 3 hours 😭", score: 5 },
            { text: "D. Start a full FBI investigation 🕵️", score: 2 }
        ]
    },
    {
        question: "Q4. An 8:00 AM class/lecture is scheduled. You:",
        options: [
            { text: "A. Sit in the front row fully awake ☕", score: 10 },
            { text: "B. Reach 10 minutes late with iced coffee 🥤", score: 7 },
            { text: "C. Sleep in class with eyes open 😴", score: 5 },
            { text: "D. Turn off the alarm and continue dreaming 🛌", score: 2 }
        ]
    },
    {
        question: "Q5. You walk past a group of people laughing on campus. You think:",
        options: [
            { text: "A. They must have heard a funny joke 😂", score: 10 },
            { text: "B. Probably laughing at a meme 📲", score: 7 },
            { text: "C. 'Are they laughing at my outfit?' 😳", score: 5 },
            { text: "D. Adjust your walk style immediately 🚶‍♂️", score: 2 }
        ]
    },
    {
        question: "Q6. Your phone battery drops to 5%. You:",
        options: [
            { text: "A. Quietly pull out your power bank 🔋", score: 10 },
            { text: "B. Go hunt for a charger around campus 🔌", score: 7 },
            { text: "C. Enter extreme battery saver mode & panic ⚠️", score: 5 },
            { text: "D. Let it die, peace at last ✌️", score: 2 }
        ]
    },
    {
        question: "Q7. Someone asks you to explain a study/code concept. You:",
        options: [
            { text: "A. Explain it clearly like a professor 👨‍🏫", score: 10 },
            { text: "B. 'Bro it's easy, look at this example' 💡", score: 7 },
            { text: "C. 'Honestly, I guessed and it worked' 😅", score: 5 },
            { text: "D. 'Wait, we had a concept for that?' 😵", score: 2 }
        ]
    },
    {
        question: "Q8. How do you handle group project work?",
        options: [
            { text: "A. Carry the whole team single-handedly 🎒", score: 10 },
            { text: "B. Do your assigned part perfectly 🤝", score: 7 },
            { text: "C. Moral support and emotional backing 📢", score: 5 },
            { text: "D. Send thumbs up emojis in the group chat 👍", score: 2 }
        ]
    },
    {
        question: "Q9. You see a photo of yourself taken by a friend. You say:",
        options: [
            { text: "A. 'Damn, I look great!' 😎", score: 10 },
            { text: "B. 'Post it, it's good' 📸", score: 7 },
            { text: "C. 'Delete that right now 🔫'", score: 5 },
            { text: "D. 'Who is that creature?' 👹", score: 2 }
        ]
    },
    {
        question: "Q10. The teacher says 'I'm picking a random student to answer.' You:",
        options: [
            { text: "A. Make eye contact to show dominance 🗿", score: 10 },
            { text: "B. Smile and stay calm 😁", score: 7 },
            { text: "C. Suddenly look very deeply into your notebook 📖", score: 5 },
            { text: "D. Drop your pen on purpose to hide under the desk 🖊️", score: 2 }
        ]
    }
];

// --------------------------------------------------------------------------
// 2. STATE VARIABLES
// --------------------------------------------------------------------------
let currentQuestionIndex = 0;
let selectedOptionScore = null;
let answered = false;

const TIME_LIMIT = 10; // seconds per question
let timeRemaining = TIME_LIMIT;
let timerInterval = null;
let autoAdvanceTimeout = null;
let questionStartTimestamp = null;

let auraScore = 50;
let comboCount = 0;
let maxCombo = 0;
let doubleAuraActive = false;

const stats = {
    fastCount: 0,
    normalCount: 0,
    slowCount: 0,
    timeoutCount: 0,
    successCount: 0,
    totalAnswered: 0,
    totalResponseTime: 0,
    responseTimes: []
};

// --------------------------------------------------------------------------
// 3. DOM ELEMENTS (existing, unchanged references)
// --------------------------------------------------------------------------
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const retryBtn = document.getElementById("retry-btn");

const heroSection = document.getElementById("hero");
const aboutSection = document.getElementById("about");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");

const questionProgressText = document.getElementById("question-progress");
const progressBarFill = document.getElementById("progress-bar-fill");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const warningMsg = document.getElementById("warning-msg");

const finalScoreElement = document.getElementById("final-score");
const auraLevelTitle = document.getElementById("aura-level-title");
const auraLevelDesc = document.getElementById("aura-level-desc");

// --------------------------------------------------------------------------
// 3B. DYNAMICALLY CREATED AURA UI (no HTML changes required)
// --------------------------------------------------------------------------
function createAuraOrb() {
    const orb = document.createElement("div");
    orb.className = "aura-orb-widget level-medium";
    orb.innerHTML = `
        <div class="aura-orb-ring ring-1"></div>
        <div class="aura-orb-ring ring-2"></div>
        <div class="aura-orb-core">
            <span class="aura-orb-value">50</span>
            <span class="aura-orb-label">AURA</span>
        </div>
    `;
    document.body.appendChild(orb);
    return orb;
}

function createTimer() {
    const timer = document.createElement("div");
    timer.className = "aura-timer";
    timer.innerHTML = `
        <div class="aura-timer-bar"><div class="aura-timer-bar-fill"></div></div>
        <span class="aura-timer-count">${TIME_LIMIT}</span>
    `;
    return timer;
}

function createComboBadge() {
    const badge = document.createElement("div");
    badge.className = "combo-badge";
    badge.textContent = "";
    return badge;
}

function createFeedbackPopup() {
    const popup = document.createElement("div");
    popup.className = "aura-feedback-popup";
    document.body.appendChild(popup);
    return popup;
}

function createEventBanner() {
    const banner = document.createElement("div");
    banner.className = "event-banner";
    document.body.appendChild(banner);
    return banner;
}

function createAnalysisOverlay() {
    const overlay = document.createElement("div");
    overlay.className = "aura-analysis-overlay";
    overlay.innerHTML = `
        <div class="aura-analysis-inner">
            <p class="aura-analysis-title">ANALYZING YOUR AURA...</p>
            <p class="aura-analysis-percent">0%</p>
        </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
}

function createFinalStats() {
    const stats = document.createElement("div");
    stats.className = "final-stats";
    stats.innerHTML = `
        <div class="behavior-type"></div>
        <div class="stat-row"><span class="stat-label">Speed</span><span class="stat-value stat-speed">0%</span></div>
        <div class="stat-row"><span class="stat-label">Accuracy</span><span class="stat-value stat-accuracy">0%</span></div>
        <div class="stat-row"><span class="stat-label">Consistency</span><span class="stat-value stat-consistency">0%</span></div>
    `;
    return stats;
}

const auraOrbEl = createAuraOrb();
const timerEl = createTimer();
const comboBadgeEl = createComboBadge();
const feedbackPopupEl = createFeedbackPopup();
const eventBannerEl = createEventBanner();
const analysisOverlayEl = createAnalysisOverlay();
const finalStatsEl = createFinalStats();

// Anchor the timer just before the answer options, and the combo badge
// right after the existing progress bar — both insertion points rely only
// on elements that already exist in the DOM.
if (optionsContainer && optionsContainer.parentNode) {
    optionsContainer.parentNode.insertBefore(timerEl, optionsContainer);
}
if (progressBarFill && progressBarFill.parentNode) {
    progressBarFill.parentNode.insertAdjacentElement("afterend", comboBadgeEl);
}
if (auraLevelDesc && auraLevelDesc.parentNode) {
    auraLevelDesc.insertAdjacentElement("afterend", finalStatsEl);
}

// --------------------------------------------------------------------------
// 4. EVENT LISTENERS
// --------------------------------------------------------------------------
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", handleNextQuestion);
retryBtn.addEventListener("click", resetQuiz);

// --------------------------------------------------------------------------
// 5. HELPERS
// --------------------------------------------------------------------------
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function auraLevelClass(score) {
    if (score < 40) return "level-low";
    if (score <= 75) return "level-medium";
    return "level-high";
}

function updateAuraVisuals() {
    const levelClass = auraLevelClass(auraScore);
    auraOrbEl.classList.remove("level-low", "level-medium", "level-high");
    auraOrbEl.classList.add(levelClass);
    const valueEl = auraOrbEl.querySelector(".aura-orb-value");
    if (valueEl) valueEl.textContent = Math.round(auraScore);
}

function updateComboBadge() {
    if (comboCount >= 2) {
        comboBadgeEl.textContent = `🔥 COMBO ×${comboCount}`;
        comboBadgeEl.classList.add("visible");
    } else {
        comboBadgeEl.classList.remove("visible");
    }
}

function showFeedback(message, tone) {
    feedbackPopupEl.textContent = message;
    feedbackPopupEl.className = "aura-feedback-popup show" + (tone ? " tone-" + tone : "");
    window.clearTimeout(showFeedback._t);
    showFeedback._t = window.setTimeout(() => {
        feedbackPopupEl.classList.remove("show");
    }, 1100);
}

function queueFeedback(messages) {
    messages.forEach((msg, i) => {
        window.setTimeout(() => showFeedback(msg.text, msg.tone), i * 1000);
    });
}

function showEventBanner(title, tone) {
    eventBannerEl.innerHTML = title;
    eventBannerEl.className = "event-banner show tone-" + tone;
    window.setTimeout(() => {
        eventBannerEl.classList.remove("show");
    }, 1800);
}

function triggerRandomEvent() {
    if (Math.random() > 0.18) return; // ~18% chance

    const roll = Math.random();
    if (roll < 0.3) {
        auraScore = clamp(auraScore + 15, 0, 100);
        showEventBanner("✨ AURA SURGE ✨<br>The detector likes your energy.<br>+15 AURA", "surge");
    } else if (roll < 0.6) {
        auraScore = clamp(auraScore - 10, 0, 100);
        showEventBanner("💀 AURA DRAIN<br>Something feels off...<br>-10 AURA", "drain");
    } else if (roll < 0.85) {
        doubleAuraActive = true;
        showEventBanner("⚡ DOUBLE AURA<br>Your next answer scores 2×", "double");
    } else {
        document.body.classList.add("chaos-mode");
        window.setTimeout(() => document.body.classList.remove("chaos-mode"), 700);
        showEventBanner("😈 CHAOS MODE<br>Something unexpected happened.", "chaos");
    }
    updateAuraVisuals();
}

// --------------------------------------------------------------------------
// 6. TIMER
// --------------------------------------------------------------------------
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function renderTimer() {
    const fill = timerEl.querySelector(".aura-timer-bar-fill");
    const count = timerEl.querySelector(".aura-timer-count");
    const percent = clamp((timeRemaining / TIME_LIMIT) * 100, 0, 100);
    if (fill) fill.style.width = percent + "%";
    if (count) count.textContent = timeRemaining;
    timerEl.classList.toggle("urgent", timeRemaining <= 3);
}

function startTimer() {
    stopTimer();
    timeRemaining = TIME_LIMIT;
    questionStartTimestamp = Date.now();
    renderTimer();
    timerInterval = setInterval(() => {
        timeRemaining--;
        renderTimer();
        if (timeRemaining <= 0) {
            stopTimer();
            handleTimeout();
        }
    }, 1000);
}

// --------------------------------------------------------------------------
// 7. CORE QUIZ FLOW
// --------------------------------------------------------------------------
function startQuiz() {
    heroSection.style.display = "none";
    aboutSection.style.display = "none";
    quizContainer.style.display = "block";

    currentQuestionIndex = 0;
    auraScore = 50;
    comboCount = 0;
    maxCombo = 0;
    doubleAuraActive = false;
    stats.fastCount = 0;
    stats.normalCount = 0;
    stats.slowCount = 0;
    stats.timeoutCount = 0;
    stats.successCount = 0;
    stats.totalAnswered = 0;
    stats.totalResponseTime = 0;
    stats.responseTimes = [];

    updateAuraVisuals();
    updateComboBadge();
    loadQuestion();
}

function loadQuestion() {
    selectedOptionScore = null;
    answered = false;
    warningMsg.style.display = "none";
    window.clearTimeout(autoAdvanceTimeout);

    const currentQuestion = questions[currentQuestionIndex];

    questionProgressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBarFill.style.width = `${progressPercent}%`;

    questionText.textContent = currentQuestion.question;

    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option) => {
        const button = document.createElement("button");
        button.classList.add("option-btn");
        button.textContent = option.text;

        button.addEventListener("click", () => {
            selectOption(button, option.score);
        });

        optionsContainer.appendChild(button);
    });

    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.textContent = "Submit & Reveal Aura 🔮";
    } else {
        nextBtn.textContent = "Next Question →";
    }

    startTimer();
}

function selectOption(selectedBtn, score) {
    if (answered) return;
    answered = true;
    stopTimer();
    warningMsg.style.display = "none";
    selectedOptionScore = score;

    const responseTime = clamp((Date.now() - questionStartTimestamp) / 1000, 0, TIME_LIMIT);

    const allOptions = optionsContainer.querySelectorAll(".option-btn");
    allOptions.forEach((btn) => {
        btn.classList.remove("selected");
        btn.disabled = true;
    });
    selectedBtn.classList.add("selected");

    processAnswer(score, responseTime, false);
}

function handleTimeout() {
    if (answered) return;
    answered = true;
    warningMsg.style.display = "none";

    const allOptions = optionsContainer.querySelectorAll(".option-btn");
    allOptions.forEach((btn) => (btn.disabled = true));

    processAnswer(0, TIME_LIMIT, true);

    autoAdvanceTimeout = window.setTimeout(() => {
        proceedToNext();
    }, 1400);
}

function processAnswer(score, responseTime, isTimeout) {
    stats.totalAnswered++;
    stats.totalResponseTime += responseTime;
    stats.responseTimes.push(responseTime);

    // Fixed reward map: a bad pick costs real Aura no matter how fast it was clicked.
    const AURA_DELTA_MAP = { 10: 12, 7: 4, 5: -4, 2: -14 };
    let baseDelta;
    let speedBonus = 0;
    const feedbackQueue = [];
    const success = !isTimeout && score >= 7;

    // Track raw response-time buckets for the end-of-quiz speed stat,
    // independent of whether the pick itself was any good.
    if (!isTimeout) {
        if (responseTime <= 3) stats.fastCount++;
        else if (responseTime <= 7) stats.normalCount++;
        else stats.slowCount++;
    }

    if (isTimeout) {
        stats.timeoutCount++;
        baseDelta = -10;
        feedbackQueue.push({ text: "⏱️ TIMEOUT · -10 AURA", tone: "bad" });
    } else {
        baseDelta = AURA_DELTA_MAP[score] !== undefined ? AURA_DELTA_MAP[score] : Math.round((score - 5) * 2);
        feedbackQueue.push({
            text: (baseDelta >= 0 ? "✨ +" : "💀 ") + baseDelta + " AURA",
            tone: baseDelta >= 0 ? "good" : "bad"
        });

        if (success) {
            // Speed only pays out when the pick itself was actually good.
            if (responseTime <= 3) speedBonus = 10;
            else if (responseTime <= 7) speedBonus = 5;
            else speedBonus = 2;
            feedbackQueue.push({ text: "⚡ SPEED BONUS +" + speedBonus, tone: "good" });
        } else if (responseTime <= 3) {
            // Clicking fast on a bad option is a rushed guess, not a bonus.
            speedBonus = -4;
            feedbackQueue.push({ text: "⚡ RUSHED PICK · -4 AURA", tone: "bad" });
        }
    }

    let comboBonus = 0;

    if (success) {
        stats.successCount++;
        comboCount++;

        maxCombo = Math.max(maxCombo, comboCount);
        if (comboCount >= 3) {
            comboBonus = 5;
            feedbackQueue.push({ text: "🔥 COMBO ×" + comboCount + " +5", tone: "good" });
        }
    } else {
        if (comboCount > 1) {
            feedbackQueue.push({ text: "💔 COMBO BROKEN", tone: "bad" });
        }
        comboCount = 0;
    }

    let totalDelta = baseDelta + speedBonus + comboBonus;

    if (doubleAuraActive && !isTimeout) {
        totalDelta *= 2;
        doubleAuraActive = false;
        feedbackQueue.push({ text: "⚡ DOUBLE AURA APPLIED", tone: "good" });
    }

    auraScore = clamp(auraScore + totalDelta, 0, 100);

    updateAuraVisuals();
    updateComboBadge();
    queueFeedback(feedbackQueue);

    window.setTimeout(() => {
        triggerRandomEvent();
    }, feedbackQueue.length * 1000 + 300);
}

function handleNextQuestion() {
    if (!answered) {
        warningMsg.style.display = "block";
        return;
    }
    proceedToNext();
}

function proceedToNext() {
    window.clearTimeout(autoAdvanceTimeout);
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// --------------------------------------------------------------------------
// 8. RESULTS
// --------------------------------------------------------------------------
function assignAuraLevel(score) {
    let levelTitle = "";
    let levelDesc = "";

    if (score <= 39) {
        levelTitle = "😶 NPC ENERGY";
        levelDesc = "You're living on default settings bro! Time to make some main character choices and get your aura up.";
    } else if (score <= 59) {
        levelTitle = "😐 AVERAGE AURA";
        levelDesc = "Not bad, not crazy. You're holding down the fort, but there's a main character waiting to break free.";
    } else if (score <= 69) {
        levelTitle = "😎 COOL AURA";
        levelDesc = "Chilled out, relaxed, and smooth. You don't try too hard, yet you keep your cool under pressure.";
    } else if (score <= 79) {
        levelTitle = "🔥 PRO AURA";
        levelDesc = "You know what you're doing. You walk into situations with confidence and somehow make it work. That's some serious aura!";
    } else if (score <= 89) {
        levelTitle = "🗿 SAVAGE AURA";
        levelDesc = "Unshakable mindset. You handle campus chaos like a walk in the park. Respect maxed out!";
    } else {
        levelTitle = "👑 UNLIMITED AURA";
        levelDesc = "Absolute Main Character energy! The room shifts when you walk in. You possess unmatched aura!";
    }

    auraLevelTitle.textContent = levelTitle;
    auraLevelDesc.textContent = levelDesc;
}

function computeConsistency(times, limit) {
    if (!times.length) return 0;
    const mean = times.reduce((a, b) => a + b, 0) / times.length;
    const variance = times.reduce((sum, t) => sum + Math.pow(t - mean, 2), 0) / times.length;
    const stdDev = Math.sqrt(variance);
    return clamp(Math.round(100 - (stdDev / limit) * 200), 0, 100);
}

function determineBehaviorType({ accuracy, speedPercent, consistency, timeoutCount, combo, score }) {
    if (timeoutCount >= 3) return "💀 NPC ENERGY";
    if (score >= 85 && speedPercent >= 70) return "👑 MAIN CHARACTER";
    if (speedPercent >= 75 && accuracy >= 60) return "🔥 FEARLESS";
    if (accuracy >= 75 && consistency >= 70) return "🧠 STRATEGIC";
    if (combo === 0 && timeoutCount >= 2) return "😈 CHAOTIC";
    if (speedPercent <= 40 && accuracy >= 60) return "🗿 UNBOTHERED";
    if (speedPercent >= 80 && accuracy < 50) return "⚡ RISK TAKER";
    return "🌊 CALM";
}

function renderFinalStats({ speedPercent, accuracy, consistency, behaviorType }) {
    finalStatsEl.querySelector(".behavior-type").textContent = behaviorType;
    finalStatsEl.querySelector(".stat-speed").textContent = speedPercent + "%";
    finalStatsEl.querySelector(".stat-accuracy").textContent = accuracy + "%";
    finalStatsEl.querySelector(".stat-consistency").textContent = consistency + "%";
}

function runAuraAnalysis(onComplete) {
    analysisOverlayEl.classList.add("show");
    const percentEl = analysisOverlayEl.querySelector(".aura-analysis-percent");
    const steps = [21, 42, 67, 84, 100];
    steps.forEach((value, i) => {
        window.setTimeout(() => {
            if (percentEl) percentEl.textContent = value + "%";
            if (value === 100) {
                window.setTimeout(() => {
                    analysisOverlayEl.classList.remove("show");
                    if (onComplete) onComplete();
                }, 350);
            }
        }, i * 260);
    });
}

function showResults() {
    stopTimer();
    window.clearTimeout(autoAdvanceTimeout);

    quizContainer.style.display = "none";
    resultContainer.style.display = "block";

    const totalAnswered = stats.totalAnswered || 1;
    const accuracy = Math.round((stats.successCount / totalAnswered) * 100);
    const avgResponse = stats.totalResponseTime / totalAnswered;
    const speedPercent = clamp(Math.round(100 - (avgResponse / TIME_LIMIT) * 100), 0, 100);
    const consistency = computeConsistency(stats.responseTimes, TIME_LIMIT);
    const roundedAura = Math.round(auraScore);

    const behaviorType = determineBehaviorType({
        accuracy,
        speedPercent,
        consistency,
        timeoutCount: stats.timeoutCount,
        combo: maxCombo,
        score: roundedAura
    });

    finalScoreElement.textContent = roundedAura;
    assignAuraLevel(roundedAura);
    renderFinalStats({ speedPercent, accuracy, consistency, behaviorType });
    updateAuraVisuals();

    runAuraAnalysis();
}

// --------------------------------------------------------------------------
// 9. RESET
// --------------------------------------------------------------------------
function resetQuiz() {
    stopTimer();
    window.clearTimeout(autoAdvanceTimeout);
    analysisOverlayEl.classList.remove("show");
    eventBannerEl.classList.remove("show");
    feedbackPopupEl.classList.remove("show");
    comboBadgeEl.classList.remove("visible");

    resultContainer.style.display = "none";
    heroSection.style.display = "block";
    aboutSection.style.display = "block";

    currentQuestionIndex = 0;
    selectedOptionScore = null;
    answered = false;
    auraScore = 50;
    comboCount = 0;
    maxCombo = 0;
    doubleAuraActive = false;

    updateAuraVisuals();
}

// Initial paint of the aura orb before the quiz starts
updateAuraVisuals();
