const stressQuotes = [
    "\"The greatest glory in living lies not in never falling, but in rising every time we fall.\" – Nelson Mandela",
    "\"You miss 100% of the shots you don't take.\" – Wayne Gretzky",
    "\"The way to get started is to quit talking and begin doing.\" – Walt Disney",
    "\"Your time is limited, so don't waste it living someone else's life.\" – Steve Jobs",
    "\"If life were predictable it would cease to be life, and be without flavor.\" – Eleanor Roosevelt",
    "\"If you look at what you have in life, you'll always have more.\" – Oprah Winfrey",
    "\"If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.\" – James Cameron",
    "\"Life is what happens to you while you're busy making other plans.\" – John Lennon",
    "\"Spread love everywhere you go. Let no one ever come to you without leaving happier.\" – Mother Teresa",
    "\"When you reach the end of your rope, tie a knot in it and hang on.\" – Franklin D. Roosevelt"
];

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const studentNameInput = document.getElementById('student-name');
    const courseInput = document.getElementById('course');
    const rollNumberInput = document.getElementById('roll-number');
    const stressQuoteDiv = document.getElementById('stress-quote');

    // Display a random stress relief quote
    const randomQuote = stressQuotes[Math.floor(Math.random() * stressQuotes.length)];
    stressQuoteDiv.textContent = randomQuote;

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const studentName = studentNameInput.value.trim();
        const course = courseInput.value;
        const rollNumber = rollNumberInput.value.trim();

        if (!studentName || !course || !rollNumber) {
            alert('Please fill in all fields.');
            return;
        }

        if (rollNumber.length !== 11 || !/^[A-Za-z0-9]+$/.test(rollNumber)) {
            alert('Roll Number must be exactly 11 characters (alphanumeric).');
            return;
        }

        // Store login data in localStorage
        const studentData = {
            name: studentName,
            course: course,
            rollNumber: rollNumber
        };
        localStorage.setItem('studentData', JSON.stringify(studentData));

        // Clear previous chats
        localStorage.removeItem('conversationHistory');
        localStorage.removeItem('moodLogs');

        // Redirect to welcome page
        window.location.href = 'welcome.html';
    });
});
