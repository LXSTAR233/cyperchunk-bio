/* Smooth Neon Ring Follower Script (Lerp Interpolation) */
const follower = document.getElementById('cursor-follower');
let mouseX = -100, mouseY = -100;
let followerX = -100, followerY = -100;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateFollower() {
    // Linear Interpolation (Lerp) for ultra-smooth trailing ring
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Add hover reaction when hovering interactive elements
const interactiveElements = document.querySelectorAll('a, button, .tilt-card, .interactive-element');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hovered'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hovered'));
});

/* Interactive Canvas Cyber Nodes Background */
const canvas = document.getElementById('cyber-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 1.5 + 0.5;
        this.color = ['#00f0ff', '#ff4655', '#5865F2'][Math.floor(Math.random() * 3)];
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const count = Math.min(Math.floor(window.innerWidth / 15), 60);
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}
initParticles();

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0, 240, 255, ${1 - dist / 120 * 0.8})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

/* Typing Effect for Intro Box */
const typingText = document.getElementById('typing-text');
const textToType = "> Status: Ready. Click enter to access links grid.";
let charIdx = 0;

function typeEffect() {
    if (charIdx < textToType.length) {
        typingText.textContent += textToType.charAt(charIdx);
        charIdx++;
        setTimeout(typeEffect, 40);
    }
}
setTimeout(typeEffect, 800);

/* Enter Site Logic */
function enterSite() {
    const intro = document.getElementById('intro-overlay');
    const main = document.getElementById('main-content');
    
    intro.classList.add('opacity-0');
    setTimeout(() => {
        intro.style.display = 'none';
        main.classList.remove('opacity-0');
        const music = document.getElementById('bg-music');
        music.volume = 0.4;
        music.play().then(() => {
            document.getElementById('music-icon').className = 'fa-solid fa-pause text-cyber-red';
            document.getElementById('visualizer').classList.remove('opacity-40');
        }).catch(() => {});
    }, 700);
}

/* Audio Controls */
function toggleAudio() {
    const music = document.getElementById('bg-music');
    const icon = document.getElementById('music-icon');
    const viz = document.getElementById('visualizer');

    if (music.paused) {
        music.play();
        icon.className = 'fa-solid fa-pause text-cyber-red';
        viz.classList.remove('opacity-40');
        showToast("Playing Cyber Lofi Music");
    } else {
        music.pause();
        icon.className = 'fa-solid fa-play text-cyber-blue';
        viz.classList.add('opacity-40');
        showToast("Music Paused");
    }
}

/* 3D Vanilla Tilt Effect for Cards */
const cards = document.querySelectorAll('.tilt-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
});

/* Discord Modal Controls */
function openDiscordModal() {
    const modal = document.getElementById('discord-modal');
    const box = document.getElementById('modal-box');
    modal.classList.remove('pointer-events-none', 'opacity-0');
    box.classList.remove('scale-95');
    box.classList.add('scale-100');
}

function closeDiscordModal() {
    const modal = document.getElementById('discord-modal');
    const box = document.getElementById('modal-box');
    modal.classList.add('pointer-events-none', 'opacity-0');
    box.classList.remove('scale-100');
    box.classList.add('scale-95');
}

document.getElementById('discord-modal').addEventListener('click', (e) => {
    if (e.target.id === 'discord-modal') {
        closeDiscordModal();
    }
});

/* Copy Discord Link */
function copyDiscordLink() {
    const link = 'https://discord.gg/evq3f7cQT';
    const tempInput = document.createElement('input');
    tempInput.value = link;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    showToast("Copied Discord invite link!");
}

/* Toast Popup Notification */
function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    toastMsg.textContent = msg;
    toast.classList.remove('translate-x-full');
    
    setTimeout(() => {
        toast.classList.add('translate-x-full');
    }, 3000);
}