// ========= SHORTCUT SELECTORS =========
const qs = (s) => document.querySelector(s);
const qsa = (s) => Array.from(document.querySelectorAll(s));


// ========= SMOOTH SCROLLING =========
qsa('nav ul li a').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');

    if (!href || href === '#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// ========= LOGO CLICK (GO TO TOP) =========
const logo = qs('.navbar .logo');
if (logo) {
  logo.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


// ========= ACTIVE NAVBAR ON SCROLL =========
const sections = qsa('section[id]');
const navLinks = qsa('nav ul li a');

function updateActiveNav() {
  let top = window.scrollY;
  let currentId = null;

  sections.forEach(sec => {
    const offset = sec.offsetTop - 160;
    const height = sec.offsetHeight;

    if (top >= offset && top < offset + height) {
      currentId = sec.id;
    }
  });

  navLinks.forEach(link => {
    const li = link.parentElement;
    li.classList.remove('active1');

    const href = link.getAttribute('href');

    // Match active section
    if (href === `#${currentId}`) {
      li.classList.add('active1');
    }

    // Top of page → highlight Home
    if (!currentId && link.textContent.trim().toLowerCase() === 'home') {
      li.classList.add('active1');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);


// ========= PORTFOLIO REVEAL ON SCROLL =========
const portfolio = qs('.portfolio');
if (portfolio) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        portfolio.classList.add('visible');
        observer.unobserve(portfolio);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(portfolio);
}


// ========= CONTACT FORM SEND BUTTON =========
const sendBtn = qs('.btn-sci1 .btn');
const nameInput = qs('#name');
const emailInput = qs('#email');
const messageInput = qs('.about-form textarea');

if (sendBtn) {
  sendBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      alert("Please fill in Name, Email, and Message.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    alert("Message Sent Successfully! Thank you 😊");

    // Clear fields
    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
  });
}


// ========= IMAGE FALLBACK (IF IMAGE FAILS TO LOAD) =========
qsa('.home-img img, .about-img img').forEach(img => {
  img.addEventListener('error', () => {
    const item = img.closest('.img-item');
    img.style.display = 'none';

    if (!item.querySelector('.initials')) {
      const initials = document.createElement('div');
      initials.className = 'initials';
      initials.textContent = 'RS';
      initials.style.fontSize = '60px';
      initials.style.fontWeight = '700';
      initials.style.color = '#7cf03d';
      item.appendChild(initials);
    }
  });
});


