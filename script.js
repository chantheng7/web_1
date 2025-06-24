        // Loading screen

        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loading').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loading').style.display = 'none';
                }, 500);
            }, 2000);
        });

        // Custom cursor

        const cursor = document.getElementById('cursor');
        const cursorTrails = [];

        // Create cursor trails

        for (let i = 0; i < 10; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            document.body.appendChild(trail);
            cursorTrails.push(trail);
        }

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function updateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            // Update trails
            cursorTrails.forEach((trail, index) => {
                const delay = (index + 1) * 0.05;
                trail.style.left = (cursorX - (index * 2)) + 'px';
                trail.style.top = (cursorY - (index * 2)) + 'px';
                trail.style.opacity = 1 - (index * 0.1);
            });

            requestAnimationFrame(updateCursor);
        }
        updateCursor();

        // Particles

        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 20 + 's';
                particle.style.animationDuration = (15 + Math.random() * 10) + 's';
                particlesContainer.appendChild(particle);
            }
        }
        createParticles();

        // Navigation

        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('section');

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const targetSection = document.getElementById(item.dataset.section);
                targetSection.scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Scroll effects
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.dataset.section === current) {
                    item.classList.add('active');
                }
            });
        });

        // Hover effects

        document.querySelectorAll('.skill-card, .project-card, .contact-item').forEach(card => {
            card.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
            });
            
            card.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
            });
        });

        // Intersection Observer for animations

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.skill-card, .project-card').forEach(el => {
            observer.observe(el);
        });
