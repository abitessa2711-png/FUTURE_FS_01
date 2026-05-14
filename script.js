document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // 2. Mobile Menu Toggle
    const menuIcon = document.getElementById('menu-icon');
    const navList = document.getElementById('nav-list');
    
    menuIcon.addEventListener('click', () => {
        navList.classList.toggle('active');
        const icon = menuIcon.querySelector('i');
        if (navList.classList.contains('active')) {
            icon.classList.remove('bx-menu');
            icon.classList.add('bx-x');
        } else {
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            menuIcon.querySelector('i').classList.remove('bx-x');
            menuIcon.querySelector('i').classList.add('bx-menu');
        });
    });

    // 3. Scroll Reveal Animation (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // 4. Update Active Nav Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 5. Contact Form Gmail Redirect
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('sender-name').value;
            const email = document.getElementById('sender-email').value;
            const msg = document.getElementById('sender-msg').value;

            const subject = encodeURIComponent(`New Message from ${name} via Portfolio`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);

            const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=abitessa2711@gmail.com&su=${subject}&body=${body}`;
            window.open(gmailLink, '_blank');
        });
    }
});
