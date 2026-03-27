document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const submitBtn = document.getElementById('submitBtn');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Handle form submission with interactive feedback
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // Reset previously active validation errors
        emailInput.classList.remove('error-border');
        passwordInput.classList.remove('error-border');
        loginForm.classList.remove('shake');
        
        // Trigger generic error for demo purposes if "admin" is not the username
        if (email !== 'admin@portfolio.com' && email !== 'admin') {
            triggerError();
            return;
        }

        // Add loading state
        submitBtn.classList.add('loading');
        
        // Simulate network latency & API check
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            
            // Demo successful login match
            if ((email === 'admin@portfolio.com' || email === 'admin') && password === 'admin123') {
                // Success styling changes
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
                submitBtn.style.boxShadow = '0 10px 25px -10px #10b981';
                
                const btnText = submitBtn.querySelector('.button-text');
                btnText.style.display = 'block';
                btnText.textContent = 'Welcome Admin! 🎉';
                
                // Add a small bounce animation to the card for excitement
                const card = document.querySelector('.glass-card');
                card.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 300);

                setTimeout(() => {
                    alert('Successfully authenticated! You would now be redirected to the portfolio dashboard.');
                    // Reset UI
                    submitBtn.style = '';
                    btnText.textContent = 'Sign In';
                    loginForm.reset();
                    // Defocus
                    document.activeElement.blur();
                }, 1500);

            } else {
                // Incorrect password flow
                triggerError();
            }
            
        }, 1200);
    });
    
    // Function to handle error UI animations
    function triggerError() {
        // Force reflow to allow the animation to restart
        void loginForm.offsetWidth;
        
        loginForm.classList.add('shake');
        emailInput.classList.add('error-border');
        passwordInput.classList.add('error-border');
        
        // Automatically remove the error state once the user attempts to type/focus again
        [emailInput, passwordInput].forEach(input => {
            input.addEventListener('focus', function clearErrorCallback() {
                emailInput.classList.remove('error-border');
                passwordInput.classList.remove('error-border');
                this.removeEventListener('focus', clearErrorCallback);
            });
        });
    }
    
    // Helper to log console hints (for people inspecting the page)
    console.log("%c💡 Looking for credentials? Try:\nEmail: admin@portfolio.com\nPassword: admin123", "color: #818cf8; font-size: 14px; font-weight: bold; background: #0f172a; padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1)");
});
