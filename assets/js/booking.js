/* ===================================
   BOOKING PAGE FUNCTIONALITY
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        // Price data for packages
        const priceData = {
            destinations: {
                'lonavala': 3500,
                'ajanta': 4000,
                'tadoba': 4500,
                'western-ghats': 5000,
                'raigad': 3000,
                'mahabaleshwar': 2500,
                'imagicaa': 2000,
                'gateway-of-india': 1500,
                'marine-drive': 1200,
                'sanjay-gandhi': 2000,
                'nashik-wine': 3000,
                'sula-vineyards': 3500,
                'panchgani': 2500,
                'shirdi': 2000,
                'konkan-coast': 2500,
                'kolhapur': 2000,
                'sindhudurg': 3500,
                'shaniwar-wada': 1500,
                'dandeli': 4000,
                'aurangabad': 3500
            },
            experiences: {
                'trekking': 1500,
                'safari': 2000,
                'culinary': 1000,
                'community': 2500,
                'photography': 1500,
                'cultural': 800
            },
            durations: {
                '1': 1,
                '2': 2,
                '3': 3,
                '5': 5,
                '7': 7
            },
            accommodations: {
                'budget': 1000,
                'comfort': 2000,
                'luxury': 3500
            }
        };

        // Form elements
        const destinationSelect = document.getElementById('destination');
        const experienceSelect = document.getElementById('experience');
        const startDateInput = document.getElementById('startDate');
        const durationSelect = document.getElementById('duration');
        const adultsInput = document.getElementById('adults');
        const childrenInput = document.getElementById('children');
        const seniorsInput = document.getElementById('seniors');
        const accommodationRadios = document.querySelectorAll('input[name="accommodation"]');
        const mealsRadios = document.querySelectorAll('input[name="meals"]');

        // Summary elements
        const summaryPackage = document.getElementById('summaryPackage');
        const summaryDuration = document.getElementById('summaryDuration');
        const summaryTravelers = document.getElementById('summaryTravelers');
        const summaryDate = document.getElementById('summaryDate');
        const summaryPrice = document.getElementById('summaryPrice');

        // Update summary on form changes
        function updateSummary() {
            // Package name
            const destName = destinationSelect.options[destinationSelect.selectedIndex].text;
            const expName = experienceSelect.options[experienceSelect.selectedIndex].text;
            const packageName = destName && expName ? `${destName} - ${expName}` : '-';
            summaryPackage.textContent = packageName;

            // Duration
            const durationValue = durationSelect.value;
            const durationDays = durationValue ? parseInt(durationValue) : 0;
            const durationText = durationValue ? `${durationDays} Day(s)` : '-';
            summaryDuration.textContent = durationText;

            // Travelers
            const adults = parseInt(adultsInput.value) || 1;
            const children = parseInt(childrenInput.value) || 0;
            const seniors = parseInt(seniorsInput.value) || 0;
            const total = adults + children + seniors;
            const travelersText = `${adults} Adult${adults > 1 ? 's' : ''}${children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}` : ''}${seniors > 0 ? `, ${seniors} Senior${seniors > 1 ? 's' : ''}` : ''}`;
            summaryTravelers.textContent = travelersText;

            // Date
            if (startDateInput.value) {
                const date = new Date(startDateInput.value);
                const options = { year: 'numeric', month: 'short', day: 'numeric' };
                summaryDate.textContent = date.toLocaleDateString('en-US', options);
            } else {
                summaryDate.textContent = '-';
            }

            // Calculate price
            calculatePrice();
        }

        function calculatePrice() {
            const adults = parseInt(adultsInput.value) || 1;
            const children = parseInt(childrenInput.value) || 0;
            const seniors = parseInt(seniorsInput.value) || 0;
            const durationDays = parseInt(durationSelect.value) || 0;
            
            const destination = destinationSelect.value;
            const experience = experienceSelect.value;
            const accommodation = document.querySelector('input[name="accommodation"]:checked').value;

            let basePrice = 0;

            if (destination && priceData.destinations[destination]) {
                basePrice += priceData.destinations[destination];
            }

            if (experience && priceData.experiences[experience]) {
                basePrice += priceData.experiences[experience];
            }

            if (accommodation && priceData.accommodations[accommodation]) {
                basePrice += priceData.accommodations[accommodation] * (durationDays || 1);
            }

            // Calculate for each traveler
            const adultsPrice = basePrice * adults;
            const childrenPrice = (basePrice * 0.5) * children; // 50% discount for children
            const seniorsPrice = (basePrice * 0.7) * seniors; // 30% discount for seniors

            const totalPrice = adultsPrice + childrenPrice + seniorsPrice;

            // Update display
            summaryPrice.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;

            return totalPrice;
        }

        // Event listeners for real-time updates
        destinationSelect.addEventListener('change', updateSummary);
        experienceSelect.addEventListener('change', updateSummary);
        startDateInput.addEventListener('change', updateSummary);
        durationSelect.addEventListener('change', updateSummary);
        adultsInput.addEventListener('change', updateSummary);
        childrenInput.addEventListener('change', updateSummary);
        seniorsInput.addEventListener('change', updateSummary);
        
        accommodationRadios.forEach(radio => {
            radio.addEventListener('change', updateSummary);
        });

        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        startDateInput.min = today;

        // Form submission
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validation
            if (!validateBookingForm()) {
                utils.showNotification('Please fill in all required fields correctly', 'error');
                return;
            }

            // Collect form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Show confirmation
            const totalPrice = calculatePrice();
            const confirmed = confirm(`
Booking Summary:
Destination: ${document.getElementById('destination').options[document.getElementById('destination').selectedIndex].text}
Experience: ${document.getElementById('experience').options[document.getElementById('experience').selectedIndex].text}
Date: ${new Date(data.startDate).toLocaleDateString()}
Duration: ${data.duration} Days
Travelers: ${data.adults} Adult(s)${data.children > 0 ? `, ${data.children} Child(ren)` : ''}${data.seniors > 0 ? `, ${data.seniors} Senior(s)` : ''}

Estimated Total: ₹${totalPrice.toLocaleString('en-IN')}

Proceed to payment?
            `);

            if (confirmed) {
                // Simulate payment process
                const loader = utils.showLoader();
                
                setTimeout(() => {
                    utils.removeLoader(loader);
                    utils.trackEvent('booking_completed', {
                        destination: data.destination,
                        experience: data.experience,
                        travelers: parseInt(data.adults) + parseInt(data.children) + parseInt(data.seniors),
                        totalPrice: totalPrice
                    });
                    
                    utils.showNotification('Booking successful! Check your email for confirmation.', 'success');
                    bookingForm.reset();
                    updateSummary();
                }, 2000);
            }
        });

        function validateBookingForm() {
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const destination = document.getElementById('destination').value;
            const experience = document.getElementById('experience').value;
            const startDate = document.getElementById('startDate').value;
            const duration = document.getElementById('duration').value;
            const terms = document.getElementById('terms').checked;

            if (!fullName || !email || !phone || !destination || !experience || !startDate || !duration || !terms) {
                return false;
            }

            if (!utils.validateEmail(email)) {
                utils.showNotification('Please enter a valid email address', 'error');
                return false;
            }

            if (!utils.validatePhone(phone)) {
                utils.showNotification('Please enter a valid phone number', 'error');
                return false;
            }

            return true;
        }

        // Initial summary update
        updateSummary();
    }
});
