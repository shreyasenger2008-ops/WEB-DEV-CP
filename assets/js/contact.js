const ContactApp = {
    init: function() {
        $('#contactForm').on('submit', function(e) {
            e.preventDefault();
            
            const data = {
                name: $.trim($('#contactName').val()),
                email: $.trim($('#contactEmail').val()),
                phone: $.trim($('#contactPhone').val()),
                subject: $('#contactSubject').val(),
                message: $.trim($('#contactMessage').val())
            };

            if (!data.name) return utils.showNotification('Please enter your name', 'error');
            if (!utils.validateEmail(data.email)) return utils.showNotification('Please enter a valid email address', 'error');
            if (!data.subject) return utils.showNotification('Please select a subject', 'error');
            if (!data.message || data.message.length < 10) return utils.showNotification('Please enter a message (at least 10 characters)', 'error');

            const $loader = utils.showLoader();
            setTimeout(() => {
                utils.removeLoader($loader);
                utils.showNotification('Thank you for your message! We will get back to you soon.', 'success');
                utils.trackEvent('contact_form_submitted', { subject: data.subject, email: data.email });
                this.reset();
            }, 2000);
        });
    }
};

$(document).ready(() => ContactApp.init());
