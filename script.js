document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    function setActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);
    setActiveNav(); // Set initial active state

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop;
    });

    // Typing animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .about-stats .stat');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Skills hover effect
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Contact form handling with Formspree
    const contactForm = document.querySelector('.contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.querySelector('.btn-text');
    const btnSpinner = document.querySelector('.btn-spinner');
    const formMessages = document.getElementById('form-messages');

    if (contactForm) {
        console.log('✅ Contact form found and initialized');
        console.log('📍 Form action URL:', contactForm.action);
        console.log('📍 Form method:', contactForm.method);
        
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('🚀 Form submission started');
            
            // Clear previous messages
            clearFormMessages();
            clearFieldErrors();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name')?.trim() || '';
            const email = formData.get('email')?.trim() || '';
            const subject = formData.get('subject')?.trim() || '';
            const message = formData.get('message')?.trim() || '';

            console.log('📝 Form data collected:', {
                name: name ? `"${name}" (${name.length} chars)` : 'EMPTY',
                email: email ? `"${email}"` : 'EMPTY',
                subject: subject ? `"${subject}" (${subject.length} chars)` : 'EMPTY',
                message: message ? `"${message.substring(0, 50)}..." (${message.length} chars)` : 'EMPTY'
            });

            // Validate form fields
            let isValid = true;
            const validationErrors = [];

            if (!name || name.length < 2) {
                showFieldError('name', 'Name must be at least 2 characters long');
                validationErrors.push('Name validation failed');
                isValid = false;
            }

            if (!email || !isValidEmail(email)) {
                showFieldError('email', 'Please enter a valid email address');
                validationErrors.push('Email validation failed');
                isValid = false;
            }

            if (!subject || subject.length < 3) {
                showFieldError('subject', 'Subject must be at least 3 characters long');
                validationErrors.push('Subject validation failed');
                isValid = false;
            }

            if (!message || message.length < 10) {
                showFieldError('message', 'Message must be at least 10 characters long');
                validationErrors.push('Message validation failed');
                isValid = false;
            }

            if (!isValid) {
                console.log('❌ Form validation failed:', validationErrors);
                showFormMessage('Please correct the errors above', 'error');
                return;
            }

            console.log('✅ Form validation passed');

            // Show loading state
            setLoadingState(true);
            console.log('⏳ Loading state activated');

            try {
                console.log('📤 Submitting to Formspree endpoint:', this.action);
                
                // Submit to Formspree
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                console.log('📥 Response received:', {
                    status: response.status,
                    statusText: response.statusText,
                    ok: response.ok,
                    url: response.url
                });

                if (response.ok) {
                    console.log('🎉 Form submitted successfully!');
                    showFormMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
                    this.reset();
                    console.log('🔄 Form reset completed');
                } else {
                    console.log('⚠️ Form submission failed with status:', response.status);
                    let errorData;
                    try {
                        errorData = await response.json();
                        console.log('📄 Error response data:', errorData);
                    } catch (parseError) {
                        console.log('❌ Failed to parse error response:', parseError);
                        errorData = null;
                    }
                    
                    if (errorData && errorData.errors) {
                        const errorMessages = errorData.errors.map(error => error.message).join(', ');
                        console.log('📋 Specific errors:', errorMessages);
                        showFormMessage(`Error: ${errorMessages}`, 'error');
                    } else {
                        console.log('❌ Generic error response');
                        showFormMessage('There was a problem sending your message. Please try again.', 'error');
                    }
                }
            } catch (error) {
                console.error('🔥 Network/fetch error occurred:', error);
                console.error('Error details:', {
                    message: error.message,
                    name: error.name,
                    stack: error.stack
                });
                showFormMessage('There was a network error. Please check your connection and try again.', 'error');
            } finally {
                setLoadingState(false);
                console.log('⏹️ Loading state deactivated');
            }
        });
    } else {
        console.error('❌ Contact form not found! Check if .contact-form element exists');
    }

    // Form helper functions
    function setLoadingState(loading) {
        if (loading) {
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnSpinner.style.display = 'inline';
        } else {
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnSpinner.style.display = 'none';
        }
    }

    function showFieldError(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function clearFieldErrors() {
        const errorElements = document.querySelectorAll('.form-error');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
    }

    function showFormMessage(message, type) {
        if (formMessages) {
            formMessages.innerHTML = `<div class="form-message form-message--${type}">${message}</div>`;
            formMessages.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    function clearFormMessages() {
        if (formMessages) {
            formMessages.innerHTML = '';
        }
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        if (type === 'success') {
            notification.style.backgroundColor = '#10b981';
        } else if (type === 'error') {
            notification.style.backgroundColor = '#ef4444';
        } else {
            notification.style.backgroundColor = '#3b82f6';
        }

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = hero.querySelector('.hero-container');
            const speed = scrolled * 0.2;
            
            if (parallax) {
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add CSS for loading animation
        const style = document.createElement('style');
        style.textContent = `
            body:not(.loaded) {
                overflow: hidden;
            }
            
            body:not(.loaded)::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            body:not(.loaded)::after {
                content: '';
                position: fixed;
                top: 50%;
                left: 50%;
                width: 50px;
                height: 50px;
                border: 3px solid #e2e8f0;
                border-top: 3px solid #2563eb;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                transform: translate(-50%, -50%);
                z-index: 10001;
            }
            
            @keyframes spin {
                0% { transform: translate(-50%, -50%) rotate(0deg); }
                100% { transform: translate(-50%, -50%) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    });

    // Back to top button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: var(--shadow-lg);
    `;

    document.body.appendChild(backToTop);

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });

    // Add hover effects to back to top button
    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.15)';
    });

    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'var(--shadow-lg)';
    });

    // Professional Photo Loading Handler
    function handleImageLoading() {
        const profileImages = document.querySelectorAll('.profile-img, .about-profile-img');
        
        profileImages.forEach(img => {
            const container = img.closest('.profile-photo, .about-profile-photo');
            const loadingElement = container.querySelector('.photo-loading, .about-photo-loading');
            const fallbackElement = container.querySelector('.photo-fallback, .about-photo-fallback');
            
            // Show loading initially
            if (loadingElement) {
                loadingElement.classList.remove('hidden');
            }
            
            // Hide fallback initially
            if (fallbackElement) {
                fallbackElement.classList.remove('show');
            }

            // Handle successful load
            img.addEventListener('load', function() {
                console.log('✅ Profile image loaded successfully:', this.src);
                
                // Add a small delay for smooth transition
                setTimeout(() => {
                    this.classList.add('loaded');
                    
                    // Hide loading spinner
                    if (loadingElement) {
                        loadingElement.classList.add('hidden');
                    }
                    
                    // Ensure fallback is hidden
                    if (fallbackElement) {
                        fallbackElement.classList.remove('show');
                    }
                }, 100);
            });

            // Handle load error with retry
            let retryCount = 0;
            const maxRetries = 2;
            
            img.addEventListener('error', function() {
                console.log(`❌ Profile image failed to load (attempt ${retryCount + 1}):`, this.src);
                
                if (retryCount < maxRetries) {
                    retryCount++;
                    console.log(`🔄 Retrying image load (attempt ${retryCount + 1}/${maxRetries + 1})`);
                    
                    // Add a small delay before retry
                    setTimeout(() => {
                        this.src = this.src + '?retry=' + retryCount;
                    }, 1000 * retryCount);
                } else {
                    console.log('❌ Max retries reached, showing fallback');
                    this.classList.add('error');
                    
                    // Hide loading spinner
                    if (loadingElement) {
                        loadingElement.classList.add('hidden');
                    }
                    
                    // Show fallback
                    if (fallbackElement) {
                        fallbackElement.classList.add('show');
                    }
                }
            });

            // If image is already cached and loaded
            if (img.complete) {
                if (img.naturalWidth === 0) {
                    // Image failed to load
                    img.dispatchEvent(new Event('error'));
                } else {
                    // Image loaded successfully
                    img.dispatchEvent(new Event('load'));
                }
            }
        });
    }

    // Initialize image loading
    handleImageLoading();

    // Intersection Observer for image optimization
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Add fade-in animation when image comes into view
                    img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    // Stop observing this image
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        // Observe all profile images
        document.querySelectorAll('.profile-img, .about-profile-img').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add subtle parallax effect to hero photo
    const heroPhoto = document.querySelector('.profile-photo-container');
    if (heroPhoto) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.1;
            
            if (scrolled < window.innerHeight) {
                heroPhoto.style.transform = `translateY(${rate}px)`;
            }
        });
    }
});