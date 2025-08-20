/* ==========================================
   PORTFOLIO WEBSITE JAVASCRIPT - BRIAN WHEAT
   ========================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // NAVIGATION FUNCTIONALITY
    // ==========================================
    
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // ==========================================
    // NAVBAR SCROLL EFFECTS
    // ==========================================
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // Add scrolled class for navbar styling
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation link based on scroll position
        updateActiveNavLink();
    });
    
    // Function to update active navigation link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100; // Offset for navbar height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current section's nav link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    // ==========================================
    // SMOOTH SCROLLING
    // ==========================================
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Smooth scroll for hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================
    // SCROLL ANIMATIONS
    // ==========================================
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .stat');
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // ==========================================
    // TYPING ANIMATION FOR HERO SUBTITLE
    // ==========================================
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const originalText = heroSubtitle.textContent;
    const titles = [
        'Senior Software Engineer',
        'Full Stack Developer',
        'C# & .NET Expert',
        'Angular Specialist',
        'Enterprise Solutions Architect'
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function typeWriter() {
        const currentTitle = titles[titleIndex];
        
        if (!isDeleting && !isPaused) {
            // Typing
            heroSubtitle.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentTitle.length) {
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                }, 2000); // Pause for 2 seconds
            }
        } else if (isDeleting && !isPaused) {
            // Deleting
            heroSubtitle.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
            }
        }
        
        const typingSpeed = isDeleting ? 50 : 100;
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 1000);
    
    // ==========================================
    // CONTACT FORM HANDLING
    // ==========================================
    
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Simple form validation
        if (validateForm(formObject)) {
            // Simulate form submission
            showFormMessage('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
        }
    });
    
    function validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!data.name || data.name.trim().length < 2) {
            showFormMessage('Please enter a valid name (at least 2 characters).', 'error');
            return false;
        }
        
        if (!emailRegex.test(data.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return false;
        }
        
        if (!data.subject || data.subject.trim().length < 3) {
            showFormMessage('Please enter a valid subject (at least 3 characters).', 'error');
            return false;
        }
        
        if (!data.message || data.message.trim().length < 10) {
            showFormMessage('Please enter a valid message (at least 10 characters).', 'error');
            return false;
        }
        
        return true;
    }
    
    function showFormMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        
        // Style the message
        messageElement.style.cssText = `
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
            ${type === 'success' 
                ? 'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
                : 'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
            }
        `;
        
        // Insert message at the top of the form
        contactForm.insertBefore(messageElement, contactForm.firstChild);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
    
    // ==========================================
    // SKILLS ANIMATION
    // ==========================================
    
    function animateSkills() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'all 0.3s ease-out';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            }, index * 50);
        });
    }
    
    // Animate skills when skills section comes into view
    const skillsSection = document.getElementById('skills');
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // ==========================================
    // PROJECT CARD INTERACTIONS
    // ==========================================
    
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const overlay = card.querySelector('.project-overlay');
        const links = card.querySelectorAll('.project-link');
        
        // Add click handlers for project links
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const linkText = this.textContent.toLowerCase();
                
                if (linkText.includes('demo')) {
                    showMessage('Live demo would open here!', 'info');
                } else if (linkText.includes('github')) {
                    showMessage('GitHub repository would open here!', 'info');
                }
            });
        });
    });
    
    function showMessage(message, type) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        // Style the toast
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: #2563eb;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 1001;
            transform: translateX(400px);
            transition: transform 0.3s ease-out;
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    // ==========================================
    // COUNTER ANIMATION FOR STATS
    // ==========================================
    
    function animateCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const finalValue = stat.textContent.replace(/[^0-9]/g, '');
            const suffix = stat.textContent.replace(/[0-9]/g, '');
            
            if (finalValue) {
                animateCounter(stat, parseInt(finalValue), suffix);
            }
        });
    }
    
    function animateCounter(element, target, suffix) {
        let current = 0;
        const increment = target / 50; // 50 steps
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 30);
    }
    
    // Animate counters when about section comes into view
    const aboutSection = document.getElementById('about');
    const aboutObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }
    
    // ==========================================
    // SCROLL TO TOP FUNCTIONALITY
    // ==========================================
    
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ==========================================
    // PRELOADER (Optional)
    // ==========================================
    
    // Add simple fade-in animation for the page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
    
    // ==========================================
    // KEYBOARD NAVIGATION
    // ==========================================
    
    // Handle keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        // Navigate sections with arrow keys (when not in form inputs)
        if (!e.target.matches('input, textarea')) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                navigateToNextSection(e.key === 'ArrowDown');
            }
        }
    });
    
    function navigateToNextSection(isDown) {
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const currentScrollPos = window.scrollY + window.innerHeight / 2;
        
        let currentSectionIndex = 0;
        
        // Find current section
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (currentScrollPos >= sectionTop && currentScrollPos <= sectionBottom) {
                currentSectionIndex = index;
            }
        });
        
        // Navigate to next/previous section
        let targetIndex;
        if (isDown) {
            targetIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
        } else {
            targetIndex = Math.max(currentSectionIndex - 1, 0);
        }
        
        const targetSection = sections[targetIndex];
        if (targetSection) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // ==========================================
    // PERFORMANCE OPTIMIZATION
    // ==========================================
    
    // Lazy load images when they come into view
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    // Observe any images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // Debounce scroll events for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(function() {
            // Scroll-dependent operations here
        }, 10);
    }, { passive: true });
    
    console.log('Portfolio website loaded successfully!');
});