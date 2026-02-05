/**
 * Ganesh Aravind - Personal CV Website
 * Cinematic interactions and scroll-driven animations
 */

(function() {
    'use strict';

    // === CURSOR GLOW EFFECT ===
    const cursorGlow = document.querySelector('.cursor-glow');
    
    if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateCursor() {
            // Smooth interpolation
            currentX += (mouseX - currentX) * 0.08;
            currentY += (mouseY - currentY) * 0.08;
            
            cursorGlow.style.left = currentX + 'px';
            cursorGlow.style.top = currentY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();
    }

    // === SCROLL REVEAL ANIMATIONS ===
    const revealObserver = new IntersectionObserver(
        function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -80px 0px'
        }
    );

    document.querySelectorAll('[data-reveal]').forEach(function(el) {
        revealObserver.observe(el);
    });

    // === SMOOTH SCROLL FOR ANCHOR LINKS ===
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href === '#') return;
            
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // === SKILL ITEMS HOVER EFFECT ===
    document.querySelectorAll('[data-skill]').forEach(function(skill) {
        skill.addEventListener('mouseenter', function() {
            // Dim other skills
            document.querySelectorAll('[data-skill]').forEach(function(other) {
                if (other !== skill) {
                    other.style.opacity = '0.3';
                }
            });
        });
        
        skill.addEventListener('mouseleave', function() {
            document.querySelectorAll('[data-skill]').forEach(function(other) {
                other.style.opacity = '1';
            });
        });
    });

    // === PARALLAX EFFECT ON SCROLL ===
    var profileFrame = document.querySelector('.profile-frame');
    var heroSection = document.querySelector('.hero');
    
    if (profileFrame && heroSection && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        var lastScrollY = 0;
        var ticking = false;
        
        function updateParallax() {
            var heroRect = heroSection.getBoundingClientRect();
            var scrollProgress = Math.max(0, Math.min(1, -heroRect.top / heroRect.height));
            
            var translateY = scrollProgress * 50;
            var scale = 1 - (scrollProgress * 0.1);
            var opacity = 1 - (scrollProgress * 0.5);
            
            profileFrame.style.transform = 'translateY(' + translateY + 'px) scale(' + scale + ')';
            profileFrame.style.opacity = opacity;
            
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
    }

    // === MAGNETIC BUTTON EFFECT ===
    document.querySelectorAll('.download-btn').forEach(function(btn) {
        btn.addEventListener('mousemove', function(e) {
            var rect = this.getBoundingClientRect();
            var x = e.clientX - rect.left - rect.width / 2;
            var y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15 - 2) + 'px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });

    // === TIMELINE PROGRESS INDICATOR ===
    var timelineMarkers = document.querySelectorAll('.marker-dot');
    
    var markerObserver = new IntersectionObserver(
        function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.transform = 'scale(1.2)';
                    entry.target.style.boxShadow = '0 0 30px var(--color-accent-glow)';
                } else {
                    entry.target.style.transform = 'scale(1)';
                    entry.target.style.boxShadow = '0 0 20px var(--color-accent-glow)';
                }
            });
        },
        {
            threshold: 0.5,
            rootMargin: '-100px 0px'
        }
    );

    timelineMarkers.forEach(function(marker) {
        markerObserver.observe(marker);
    });

    // === TYPING EFFECT FOR HERO NAME (Optional - triggered on load) ===
    var heroName = document.querySelector('.hero-name');
    
    if (heroName && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        var nameLines = heroName.querySelectorAll('.name-line');
        
        nameLines.forEach(function(line, index) {
            line.style.opacity = '0';
            line.style.transform = 'translateY(20px)';
            line.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            line.style.transitionDelay = (0.3 + index * 0.15) + 's';
            
            setTimeout(function() {
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, 100);
        });
    }

    // === CONTACT CARDS STAGGER ===
    var contactCards = document.querySelectorAll('.contact-card');
    
    var contactObserver = new IntersectionObserver(
        function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var cards = entry.target.querySelectorAll ? 
                        document.querySelectorAll('.contact-card') : [entry.target];
                    
                    cards.forEach(function(card, index) {
                        setTimeout(function() {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    
                    contactObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    var footerContact = document.querySelector('.footer-contact');
    if (footerContact) {
        contactCards.forEach(function(card) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        contactObserver.observe(footerContact);
    }

    // === EDUCATION CARD HOVER GLOW ===
    document.querySelectorAll('.education-card').forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            var rect = this.getBoundingClientRect();
            var x = ((e.clientX - rect.left) / rect.width) * 100;
            var y = ((e.clientY - rect.top) / rect.height) * 100;
            
            this.style.background = 'radial-gradient(circle at ' + x + '% ' + y + '%, rgba(129, 140, 248, 0.08) 0%, var(--color-bg-card) 50%)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = 'var(--color-bg-card)';
        });
    });

    // === HANDLE VISIBILITY CHANGE ===
    document.addEventListener('visibilitychange', function() {
        var marqueeTrack = document.querySelector('.marquee-track');
        if (marqueeTrack) {
            marqueeTrack.style.animationPlayState = document.hidden ? 'paused' : 'running';
        }
    });

    // === INITIAL LOAD ANIMATIONS ===
    window.addEventListener('load', function() {
        document.body.classList.add('is-loaded');
        
        // Trigger hero reveals
        setTimeout(function() {
            document.querySelectorAll('.hero [data-reveal]').forEach(function(el) {
                el.classList.add('is-visible');
            });
        }, 100);
    });

})();