const DestinationsApp = {
    init: function() {
        if (!$('#destinationsList').length) return;
        
        if (!$('style[data-destinations]').length) {
            $('<style>', { 'data-destinations': '', text: `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }` }).appendTo('head');
        }

        $('#searchInput').on('keyup', utils.debounce(this.filter.bind(this), 300));
        $('#filterType, #filterDifficulty').on('change', this.filter.bind(this));
    },

    filter: function() {
        const search = $('#searchInput').val().toLowerCase();
        const type = $('#filterType').val();
        const diff = $('#filterDifficulty').val();
        let count = 0;

        $('.destination-detail-card').each(function() {
            const $d = $(this);
            const matchesSearch = $d.find('h3').text().toLowerCase().includes(search) || $d.find('.dest-description').text().toLowerCase().includes(search);
            const matchesType = !type || String($d.data('type')) === type;
            const matchesDiff = !diff || String($d.data('difficulty')) === diff;

            if (matchesSearch && matchesType && matchesDiff) {
                $d.css({ display: 'block', animation: 'fadeIn 0.3s ease' });
                count++;
            } else {
                $d.css('display', 'none');
            }
        });

        if (count === 0) {
            if (!$('.no-results').length) {
                $('<div>', { class: 'no-results', css: { textAlign: 'center', padding: '60px 20px', color: '#7f8c8d', gridColumn: '1 / -1' } })
                    .html(`<i class="fas fa-search" style="font-size: 50px; margin-bottom: 20px; display: block; color: #bdc3c7;"></i><h3>No destinations found</h3><p>Try adjusting your filters or search terms</p>`)
                    .appendTo('#destinationsList');
            }
        } else {
            $('.no-results').remove();
        }

        utils.trackEvent('filter_destinations', { search, type, difficulty: diff, results: count });
    }
};

$(document).ready(() => DestinationsApp.init());
