
// Select all sections and nav links
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".navbar ul li");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute("id");
        }
    });

    navLi.forEach((li) => {
        li.classList.remove("active");
        if (li.querySelector("a").getAttribute("href") === `#${current}`) {
            li.classList.add("active");
        }
    });
});


// JavaScript to handle popup
const form = document.getElementById('contactForm');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    popup.style.display = 'flex';
    form.reset(); 
});

closePopup.addEventListener('click', function() {
    popup.style.display = 'none';
});

window.addEventListener('click', function(e) {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});

