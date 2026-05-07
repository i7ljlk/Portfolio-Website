document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Cursor interaction with buttons
    const links = document.querySelectorAll('a, button, .project-card');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2.5)';
            cursor.style.background = 'rgba(0, 242, 255, 0.2)';
            cursor.style.border = '1px solid var(--accent-color)';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'var(--accent-color)';
            cursor.style.border = 'none';
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission (Visual Feedback)
    const form = document.querySelector('.contact-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'تم الإرسال بنجاح!';
            btn.style.background = '#00ff88';
            form.reset();
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
            }, 3000);
        });
    }

    // Scroll Reveal Simulation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply reveal to original sections + new ones but with original logic
    document.querySelectorAll('.project-card, .skill-item, .contact-container, .resume-item, .about-container, .skills-category').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // App Slideshow Logic
    const appSlideshow = document.getElementById('app-slideshow');
    if (appSlideshow) {
        const appCard = appSlideshow.closest('.project-card');
        const images = JSON.parse(appCard.getAttribute('data-images') || '[]');
        if (images.length > 0) {
            let currentIndex = 0;
            setInterval(() => {
                appSlideshow.style.opacity = '0';
                setTimeout(() => {
                    currentIndex = (currentIndex + 1) % images.length;
                    appSlideshow.src = images[currentIndex];
                    appSlideshow.style.opacity = '1';
                }, 500);
            }, 3500); // Change image every 3.5 seconds
        }
    }

    // Modal Logic
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalGallery = document.getElementById('modal-gallery');
    const fileListContainer = document.getElementById('modal-file-list');
    const closeModal = document.querySelector('.close-modal');

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectType = card.getAttribute('data-project');
            if (!projectType) return; // For projects without modal data yet

            const title = card.querySelector('h3').innerText;
            const desc = card.getAttribute('data-desc');
            const files = JSON.parse(card.getAttribute('data-files') || '[]');
            const images = JSON.parse(card.getAttribute('data-images') || '[]');

            modalTitle.innerText = title;
            modalDesc.innerText = desc;
            
            // Handle Gallery Images
            modalGallery.innerHTML = '';
            if (images.length > 0) {
                images.forEach(imgSrc => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = title + ' Screenshot';
                    modalGallery.appendChild(img);
                });
                modalGallery.style.display = 'grid';
            } else {
                modalGallery.style.display = 'none';
            }

            fileListContainer.innerHTML = '';

            files.forEach(file => {
                const li = document.createElement('li');
                li.className = 'file-item';
                const lowerFile = file.toLowerCase();
                let iconClass = 'fas fa-file';
                if (lowerFile.endsWith('.pdf')) iconClass = 'fas fa-file-pdf';
                else if (lowerFile.endsWith('.std')) iconClass = 'fas fa-cube';
                else if (lowerFile.endsWith('.rvt')) iconClass = 'fas fa-building';

                li.innerHTML = `
                    <div class="file-info">
                        <i class="${iconClass}"></i>
                        <span>${file}</span>
                    </div>
                    <a href="projects/${projectType}/${file}" class="download-icon" download title="تحميل">
                        <i class="fas fa-download"></i>
                    </a>
                `;
                fileListContainer.appendChild(li);
            });

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
