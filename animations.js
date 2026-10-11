// AOS (Animate On Scroll) Lite Implementation
class SimpleAOS {
  constructor() {
    this.elements = [];
    this.init();
  }

  init() {
    // Select all elements with data-aos attribute
    this.elements = document.querySelectorAll('[data-aos]');
    
    // Theme toggle functionality
    this.setupThemeToggle();
    
    // Animate on scroll
    window.addEventListener('scroll', () => this.checkElements());
    
    // Initial check
    this.checkElements();
  }

  setupThemeToggle() {
    const checkbox = document.getElementById('darkModeCheckbox');
    const body = document.body;
    
    // Load saved preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      checkbox.checked = true;
      body.classList.add('dark-mode');
    }
    
    // Toggle event
    checkbox.addEventListener('change', () => {
      const isChecked = checkbox.checked;
      if (isChecked) {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
      } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
      }
    });
  }

  checkElements() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;

    this.elements.forEach(element => {
      if (element.classList.contains('aos-animate')) return;

      const elementTop = element.getBoundingClientRect().top + scrollTop;
      const elementBottom = elementTop + element.clientHeight;

      // Trigger animation when element is 75% in viewport
      if (scrollTop + windowHeight * 0.75 > elementTop && scrollTop < elementBottom) {
        this.animateElement(element);
      }
    });
  }

  animateElement(element) {
    const animation = element.getAttribute('data-aos');
    const delay = element.getAttribute('data-aos-delay') || 0;

    element.style.animation = `${animation} 0.8s ease-out ${delay}ms both`;
    element.classList.add('aos-animate');
  }
}

// Animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes fade-down {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes zoom-in {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes flip-left {
    from {
      opacity: 0;
      transform: rotateY(-90deg) translateX(-30px);
    }
    to {
      opacity: 1;
      transform: rotateY(0) translateX(0);
    }
  }

  @keyframes slide-in-left {
    from {
      opacity: 0;
      transform: translateX(-60px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slide-in-right {
    from {
      opacity: 0;
      transform: translateX(60px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .aos-animate {
    animation-duration: 0.8s;
    animation-fill-mode: both;
  }
`;
document.head.appendChild(style);

// Initialize animations
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SimpleAOS();
  });
} else {
  new SimpleAOS();
}
