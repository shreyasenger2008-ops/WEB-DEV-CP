const BookingApp = {
    priceData: {
        destinations: { 'lonavala': 3500, 'ajanta': 4000, 'tadoba': 4500, 'western-ghats': 5000, 'raigad': 3000, 'mahabaleshwar': 2500, 'imagicaa': 2000, 'gateway-of-india': 1500, 'marine-drive': 1200, 'sanjay-gandhi': 2000, 'nashik-wine': 3000, 'sula-vineyards': 3500, 'panchgani': 2500, 'shirdi': 2000, 'konkan-coast': 2500, 'kolhapur': 2000, 'sindhudurg': 3500, 'shaniwar-wada': 1500, 'dandeli': 4000, 'aurangabad': 3500 },
        experiences: { 'trekking': 1500, 'safari': 2000, 'culinary': 1000, 'community': 2500, 'photography': 1500, 'cultural': 800 },
        accommodations: { 'budget': 1000, 'comfort': 2000, 'luxury': 3500 }
    },

    init: function() {
        if (!$('#bookingForm').length) return;
        
        $('#startDate').attr('min', new Date().toISOString().split('T')[0]);

        $('#destination, #experience, #startDate, #duration, #adults, #children, #seniors, input[name="accommodation"]').on('change', () => this.updateSummary());

        $('#bookingForm').on('submit', (e) => this.handleSubmit(e));
        
        this.updateSummary();
    },

    updateSummary: function() {
        const dest = $('#destination').val(), exp = $('#experience').val();
        $('#summaryPackage').text(dest && exp ? `${$('#destination option:selected').text()} - ${$('#experience option:selected').text()}` : '-');

        const duration = parseInt($('#duration').val()) || 0;
        $('#summaryDuration').text(duration ? `${duration} Day(s)` : '-');

        const adults = parseInt($('#adults').val()) || 1, children = parseInt($('#children').val()) || 0, seniors = parseInt($('#seniors').val()) || 0;
        $('#summaryTravelers').text(`${adults} Adult(s) ${children > 0 ? `, ${children} Child(ren)` : ''} ${seniors > 0 ? `, ${seniors} Senior(s)` : ''}`);

        const dateVal = $('#startDate').val();
        $('#summaryDate').text(dateVal ? new Date(dateVal).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '-');

        let basePrice = (this.priceData.destinations[dest] || 0) + (this.priceData.experiences[exp] || 0) + ((this.priceData.accommodations[$('input[name="accommodation"]:checked').val()] || 0) * (duration || 1));
        
        this.totalPrice = (basePrice * adults) + (basePrice * 0.5 * children) + (basePrice * 0.7 * seniors);
        $('#summaryPrice').text(`₹${this.totalPrice.toLocaleString('en-IN')}`);
    },

    handleSubmit: function(e) {
        e.preventDefault();
        
        const email = $.trim($('#email').val()), phone = $.trim($('#phone').val());
        if (!$('#fullName').val() || !email || !phone || !$('#destination').val() || !$('#experience').val() || !$('#startDate').val() || !$('#duration').val() || !$('#terms').is(':checked')) {
            return utils.showNotification('Please fill in all required fields correctly', 'error');
        }
        if (!utils.validateEmail(email)) return utils.showNotification('Please enter a valid email address', 'error');
        if (!utils.validatePhone(phone)) return utils.showNotification('Please enter a valid phone number', 'error');

        if (confirm(`Booking Summary:\nDestination: ${$('#destination option:selected').text()}\nExperience: ${$('#experience option:selected').text()}\nDate: ${new Date($('#startDate').val()).toLocaleDateString()}\nEstimated Total: ₹${this.totalPrice.toLocaleString('en-IN')}\n\nProceed to payment?`)) {
            const $loader = utils.showLoader();
            setTimeout(() => {
                utils.removeLoader($loader);
                utils.showNotification('Booking successful! Check your email.', 'success');
                $('#bookingForm')[0].reset();
                this.updateSummary();
            }, 2000);
        }
    }
};

$(document).ready(() => BookingApp.init());
