class ModernPortfolio {
    constructor() {
        this.projects = [
            {
                id: 1,
                title: "Project M-AI-D",
                description: "AI-powered lumbar spine detection using advanced computer vision and transfer learning techniques for medical imaging applications.",
                tags: ["AI/ML", "Computer Vision", "Medical"],
                categories: ["ai", "vision"],
                image: "project-maid-thumb.jpg",
                links: {
                    demo: "#",
                    github: "#"
                }
            },
            {
                id: 2,
                title: "THRILS XR Training",
                description: "Immersive surgical training platform combining VR technology with haptic feedback for enhanced learning experiences.",
                tags: ["XR", "VR", "Training", "Healthcare"],
                categories: ["robotics", "vision"],
                image: "thrils-thumb.jpg",
                links: {
                    demo: "#",
                    publication: "#"
                }
            },
            {
                id: 3,
                title: "Smart OR System",
                description: "Gaze-contingent surgical lighting system using eye-tracking technology and Raspberry Pi embedded computing.",
                tags: ["Eye Tracking", "IoT", "Embedded"],
                categories: ["electronics", "vision"],
                image: "smart-or-thumb.jpg",
                links: {
                    demo: "#",
                    github: "#"
                }
            },
            {
                id: 4,
                title: "Agricultural Drone Vision",
                description: "AI-powered computer vision system for autonomous crop monitoring and precision agriculture applications.",
                tags: ["Drones", "Agriculture", "Computer Vision"],
                categories: ["ai", "vision"],
                image: "agri-drone-thumb.jpg",
                links: {
                    demo: "#"
                }
            },
            {
                id: 5,
                title: "Robotic Surgery Assistant",
                description: "Advanced robotic system with AI-powered decision support for minimally invasive surgical procedures.",
                tags: ["Robotics", "AI", "Surgery"],
                categories: ["robotics", "ai"],
                image: "robot-surgery-thumb.jpg",
                links: {
                    publication: "#"
                }
            },
            {
                id: 6,
                title: "Encoder Diagnostic System",
                description: "High-precision electronic design and development of optical encoders for metrology applications at Renishaw PLC.",
                tags: ["Electronics", "PCB Design", "Metrology"],
                categories: ["electronics"],
                image: "renishaw-encoder-thumb.jpg",
                links: {
                    demo: "#"
                }
            }
        ];

        this.currentFilter = 'all';
        this.isScrolling = false;
        this.currentRoleIndex = 0;
        this.roles = ['ai', 'robotics', 'vision', 'electronics'];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollEffects();
        this.initializeAnimations();
        this.loadProjects();
        this.startRoleRotation();
        this.initializeSkillBars();
        this.setupThemeToggle();
        this.setupFormHandlers();
        this.initializeCounters();
    }

