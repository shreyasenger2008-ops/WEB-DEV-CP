/* ===================================
   DESTINATIONS PAGE FUNCTIONALITY
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const filterType = document.getElementById('filterType');
    const filterDifficulty = document.getElementById('filterDifficulty');
    const destinationsList = document.getElementById('destinationsList');

    if (searchInput && destinationsList) {
        // Store original destinations
        const destinations = Array.from(destinationsList.querySelectorAll('.destination-detail-card'));

        // Search functionality
        searchInput.addEventListener('keyup', debounce(filterDestinations, 300));

        // Filter by type
        if (filterType) {
            filterType.addEventListener('change', filterDestinations);
        }

        // Filter by difficulty
        if (filterDifficulty) {
            filterDifficulty.addEventListener('change', filterDestinations);
        }

        function filterDestinations() {
            const searchTerm = searchInput.value.toLowerCase();
            const typeFilter = filterType.value;
            const difficultyFilter = filterDifficulty.value;

            let visibleCount = 0;

            destinations.forEach(destination => {
                const title = destination.querySelector('h3').textContent.toLowerCase();
                const description = destination.querySelector('.dest-description').textContent.toLowerCase();
                const type = destination.dataset.type;
                const difficulty = destination.dataset.difficulty;

                // Check search
                const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);

                // Check type filter
                const matchesType = !typeFilter || type === typeFilter;

                // Check difficulty filter
                const matchesDifficulty = !difficultyFilter || difficulty === difficultyFilter;

                // Show or hide
                if (matchesSearch && matchesType && matchesDifficulty) {
                    destination.style.display = 'block';
                    destination.style.animation = 'fadeIn 0.3s ease';
                    visibleCount++;
                } else {
                    destination.style.display = 'none';
                }
            });

            // Show message if no results
            if (visibleCount === 0) {
                let message = destinationsList.querySelector('.no-results');
                if (!message) {
                    message = document.createElement('div');
                    message.className = 'no-results';
                    message.style.cssText = `
                        text-align: center;
                        padding: 60px 20px;
                        color: #7f8c8d;
                        grid-column: 1 / -1;
                    `;
                    destinationsList.appendChild(message);
                }
                message.innerHTML = `
                    <i class="fas fa-search" style="font-size: 50px; margin-bottom: 20px; display: block; color: #bdc3c7;"></i>
                    <h3>No destinations found</h3>
                    <p>Try adjusting your filters or search terms</p>
                `;
            } else {
                const noResults = destinationsList.querySelector('.no-results');
                if (noResults) {
                    noResults.remove();
                }
            }

            // Track filter event
            utils.trackEvent('filter_destinations', {
                search: searchTerm,
                type: typeFilter,
                difficulty: difficultyFilter,
                results: visibleCount
            });
        }

        // Add animation styles
        if (!document.querySelector('style[data-destinations]')) {
            const style = document.createElement('style');
            style.setAttribute('data-destinations', '');
            style.textContent = `
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
});

// Helper function from main.js
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
