document.addEventListener('DOMContentLoaded', () => {
    // Add 3D tilt effect to project cards
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            // Limit the rotation to a small amount
            const rotateX = deltaY * -5; // Inverse for natural feel
            const rotateY = deltaX * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            card.style.transition = 'transform 0.5s ease';
        });
    });
    
    // Animate cards on scroll
    const animateOnScroll = () => {
        cards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            const cardBottom = card.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            // Check if card is in viewport
            if (cardTop < windowHeight * 0.9 && cardBottom > 0) {
                // Add a staggered delay based on index
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    };
    
    // Set initial state for scroll animation
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animation on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Add glow effect to title on hover
    const title = document.querySelector('.glow-title');
    if (title) {
        title.addEventListener('mousemove', e => {
            const rect = title.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            title.style.setProperty('--x', `${x}px`);
            title.style.setProperty('--y', `${y}px`);
        });
    }
    
    // Add parallax effect to project images
    const projectImages = document.querySelectorAll('.project-image');
    
    window.addEventListener('scroll', () => {
        projectImages.forEach(image => {
            const scrollPosition = window.scrollY;
            const imagePosition = image.offsetTop;
            const windowHeight = window.innerHeight;
            
            if (imagePosition < scrollPosition + windowHeight && imagePosition + image.offsetHeight > scrollPosition) {
                const parallaxValue = (scrollPosition - imagePosition) * 0.1;
                image.querySelector('img').style.transform = `translateY(${parallaxValue}px) scale(1.05)`;
            }
        });
    });
    
    // Add custom cursor effect for links
    const links = document.querySelectorAll('a');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'pointer';
        });
        
        link.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'default';
        });
    });
}); 