document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
});

/* ===============================
   SMOOTH SCROLL BEHAVIOR
================================ */

// Enable smooth scroll globally
document.documentElement.style.scrollBehavior = "smooth";

// Navbar smooth scrolling
document.querySelectorAll(".navbar a").forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");

    // ✅ If it's a normal page link → let browser handle it
    if (!href || !href.startsWith("#")) return;

    // ✅ Only prevent default for in-page anchors
    e.preventDefault();

    const targetSection = document.querySelector(href);
    if (!targetSection) return;

    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});


const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach(el => observer.observe(el));


/* ===============================
   NAVBAR CLICK ANIMATION
================================ */

document.querySelectorAll(".navbar a").forEach(link => {
  link.addEventListener("click", () => {
    link.classList.add("active");

    setTimeout(() => {
      link.classList.remove("active");
    }, 400);
  });
});

/* ================= Toggle Menu ================= */

const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("navLinks");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
    toggle.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      toggle.classList.remove("active");
    });
  });
}



/*==================================================
             CONTACT PAGE 
  ==================================================*/

  function initContactForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.style.opacity = '0.7';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #2ee6a6, #3aa0ff)';

            setTimeout(() => {
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
            }, 2000);
        }, 1500);
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
// EMAIL JS – Combined & Fixed

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
    };

    emailjs
        .send("service_d5d2nss", "template_u22pf8s", params)
        .catch((error) => {
            console.error("EmailJS Error:", error);
            alert("Failed to send email.");
        });
});