    setupEventListeners() {
        // Navigation scroll effect
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', this.handleSmoothScroll.bind(this));
        });

        // Project filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', this.handleFilterClick.bind(this));
        });

        // Hero CTA buttons
        const exploreBtn = document.getElementById('explore-work');
        const downloadBtn = document.getElementById('download-cv');
        
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                document.getElementById('projects').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            });
        }

        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                // In a real implementation, this would download the CV
                this.showNotification('CV download would start here', 'info');
            });
        }

        // Orbit item interactions
        document.querySelectorAll('.orbit-item').forEach(item => {
            item.addEventListener('click', this.handleOrbitItemClick.bind(this));
        });
    }

    handleScroll() {
        if (this.isScrolling) return;
        
        this.isScrolling = true;
        requestAnimationFrame(() => {
            const nav = document.querySelector('.nav-wrapper');
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            
            // Update active navigation link
            this.updateActiveNavLink();
            
            this.isScrolling = false;
        });
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
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

    handleSmoothScroll(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    handleFilterClick(e) {
        const filter = e.target.dataset.filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');
        
        this.currentFilter = filter;
        this.filterProjects();
    }

    handleOrbitItemClick(e) {
        const tech = e.target.closest('.orbit-item').dataset.tech;
        this.showNotification(`${tech} - One of my core technologies!`, 'info');
    }

    setupScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe sections and cards
        setTimeout(() => {
            const elementsToAnimate = document.querySelectorAll(
                '.expertise-item, .stat-item, .timeline-item, .skill-category, .project-card, .contact-method'
            );
            
            elementsToAnimate.forEach(el => observer.observe(el));
        }, 500);
    }

    initializeAnimations() {
        // Add staggered animation delays
        document.querySelectorAll('.expertise-item').forEach((item, index) => {
            item.style.animationDelay = `${index * 0.2}s`;
        });

        document.querySelectorAll('.stat-item').forEach((item, index) => {
            item.style.animationDelay = `${index * 0.3}s`;
        });
    }

    startRoleRotation() {
        const roles = document.querySelectorAll('.role');
        
        setInterval(() => {
            roles[this.currentRoleIndex].classList.remove('active');
            this.currentRoleIndex = (this.currentRoleIndex + 1) % roles.length;
            roles[this.currentRoleIndex].classList.add('active');
        }, 3000);
    }

    loadProjects() {
        const grid = document.getElementById('projects-grid');
        if (!grid) return;

        grid.innerHTML = '';
        
        this.projects.forEach((project, index) => {
            const projectCard = this.createProjectCard(project);
            projectCard.style.animationDelay = `${index * 0.1}s`;
            grid.appendChild(projectCard);
        });
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.categories = project.categories.join(',');

        const tags = project.tags.map(tag => 
            `<span class="project-tag">${tag}</span>`
        ).join('');

        const links = Object.entries(project.links).map(([type, url]) => 
            `<a href="${url}" class="project-link" target="_blank">
                <i class="fas fa-${this.getLinkIcon(type)}"></i> ${type}
            </a>`
        ).join('');

        card.innerHTML = `
            <div class="project-image"></div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">${tags}</div>
                <div class="project-links">${links}</div>
            </div>
        `;

        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-12px) rotateX(5deg)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0)';
        });

        return card;
    }

    getLinkIcon(type) {
        const icons = {
            demo: 'play',
            github: 'code',
            publication: 'file-alt',
            website: 'globe'
        };
        return icons[type] || 'link';
    }

    filterProjects() {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach((card, index) => {
            const categories = card.dataset.categories.split(',');
            const shouldShow = this.currentFilter === 'all' || 
                             categories.includes(this.currentFilter);
            
            if (shouldShow) {
                card.style.display = 'block';
                card.style.animationDelay = `${index * 0.1}s`;
                card.classList.add('fade-in-up');
            } else {
                card.style.display = 'none';
            }
        });
    }

    initializeSkillBars() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const level = skillBar.parentElement.dataset.level;
                    const progressBar = skillBar.querySelector('.skill-progress');
                    
                    setTimeout(() => {
                        progressBar.style.width = `${level}%`;
                    }, 500);
                }
            });
        });

        document.querySelectorAll('.skill-bar').forEach(bar => {
            observer.observe(bar);
        });
    }

    initializeCounters() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.target);
                    this.animateCounter(counter, target);
                }
            });
        });

        document.querySelectorAll('.stat-number').forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 40);
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const currentTheme = localStorage.getItem('theme') || 'dark';
        
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add theme transition effect
            document.body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }

    setupFormHandlers() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(new FormData(form));
        });

        // Floating label effect
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', this.updateFloatingLabel.bind(this));
            input.addEventListener('blur', this.updateFloatingLabel.bind(this));
        });
    }

    updateFloatingLabel(e) {
        const input = e.target;
        const label = input.nextElementSibling;
        
        if (input.value || input === document.activeElement) {
            label.style.transform = 'translateY(-28px) scale(0.8)';
            label.style.color = 'var(--primary-color)';
        } else {
            label.style.transform = '';
            label.style.color = '';
        }
    }

    handleFormSubmit(formData) {
        const submitBtn = document.querySelector('#contact-form button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            document.getElementById('contact-form').reset();
        }, 2000);
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--background-secondary);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            padding: var(--spacing-md);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: var(--shadow-lg);
        `;

        if (type === 'success') {
            notification.style.borderColor = '#4CAF50';
            notification.style.color = '#4CAF50';
        } else if (type === 'error') {
            notification.style.borderColor = '#f44336';
            notification.style.color = '#f44336';
        } else {
            notification.style.borderColor = 'var(--primary-color)';
            notification.style.color = 'var(--primary-color)';
        }

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
}

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolio = new ModernPortfolio();
    
    // Add some extra interactive effects
    addInteractiveEffects();
});

function addInteractiveEffects() {
    // Magnetic effect for buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // Parallax effect for hero shapes
    window.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.shape');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            shape.style.transform += ` translate(${x}px, ${y}px)`;
        });
    });

    // Add typing effect to greeting
    const greeting = document.querySelector('.greeting');
    if (greeting) {
        const text = greeting.textContent;
        greeting.textContent = '';
        greeting.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                greeting.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Add glitch effect to name on hover
    const nameSpans = document.querySelectorAll('.name-part');
    nameSpans.forEach(span => {
        span.addEventListener('mouseenter', () => {
            span.style.textShadow = `
                0.05em 0 0 rgba(255, 0, 0, 0.75),
                -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
                0.025em 0.05em 0 rgba(0, 0, 255, 0.75)
            `;
            
            setTimeout(() => {
                span.style.textShadow = '';
            }, 200);
        });
    });

    // Add rainbow effect to orbit items on hover
    document.querySelectorAll('.orbit-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24, #f0932b, #eb4d4b, #6c5ce7)';
            item.style.backgroundSize = '400% 400%';
            item.style.animation = 'rainbow 2s ease infinite';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.background = '';
            item.style.animation = 'counterRotate 30s linear infinite';
        });
    });

    // Add CSS for rainbow animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;
    document.head.appendChild(style);
}

// Add some utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export for potential use in other scripts
window.ModernPortfolio = ModernPortfolio;
