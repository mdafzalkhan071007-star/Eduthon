document.addEventListener('DOMContentLoaded', function () {
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const voiceBtn = document.getElementById('voice-btn');
    const emergencyBtn = document.getElementById('emergency-btn');
    const editProfileBtn = document.getElementById('edit-profile');
    const logMoodBtn = document.getElementById('log-mood');
    const moodSelect = document.getElementById('mood-select');
    const moodHistory = document.getElementById('mood-history');
    const voiceToggle = document.getElementById('voice-toggle');
    const ttsToggle = document.getElementById('tts-toggle');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    let conversationHistory = JSON.parse(localStorage.getItem('conversationHistory')) || [];
    let moodLogs = JSON.parse(localStorage.getItem('moodLogs')) || [];
    let userProfile = JSON.parse(localStorage.getItem('userProfile')) || { name: 'Anonymous' };
    let settings = JSON.parse(localStorage.getItem('settings')) || { voice: true, tts: true, darkMode: false };
    let studentData = JSON.parse(localStorage.getItem('studentData')) || null;

    // Load settings
    voiceToggle.checked = settings.voice;
    ttsToggle.checked = settings.tts;
    if (settings.darkMode) document.body.classList.add('dark-mode');

    // Load student data into profile
    if (studentData) {
        document.getElementById('user-name').textContent = studentData.name;
        document.getElementById('user-course').textContent = `Course: ${studentData.course}`;
        document.getElementById('user-roll').textContent = `Roll Number: ${studentData.rollNumber}`;
    }

    // Function to add message to chat
    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = message;
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        conversationHistory.push({ message, sender, timestamp: new Date() });
        localStorage.setItem('conversationHistory', JSON.stringify(conversationHistory));
        if (settings.tts && sender === 'bot') speak(message);
    }

    // Function to speak text
    function speak(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        }
    }

    // Advanced bot response using OpenAI API (placeholder for integration)
    async function getBotResponse(userMessage) {
        // For demo, use keyword detection; in real app, integrate OpenAI API
        const lowerMessage = userMessage.toLowerCase();
        if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried') || lowerMessage.includes('nervous')) {
            return "I detect signs of anxiety.Anxiety is a common human emotion characterized by feelings of fear, dread, and uneasiness that can be a normal reaction to stress. Try the 4-7-8 breathing technique: inhale for 4, hold for 7, exhale for 8. For professional help, contact a therapist via https://www.psychologytoday.com.";
        } else if (lowerMessage.includes('depressed') || lowerMessage.includes('depression') || lowerMessage.includes('sad') || lowerMessage.includes('down')) {
            return "Sadness and depression can feel overwhelming, but you're not alone. Start by acknowledging your feelings without judgment. Try small steps like going for a walk, listening to comforting music, or reaching out to a trusted friend. Journaling can help process emotions, and talking to a professional can provide deeper support. Remember, it's okay to seek help—resources like https://www.nimh.nih.gov/health/topics/depression can guide you. If it's severe, consider contacting a therapist via https://www.psychologytoday.com.";
        } else if (lowerMessage.includes('stress') || lowerMessage.includes('stressed') || lowerMessage.includes('strain') || lowerMessage.includes('strained')) {
            return "Stress and strain can be overwhelming, but there are ways to manage it. Try progressive muscle relaxation: tense and release each muscle group from your toes to your head. Practice time management by prioritizing tasks and taking breaks. For more tips, visit https://www.apa.org/topics/stress. If it feels too much, talk to a professional at https://www.psychologytoday.com.";
        } else if (lowerMessage.includes('burnout') || lowerMessage.includes('burnt out') || lowerMessage.includes('exhausted') || lowerMessage.includes('overwhelmed')) {
            return "Burnout is real. Prioritize rest, set boundaries, and seek support. Check out https://www.who.int/news-room/fact-sheets/detail/burn-out-an-occupational-phenomenon.";
        } else if (lowerMessage.includes('suicide') || lowerMessage.includes('kill myself') || lowerMessage.includes('end it')) {
            return "If you're feeling suicidal, know that help is available right now. Call the National Suicide Prevention Lifeline at 988 or text HOME to 741741 for the Crisis Text Line. You're not alone in this—many people have felt this way and found hope. Please reach out to a trusted friend, family member, or professional. Your life matters, and there are people who care and want to support you.";
        } else if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('advice') || lowerMessage.includes('suggestion') || lowerMessage.includes('suggest')) {
            return "I'm here to help. Can you tell me more about what's on your mind? Or would you like some coping strategies? Here are some mental health suggestions: 1. Mingling with nature - Spend time outdoors, go for walks in parks, or practice forest bathing. 2. Yoga - Try gentle yoga poses like child's pose or cat-cow to reduce stress. 3. Eating healthy food - Focus on a balanced diet with fruits, vegetables, whole grains, and lean proteins. 4. 4-4-4 breathing method - Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds to calm anxiety.";
        } else if (lowerMessage.includes('how are you') || lowerMessage.includes('what are you')) {
            return "I'm doing well, thank you for asking! I'm here to support you. How are you feeling right now?";
        } else if (lowerMessage.includes('who are you')) {
            return "I'm an AI mental health support bot, designed to provide guidance and support for your emotional well-being. I'm here to listen and help you navigate your feelings. How can I assist you today?";
        } else if (lowerMessage.includes('i need companionship')) {
            return "Feeling the need for companionship is common. I'm here to provide virtual support, but building real connections can help. Try joining online communities, clubs, or volunteering. If loneliness persists, consider talking to a therapist. Resources: https://www.psychologytoday.com.";
        } else if (lowerMessage.includes('what should i do in this world')) {
            return "Finding purpose can be a journey. Reflect on your passions, set small goals, pursue hobbies, or help others through volunteering. Remember, your unique contributions matter. If you're struggling, seek guidance from a counselor at https://www.psychologytoday.com.";
        } else if (lowerMessage.includes('im all alone')) {
            return "Feeling alone can be tough, but you're not truly alone. Reach out to friends, family, or hotlines like 988. Online communities or support groups can also help. I'm here for you. For more support, visit https://www.nimh.nih.gov/health/topics/loneliness.";
        } else if (lowerMessage.includes('i feel lost')) {
            return "Feeling lost is a sign to explore. Journal your thoughts, seek mentorship, or try new experiences. Professional guidance can help clarify your path. Find a therapist at https://www.psychologytoday.com.";
        } else if (lowerMessage.includes('im bored')) {
            return "Boredom can be an opportunity. Engage in creative activities like drawing, reading, or learning a new skill. Physical exercise or connecting with others can boost your mood. If it's persistent, it might relate to deeper issues—talk to a professional.";
        } else if (lowerMessage.includes('good morning')) {
            return "Good morning! I hope you had a restful night. How are you feeling today? Remember, starting your day with positive thoughts can set a great tone.";
        } else if (lowerMessage.includes('good afternoon')) {
            return "Good afternoon! How's your day going so far? If you're feeling overwhelmed, take a moment to breathe and recharge.";
        } else if (lowerMessage.includes('good evening')) {
            return "Good evening! As the day winds down, reflect on what went well. How are you feeling right now? I'm here to listen.";
        } else if (lowerMessage.includes('good night')) {
            return "Good night! Sweet dreams and take care of yourself. Remember, tomorrow is a new opportunity. Sleep well!";
        } else if (lowerMessage.includes('how\'s it going') || lowerMessage.includes('how is it going')) {
            return "It's going well, thank you! I'm here to support you. How about you? What's on your mind today?";
        } else if (lowerMessage.includes('what\'s up') || lowerMessage.includes('whats up')) {
            return "Not much, just here to help you with your mental health journey. What's up with you? How can I assist?";
        } else if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('wassup')) {
            return "Hi there! I'm here to help you out with all of your mental health needs!";
        } else if (lowerMessage.includes('mental health')) {
            return "Mental health is a fundamental aspect of our overall well-being, just as important as physical health. It affects how we think, feel, and act, influencing our ability to handle stress, relate to others, and make choices. Good mental health enables us to realize our potential, cope with life's challenges, and contribute meaningfully to our communities.";
        } else if (lowerMessage.includes('thank you') || lowerMessage.includes('thanks')) {
            return "You're welcome! I'm here whenever you need support. Take care!";
        } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you')) {
            return "Goodbye! Take care of yourself. Remember, I'm here if you need to talk.";
        } else if (lowerMessage.includes('joke')) {
            return "Why don't scientists trust atoms? Because they make up everything!";
        } else if (lowerMessage.includes('motivate')) {
            return "You have the power to change your life. Every small step counts towards your goals. Believe in yourself and keep pushing forward. As Nelson Mandela said, 'It always seems impossible until it's done.'";
        } else if (userMessage.includes('?')) {
            // Handle questions
            return "That's a good question. Let's explore that together. What specifically are you wondering about regarding your mental health?";
        } else {
            // Placeholder for OpenAI API call
            // const response = await fetch('https://api.openai.com/v1/chat/completions', { ... });
            return "Thank you for sharing. I'm here to listen. How else can I support you?";
        }
    }

    // Send message
    sendBtn.addEventListener('click', async function () {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            const response = await getBotResponse(message);
            setTimeout(() => addMessage(response, 'bot'), 1000);
            userInput.value = '';
            userInput.style.height = 'auto';
        }
    });

    // Auto-resize textarea
    userInput.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });

    userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendBtn.click();
        }
    });

    // Voice input
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        voiceBtn.addEventListener('click', function () {
            if (settings.voice) recognition.start();
        });

        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            userInput.value = transcript;
            sendBtn.click();
        };

        recognition.onerror = function (event) {
            addMessage('Voice recognition error: ' + event.error, 'bot');
        };
    } else {
        voiceBtn.disabled = true;
        voiceBtn.textContent = 'Voice Not Supported';
    }

    // Emergency button
    emergencyBtn.addEventListener('click', function () {
        window.open('https://988lifeline.org/', '_blank');
    });

    // Profile edit
    editProfileBtn.addEventListener('click', function () {
        const newName = prompt('Enter your name:', userProfile.name);
        if (newName) {
            userProfile.name = newName;
            document.getElementById('user-name').textContent = newName;
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
        }
    });

    // Mood logging
    logMoodBtn.addEventListener('click', function () {
        const mood = moodSelect.value;
        const log = { mood, date: new Date().toLocaleDateString() };
        moodLogs.push(log);
        localStorage.setItem('moodLogs', JSON.stringify(moodLogs));
        updateMoodHistory();

        // Provide mood-specific solutions in chat
        let solutionMessage = '';
        switch (mood) {
            case 'happy':
                solutionMessage = "Great to hear you're feeling happy! Keep nurturing this by spending time with loved ones, pursuing hobbies, or practicing gratitude. Remember, happiness is contagious! If you need professional support, find a therapist at https://www.psychologytoday.com.";
                break;
            case 'sad':
                solutionMessage = "I'm sorry you're feeling sad. Try listening to uplifting music, going for a walk in nature, or journaling your thoughts. If it persists, consider talking to a friend or professional. Resources: https://www.nimh.nih.gov/health/topics/depression. Find a therapist: https://www.psychologytoday.com.";
                break;
            case 'anxious':
                solutionMessage = "Anxiety can be tough. Practice deep breathing: inhale for 4 seconds, hold for 4, exhale for 4. Ground yourself by naming 5 things you can see, 4 you can touch, etc. You're not alone. For professional help, contact a therapist via https://www.psychologytoday.com.";
                break;
            case 'stressed':
                solutionMessage = "Stress is common. Take a break, do some light exercise like stretching, or try mindfulness meditation. Prioritize self-care and break tasks into smaller steps. For professional support, find help at https://www.psychologytoday.com.";
                break;
            case 'neutral':
                solutionMessage = "Feeling neutral is okay. To boost your mood, try a new activity, connect with others, or set small goals. Reflect on what brings you joy. If you need professional guidance, visit https://www.psychologytoday.com.";
                break;
            default:
                solutionMessage = "Thanks for logging your mood. Remember, it's okay to feel different emotions. If you need support, I'm here. Find professionals at https://www.psychologytoday.com.";
        }
        setTimeout(() => addMessage(solutionMessage, 'bot'), 500);
    });

    function updateMoodHistory() {
        moodHistory.innerHTML = moodLogs.map(log => `<p>${log.date}: ${log.mood}</p>`).join('');
    }
    updateMoodHistory();

    // Settings
    voiceToggle.addEventListener('change', function () {
        settings.voice = this.checked;
        localStorage.setItem('settings', JSON.stringify(settings));
    });

    ttsToggle.addEventListener('change', function () {
        settings.tts = this.checked;
        localStorage.setItem('settings', JSON.stringify(settings));
    });

    darkModeToggle.addEventListener('click', function () {
        settings.darkMode = !settings.darkMode;
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('settings', JSON.stringify(settings));
    });

    // Load conversation history
    conversationHistory.forEach(item => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', item.sender);
        messageDiv.textContent = item.message;
        chatWindow.appendChild(messageDiv);
    });

    // Initial bot message
    if (conversationHistory.length === 0) {
        addMessage("Hello! I'm your advanced AI mental health support. How are you feeling today?", 'bot');
        setTimeout(() => addMessage("What's backing you from achieving your Goals! Let's Get that stuff be thrown!", 'bot'), 2000);
    }
});
