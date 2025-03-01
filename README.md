# Projects Landing Page

A beautiful 3D-style projects showcase section for Binaya Rijal's portfolio website.

## Features

- Modern 3D-like card design with smooth animations
- Responsive grid layout that works on all devices
- Interactive hover effects with subtle animations
- Glowing title with border background
- Project cards with source code and demo links
- Color scheme matching the main portfolio website (https://binaya-rijal.com.np)

## Technologies Used

- HTML5
- CSS3 (with modern features like CSS variables, flexbox, grid)
- JavaScript (vanilla JS for animations and effects)
- Font Awesome for icons

## Usage

1. Clone this repository
2. Open `index.html` in your browser
3. Customize the project cards with your own projects

## Customization

### Adding New Projects

To add a new project, copy one of the existing project card structures in `index.html` and update the following:

```html
<div class="project-card">
    <div class="project-content">
        <div class="project-image">
            <img src="YOUR_IMAGE_URL" alt="Project Name">
        </div>
        <h3>Project Name</h3>
        <p>Project description goes here.</p>
        <div class="tech-stack">
            <span>Technology 1</span>
            <span>Technology 2</span>
            <span>Technology 3</span>
        </div>
        <div class="project-links">
            <a href="YOUR_GITHUB_URL" target="_blank" class="github-link">
                <i class="fab fa-github"></i> Source Code
            </a>
            <a href="YOUR_DEMO_URL" target="_blank" class="demo-link">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
        </div>
    </div>
</div>
```

### Changing Colors

The color scheme is defined in CSS variables at the top of the `styles.css` file:

```css
:root {
    --primary-bg: #0a192f;
    --card-bg: rgba(16, 33, 65, 0.8);
    --text-primary: #e6f1ff;
    --text-secondary: #8892b0;
    --accent-color: #64ffda;
    --glow-color: rgba(100, 255, 218, 0.5);
    --card-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
    --card-hover-shadow: 0 20px 30px -15px rgba(2, 12, 27, 0.8);
    --border-radius: 12px;
}
```

## Integration with Main Portfolio

To integrate this projects section with your main portfolio website:

1. Copy the HTML structure from `index.html`
2. Copy the CSS from `styles.css`
3. Copy the JavaScript from `script.js`
4. Adjust as needed to fit with your existing website structure

## License

This project is open source and available for personal and commercial use.

## Credits

Created by [Your Name] for Binaya Rijal's portfolio website. 