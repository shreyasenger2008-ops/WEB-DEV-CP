/* ===================================
   CONTACT PAGE FUNCTIONALITY
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Collect form data
            const formData = {
                name: document.getElementById('contactName').value.trim(),
                email: document.getElementById('contactEmail').value.trim(),
                phone: document.getElementById('contactPhone').value.trim(),
                subject: document.getElementById('contactSubject').value,
                message: document.getElementById('contactMessage').value.trim()
            };

            // Validate
            if (!validateContactForm(formData)) {
                return;
            }

            // Show loader
            const loader = utils.showLoader();

            // Simulate sending email
            setTimeout(() => {
                utils.removeLoader(loader);
                utils.showNotification('Thank you for your message! We will get back to you soon.', 'success');

                // Track event
                utils.trackEvent('contact_form_submitted', {
                    subject: formData.subject,
                    email: formData.email
                });

                // Reset form
                contactForm.reset();
            }, 2000);
        });

        function validateContactForm(data) {
            if (!data.name) {
                utils.showNotification('Please enter your name', 'error');
                return false;
            }

            if (!utils.validateEmail(data.email)) {
                utils.showNotification('Please enter a valid email address', 'error');
                return false;
            }

            if (!data.subject) {
                utils.showNotification('Please select a subject', 'error');
                return false;
            }

            if (!data.message || data.message.length < 10) {
                utils.showNotification('Please enter a message (at least 10 characters)', 'error');
                return false;
            }

            return true;
        }
    }
});
