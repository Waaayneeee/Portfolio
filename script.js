// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Light / Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

if (localStorage.getItem('theme') === 'light') {
    htmlElement.classList.remove('dark');
    if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
} else {
    htmlElement.classList.add('dark');
    if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        if (htmlElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.className = 'fa-solid fa-moon';
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.className = 'fa-solid fa-sun';
        }
    });
}

// Active Nav Link Underline via Scroll and Click
const navLinks = document.querySelectorAll('.nav-links a, #mobile-menu a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
});

// Project Modal Functions
function openProjectModal(title, desc) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-desc').innerText = desc;
    document.getElementById('project-modal').classList.remove('hidden');
}

function closeProjectModal() {
    document.getElementById('project-modal').classList.add('hidden');
}

// Contact Form Submission & Toast
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        toast.classList.remove('hidden');
        contactForm.reset();
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 4000);
    });
}

// AI Chatbot Logic
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatBody = document.getElementById('chat-body');

if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('hidden');
        if (!chatbotWindow.classList.contains('hidden')) {
            chatInput.focus();
        }
    });

    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.add('hidden');
    });
}

if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userText = chatInput.value.trim();
        if (!userText) return;

        // Append User Message
        appendMessage(userText, 'user');
        chatInput.value = '';

        // Simulate Bot Response after brief delay
        setTimeout(() => {
            const botReply = generateBotResponse(userText);
            appendMessage(botReply, 'bot');
        }, 600);
    });
}

function appendMessage(text, sender) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerText = text;
    chatBody.appendChild(bubble);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function generateBotResponse(input) {
    const query = input.toLowerCase();
    
    if (query.includes('hello') || query.includes('hi')) {
        return "Hello! I am the virtual assistant of John Wayne. Would you like to know anything about his skills or projects??";
    } else if (query.includes('project') || query.includes('system')) {
        return "He built Payroll & Employee Management System (PHP/MySQL) and Mine Game mini-game!";
    } else if (query.includes('skill') || query.includes('language') || query.includes('code')) {
        return "His core skills are HTML/CSS, JavaScript, PHP, MySQL, and Git workflows.";
    } else if (query.includes('contact') || query.includes('email') || query.includes('reach')) {
        return "You can contact him via email: maravewayne@gmail.com or the form below the portfolio.";
    } else if (query.includes('age') || query.includes('who')) {
        return "John Wayne Marave is 19 years old, studying BS Computer Science at Lipa City Colleges.";
    } else {
        return "That's interesting! For other questions, you can direct them to Wayne via email or his social media links.";
    }
}