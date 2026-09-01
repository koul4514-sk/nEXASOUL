Aura Quiz Frontend
A feature-rich, interactive web application developed as a UI/UX and frontend engineering submission for a web development competition, built in collaboration with the NexaSoul Web Development Foundation Bootcamp and Chandigarh University.

Overview
This project is an advanced web-based quiz and assessment application designed to elevate the standard user experience of traditional static quizzes. Moving beyond simple question-and-answer interfaces, it integrates real-time performance tracking, dynamic scoring, response-time mechanics, combo multipliers, random interactive events, visual aura feedback, and behavioral classification. Built using vanilla HTML5, CSS3, and modern JavaScript, the application emphasizes clean component styling, responsive layout design, and robust client-side state management without external framework dependencies.

Features
Interactive Question Flow: Dynamic rendering of questions, options, and progressive states with immediate visual feedback on user selection.

Timer and Response-Time Mechanics: Integrated countdown timers per question that factor response speed into performance scoring, encouraging rapid decision-making.

Dynamic Scoring and Combo System: A multi-layered scoring engine that multiplies points based on correct answer streaks (combos), rewarding consistent accuracy.

Random Interactive Events: Contextual events triggered during quiz progression that add dynamic variation and engagement to the assessment flow.

Visual Aura Feedback: Real-time visual indicators reflecting the user's current performance state and psychological or behavioral momentum throughout the session.

Comprehensive Performance Analysis: Detailed post-quiz analytics breaking down accuracy, speed, scoring milestones, and behavioral classification.

Design Redesign
The visual interface underwent a comprehensive redesign to establish a polished, modern aesthetic suitable for a competitive submission:

Replaced standard browser-default form elements and basic layouts with a cohesive, dark-themed UI featuring custom typography, subtle gradients, and glowing accents.

Implemented structured container layouts using CSS Flexbox and grid positioning for clean alignment across desktop and mobile viewports.

Designed custom card components, status badges, progress bars, and feedback modals with smooth CSS transitions for state changes.

Eliminated visual clutter by organizing information hierarchically through distinct typographic weights, muted secondary text colors, and high-contrast interactive states.

Changes From the Base Project
The project evolved from a basic static question-and-answer template into an interactive assessment system through several key engineering additions:

Base Project: Static HTML form structure with basic radio buttons, hardcoded questions, and simple score tallying upon final submission.

Redesigned Application:

Dynamic DOM rendering engine that generates question cards and options programmatically from JavaScript data structures.

Granular timer system that tracks elapsed time per question and penalizes or rewards based on speed.

Advanced scoring algorithm incorporating combo streak multipliers and time-bonus calculations.

State-driven event handling for random mid-quiz challenges and real-time validation.

Dynamic Aura visualization and behavioral classification mapping user metrics to personality/performance archetypes upon completion.

Fully responsive CSS architecture ensuring seamless adaptation across mobile, tablet, and desktop screens.

Technical Implementation
The application is structured around a modular separation of concerns across three core files:

HTML (index.html): Serves as the structural shell containing semantic landmark elements, application containers, dynamic view templates, and modal overlays. It establishes the mount points manipulated by the JavaScript runtime.

CSS (style.css): Manages the entire visual presentation, layout positioning, animations, and responsive breakpoints. It utilizes CSS custom properties for consistent color themes, flexbox for alignment, and keyframe animations for UI transitions.

JavaScript (script.js): Acts as the core controller handling application state, quiz logic, event listeners, DOM manipulation, timer intervals, scoring computations, and result analytics generation. State is maintained cleanly within application objects to prevent global scope pollution.

Technologies Used
HTML5 (Semantic markup, dynamic container architecture)

CSS3 (Flexbox, CSS custom properties, keyframe animations, responsive media queries)

JavaScript (ES6+, DOM manipulation, event-driven state management, timer APIs)

Getting Started
To run and test the project locally, follow these steps:

Clone the repository to your local machine:

Bash
git clone https://github.com/username/aura-quiz-frontend.git
Navigate to the project directory:

Bash
cd aura-quiz-frontend
Open index.html directly in any modern web browser, or serve it using a local development server (such as Live Server in Visual Studio Code) for optimal asset handling.

User Experience
Compared to standard, static quiz implementations that feel rigid and predictable, this application provides an immersive, arcade-inspired assessment experience. By combining time pressure, streak rewards, and visual feedback (Aura states), it maintains high user engagement. The clean typographic hierarchy and immediate visual responses ensure that users always understand their current standing and progress without cognitive overload.

Learning Outcomes
Mastering vanilla JavaScript DOM manipulation and event delegation for dynamic single-page application flows.

Designing and implementing robust client-side state management without external libraries.

Utilizing CSS custom properties and advanced selectors to build scalable, themeable, and responsive layouts.

Implementing timed asynchronous logic, intervals, and cleanup patterns to prevent memory leaks and race conditions.

Future Improvements
Add persistent local storage support to track historical high scores and user progression across multiple sessions.

Introduce a sound effects and haptic feedback toggle for enhanced sensory engagement.

Expand the question bank configuration to support external JSON fetching and category filtering.

Implement comprehensive accessibility (a11y) enhancements, including full keyboard navigation and ARIA live regions for screen readers.

Credits
Developed as part of the UI/UX and Frontend Development competition in collaboration with the NexaSoul Web Development Foundation Bootcamp and Chandigarh University.
