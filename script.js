// ===================================
// SMOOTH SCROLLING & NAVIGATION
// ===================================

// Get all navigation links
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

// Smooth scroll to section
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });

      // Close mobile menu if open
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      }
    }
  });
});

// ===================================
// ACTIVE NAVIGATION STATE
// ===================================

function updateActiveNav() {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll);

// ===================================
// MOBILE MENU TOGGLE
// ===================================

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
    navMenu.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
  }
});

// ===================================
// SCROLL REVEAL ANIMATIONS
// ===================================

const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  const revealPoint = 100;

  scrollRevealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add('revealed');
    }
  });
};

// Initial check on page load
window.addEventListener('load', revealOnScroll);

// Check on scroll
window.addEventListener('scroll', revealOnScroll);

// ===================================
// INTERSECTION OBSERVER (Better Performance)
// ===================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, observerOptions);

scrollRevealElements.forEach(element => {
  observer.observe(element);
});

// ===================================
// PROJECT FILTERING
// ===================================

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');

    const filterValue = button.getAttribute('data-filter');

    projectCards.forEach(card => {
      const categories = card.getAttribute('data-category').split(' ');

      if (filterValue === 'all' || categories.includes(filterValue)) {
        card.classList.remove('hide');
        card.classList.add('show');
      } else {
        card.classList.remove('show');
        card.classList.add('hide');
      }
    });
  });
});

// ===================================
// CONTACT FORM HANDLING
// ===================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form data
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };

  // Simulate form submission (replace with actual backend call)
  console.log('Form submitted:', formData);

  // Show success message
  alert('Thank you for your message! I will get back to you soon.');

  // Reset form
  contactForm.reset();

  // In a real application, you would send this data to a backend service:
  // fetch('/api/contact', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(formData)
  // })
  // .then(response => response.json())
  // .then(data => {
  //   alert('Message sent successfully!');
  //   contactForm.reset();
  // })
  // .catch(error => {
  //   alert('Error sending message. Please try again.');
  // });
});

// ===================================
// FORM VALIDATION
// ===================================

const formInputs = document.querySelectorAll('.form-input, .form-textarea');

formInputs.forEach(input => {
  input.addEventListener('blur', () => {
    if (input.value.trim() === '' && input.hasAttribute('required')) {
      input.style.borderColor = '#ef4444'; // Red color for error
    } else {
      input.style.borderColor = ''; // Reset to default
    }
  });

  input.addEventListener('focus', () => {
    input.style.borderColor = 'var(--color-primary)';
  });
});

// ===================================
// TYPING EFFECT (Optional Enhancement)
// ===================================

// Uncomment to add typing effect to the tagline
/*
const tagline = document.querySelector('.tagline');
const taglineText = tagline.textContent;
tagline.textContent = '';

let charIndex = 0;

function typeText() {
  if (charIndex < taglineText.length) {
    tagline.textContent += taglineText.charAt(charIndex);
    charIndex++;
    setTimeout(typeText, 50);
  }
}

window.addEventListener('load', () => {
  setTimeout(typeText, 1000);
});
*/

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Apply debounce to scroll handlers
window.addEventListener('scroll', debounce(updateActiveNav));
window.addEventListener('scroll', debounce(handleNavbarScroll));

// ===================================
// PRELOAD ANIMATIONS
// ===================================

// Add fade-in animation to hero section on page load
window.addEventListener('load', () => {
  const heroElements = document.querySelectorAll('.fade-in-up');
  heroElements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, index * 200);
  });
});

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c👋 Hi there!', 'font-size: 20px; font-weight: bold; color: #0ea5e9;');
console.log('%cLooking at the code? I like your curiosity!', 'font-size: 14px; color: #374151;');
console.log('%cFeel free to reach out if you want to collaborate!', 'font-size: 14px; color: #374151;');
