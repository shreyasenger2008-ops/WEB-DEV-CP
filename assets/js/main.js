const MainApp = {
    init: function() {
        $('#navToggle').on('click', function() {
            $('#navMenu').toggleClass('active');
            $(this).toggleClass('active');
        });

        $('#navMenu .nav-link').on('click', function() {
            $('#navMenu, #navToggle').removeClass('active');
        });

        $('#newsletterForm, #newsletterForm2').on('submit', function(e) {
            e.preventDefault();
            utils.showNotification('Thank you for subscribing! Check your email for confirmation.', 'success');
            this.reset();
        });

        $('a[href^="#"]').on('click', function(e) {
            const href = $(this).attr('href');
            if (href !== '#' && $(href).length) {
                e.preventDefault();
                $('html, body').animate({ scrollTop: $(href).offset().top }, 600);
            }
        });

        $(window).on('scroll', function() {
            const scrollPos = $(window).scrollTop();
            let current = '';
            $('section[id]').each(function() {
                if (scrollPos >= $(this).offset().top - 200) {
                    current = $(this).attr('id');
                }
            });
            $('.nav-link').removeClass('active').filter(`[href="#${current}"], [href="#"]`).addClass('active');

            if (scrollPos > 300) {
                $('#scrollToTop').fadeIn(300);
            } else {
                $('#scrollToTop').fadeOut(300);
            }
        });

        this.createScrollToTopButton();
        this.initLazyLoading();
        utils.trackEvent('page_view', { page: window.location.pathname, title: document.title });
    },

    createScrollToTopButton: function() {
        $('<button>', {
            id: 'scrollToTop',
            html: '<i class="fas fa-arrow-up"></i>'
        }).css({
            position: 'fixed', bottom: '30px', right: '30px', backgroundColor: '#2ecc71',
            color: 'white', border: 'none', borderRadius: '50%', width: '50px', height: '50px',
            fontSize: '20px', cursor: 'pointer', display: 'none', zIndex: 999,
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)', transition: 'all 0.3s ease'
        }).appendTo('body').on('click', function() {
            $('html, body').animate({ scrollTop: 0 }, 600);
        }).hover(
            function() { $(this).css({ backgroundColor: '#27ae60', transform: 'scale(1.1)' }); },
            function() { $(this).css({ backgroundColor: '#2ecc71', transform: 'scale(1)' }); }
        );
    },

    initLazyLoading: function() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const $img = $(entry.target);
                        $img.attr('src', $img.data('src')).removeClass('lazy');
                        observer.unobserve(entry.target);
                    }
                });
            });
            $('img.lazy').each((_, img) => observer.observe(img));
        }
    }
};

const utils = {
    showNotification: function(message, type = 'info') {
        const $note = $('<div>', { class: `notification notification-${type}` }).html(`
            <div class="notification-content"><i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i> <span>${message}</span></div>
            <button class="notification-close">&times;</button>
        `);

        if (!$('style[data-notification]').length) {
            $('<style>', {
                'data-notification': '',
                text: `.notification { position: fixed; top: 20px; right: 20px; background: white; padding: 15px 20px; border-radius: 5px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; align-items: center; justify-content: space-between; gap: 15px; min-width: 300px; z-index: 10000; animation: slideIn 0.3s ease; } @keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } } @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(400px); opacity: 0; } } .notification-success { border-left: 4px solid #2ecc71; } .notification-error { border-left: 4px solid #e74c3c; } .notification-success .notification-content { color: #27ae60; } .notification-error .notification-content { color: #c0392b; } .notification-close { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #7f8c8d; }`
            }).appendTo('head');
        }

        $('body').append($note);
        $note.find('.notification-close').on('click', function() {
            $note.css('animation', 'slideOut 0.3s ease');
            setTimeout(() => $note.remove(), 300);
        });
        setTimeout(() => $note.find('.notification-close').click(), 5000);
    },

    validateEmail: email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    validatePhone: phone => /^[0-9]{10,}$/.test(phone.replace(/\D/g, '')),
    
    debounce: function(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    },

    showLoader: function() {
        const $loader = $('<div>', { class: 'loader' }).css({
            position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', zIndex: 10001, textAlign: 'center'
        }).html(`
            <div style="border: 4px solid #f3f3f3; border-top: 4px solid #2ecc71; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
            <p style="margin-top: 10px; color: #2c3e50;">Loading...</p>
        `);

        if (!$('style[data-loader]').length) {
            $('<style>', { 'data-loader': '', text: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }` }).appendTo('head');
        }

        return $loader.appendTo('body');
    },

    removeLoader: $loader => $loader && $loader.remove(),
    trackEvent: (name, data = {}) => console.log('Event:', name, data)
};

window.utils = utils;
$(document).ready(() => MainApp.init());
