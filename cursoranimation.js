class Particle {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.baseSize = Math.max(size, 0.1); // Ensure minimum base size
        this.color = color;
        this.speedX = (Math.random() - 0.5) * 4;
        this.speedY = (Math.random() - 0.5) * 4;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.02;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life = Math.max(this.life - this.decay, 0); // Prevent negative life
    }

    draw(ctx) {
        if (this.life <= 0) return; // Don't draw if particle is dead
        
        const currentSize = Math.max(this.baseSize * this.life, 0.1); // Ensure minimum size
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.life})`;
        ctx.fill();
        ctx.closePath();
    }
}

class CursorAnimation {
    constructor() {
        this.canvas = document.getElementById('cursor-canvas');
        if (!this.canvas) {
            console.error('Canvas element not found');
            return;
        }

        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx) {
            console.error('Could not get canvas context');
            return;
        }

        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.isMoving = false;
        this.moveTimeout = null;
        this.animationFrameId = null;
        this.colors = [
            { r: 255, g: 111, b: 241 }, // Pink
            { r: 147, g: 111, b: 255 }, // Purple
            { r: 111, g: 255, b: 233 }, // Cyan
            { r: 255, g: 244, b: 111 }  // Yellow
        ];

        this.init();
    }

    init() {
        try {
            this.resizeCanvas();
            window.addEventListener('resize', () => this.resizeCanvas());
            window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
            this.startAnimation();
        } catch (error) {
            console.error('Error initializing cursor animation:', error);
        }
    }

    resizeCanvas() {
        if (this.canvas) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    }

    handleMouseMove(e) {
        if (!this.ctx) return;

        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.isMoving = true;

        // Create particles on mouse move
        for (let i = 0; i < 3; i++) {
            this.createParticle();
        }

        // Reset moving state after mouse stops
        clearTimeout(this.moveTimeout);
        this.moveTimeout = setTimeout(() => {
            this.isMoving = false;
        }, 100);
    }

    createParticle() {
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        const size = Math.random() * 3 + 1; // Reduced size range to prevent issues
        const particle = new Particle(this.mouseX, this.mouseY, size, color);
        this.particles.push(particle);
    }

    startAnimation() {
        if (!this.ctx) return;
        
        const animate = () => {
            try {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

                // Update and draw particles
                for (let i = this.particles.length - 1; i >= 0; i--) {
                    const particle = this.particles[i];
                    particle.update();
                    particle.draw(this.ctx);

                    // Remove dead particles
                    if (particle.life <= 0) {
                        this.particles.splice(i, 1);
                    }
                }

                this.animationFrameId = requestAnimationFrame(animate);
            } catch (error) {
                console.error('Animation error:', error);
                this.stopAnimation();
            }
        };

        animate();
    }

    stopAnimation() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
}

// Initialize the cursor animation when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        const cursorAnimation = new CursorAnimation();
        
        // Clean up on page unload
        window.addEventListener('unload', () => {
            if (cursorAnimation) {
                cursorAnimation.stopAnimation();
            }
        });
    } catch (error) {
        console.error('Error creating cursor animation:', error);
    }
}); 