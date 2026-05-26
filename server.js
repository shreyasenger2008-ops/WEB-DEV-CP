const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.json({ message: 'EcoTourism Maharashtra API Server Running' });
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

const destinations = [
    {
        id: 1,
        name: 'Lonavala & Khandala',
        location: '65 km from Pune',
        type: 'mountain',
        difficulty: 'moderate',
        rating: 4.8,
        reviews: 245,
        price: 3500,
        description: 'Misty mountains, scenic waterfalls, and ancient caves'
    },
    {
        id: 2,
        name: 'Ajanta & Ellora Caves',
        location: '350 km from Pune',
        type: 'heritage',
        difficulty: 'easy',
        rating: 4.9,
        reviews: 312,
        price: 4000,
        description: 'UNESCO heritage caves with incredible historical significance'
    },
    {
        id: 3,
        name: 'Tadoba Andhari National Park',
        location: '85 km from Nagpur',
        type: 'wildlife',
        difficulty: 'moderate',
        rating: 4.7,
        reviews: 189,
        price: 4500,
        description: 'Tiger sanctuary and jungle safari experiences'
    },
    {
        id: 4,
        name: 'Western Ghats Trek',
        location: '100+ km route',
        type: 'mountain',
        difficulty: 'hard',
        rating: 4.6,
        reviews: 156,
        price: 5000,
        description: 'Biodiversity hotspot with trekking and wildlife experiences'
    },
    {
        id: 5,
        name: 'Raigad Fort Trek',
        location: '50 km from Pune',
        type: 'adventure',
        difficulty: 'moderate',
        rating: 4.8,
        reviews: 267,
        price: 3000,
        description: 'Historic hill fort with panoramic views of the Sahyadri ranges'
    },
    {
        id: 6,
        name: 'Mahabaleshwar Hill Station',
        location: '120 km from Pune',
        type: 'heritage',
        difficulty: 'easy',
        rating: 4.7,
        reviews: 198,
        price: 2500,
        description: 'Serene hill station with strawberry farms, viewpoints, and artisan villages'
    },
    {
        id: 7,
        name: 'Imagicaa Theme Park',
        location: 'Khed, 45 km from Pune',
        type: 'adventure',
        difficulty: 'easy',
        rating: 4.5,
        reviews: 156,
        price: 2000,
        description: 'World-class theme park with thrilling rides and cultural shows'
    },
    {
        id: 8,
        name: 'Mumbai - Gateway of India',
        location: 'South Mumbai',
        type: 'heritage',
        difficulty: 'easy',
        rating: 4.7,
        reviews: 412,
        price: 1500,
        description: 'Iconic monument, colonial architecture, and vibrant city culture'
    },
    {
        id: 9,
        name: 'Marine Drive Mumbai',
        location: 'Mumbai',
        type: 'adventure',
        difficulty: 'easy',
        rating: 4.6,
        reviews: 289,
        price: 1200,
        description: 'Scenic seaside promenade with sunset views and local street food'
    },
    {
        id: 10,
        name: 'Sanjay Gandhi National Park',
        location: 'Mumbai',
        type: 'wildlife',
        difficulty: 'moderate',
        rating: 4.4,
        reviews: 198,
        price: 2000,
        description: 'Urban forest with trekking trails, waterfalls, and wildlife sanctuary'
    },
    {
        id: 11,
        name: 'Nashik Wine Valley',
        location: 'Nashik, 190 km from Pune',
        type: 'heritage',
        difficulty: 'easy',
        rating: 4.6,
        reviews: 223,
        price: 3000,
        description: 'Wine tasting tours, vineyard walks, and cultural experiences'
    },
    {
        id: 12,
        name: 'Sula Vineyards',
        location: 'Nashik',
        type: 'heritage',
        difficulty: 'easy',
        rating: 4.7,
        reviews: 267,
        price: 3500,
        description: 'Premium wine tasting, farm stays, and gourmet dining'
    },
    {
        id: 13,
        name: 'Panchgani Hill Station',
        location: '100 km from Pune',
        type: 'mountain',
        difficulty: 'easy',
        rating: 4.5,
        reviews: 134,
        price: 2500,
        description: 'Scenic plateau with adventure activities and strawberry farms'
    },
    {
        id: 14,
        name: 'Shirdi Sai Baba Temple',
        location: '250 km from Pune',
        type: 'heritage',
        difficulty: 'easy',
        rating: 4.8,
        reviews: 524,
        price: 2000,
        description: 'Sacred pilgrimage site with spiritual experiences and cultural tours'
    },
    {
        id: 15,
        name: 'Konkan Coast - Alibaug',
        location: '50 km from Mumbai',
        type: 'adventure',
        difficulty: 'easy',
        rating: 4.6,
        reviews: 245,
        price: 2500,
        description: 'Beach destination with water sports, forts, and coastal cuisine'
    },
    {
        id: 16,
        name: 'Kolhapur City Heritage Tour',
        location: '235 km from Pune',
        type: 'heritage',
        difficulty: 'easy',
        rating: 4.4,
        reviews: 167,
        price: 2000,
        description: 'Ancient temples, royal palaces, and traditional Kolhapuri culture'
    },
    {
        id: 17,
        name: 'Sindhudurg Fort Trek',
        location: '350 km from Pune',
        type: 'adventure',
        difficulty: 'moderate',
        rating: 4.5,
        reviews: 123,
        price: 3500,
        description: 'Sea fort with historical significance and adventurous boat ride'
    },
    {
        id: 18,
        name: 'Shaniwar Wada Fort Pune',
        location: 'Pune City',
        type: 'heritage',
        difficulty: 'easy',
        rating: 4.6,
        reviews: 345,
        price: 1500,
        description: 'Ancient Marathi stronghold with light and sound show'
    },
    {
        id: 19,
        name: 'Dandeli Wildlife Sanctuary',
        location: 'Karnataka Border, 380 km from Pune',
        type: 'wildlife',
        difficulty: 'moderate',
        rating: 4.5,
        reviews: 189,
        price: 4000,
        description: 'River rafting, jungle safaris, and adventure activities'
    },
    {
        id: 20,
        name: 'Aurangabad Historic Circle',
        location: 'Aurangabad, 340 km from Pune',
        type: 'heritage',
        difficulty: 'moderate',
        rating: 4.7,
        reviews: 278,
        price: 3500,
        description: 'Ancient Mughal architecture, Bibi ka Maqbara, and historical tours'
    }
];

app.get('/api/destinations', (req, res) => {
    const { type, difficulty, search } = req.query;
    let filtered = [...destinations];

    if (type) {
        filtered = filtered.filter(d => d.type === type);
    }

    if (difficulty) {
        filtered = filtered.filter(d => d.difficulty === difficulty);
    }

    if (search) {
        filtered = filtered.filter(d =>
            d.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    res.json({
        success: true,
        count: filtered.length,
        data: filtered
    });
});

app.get('/api/destinations/:id', (req, res) => {
    const destination = destinations.find(d => d.id === parseInt(req.params.id));

    if (!destination) {
        return res.status(404).json({
            success: false,
            message: 'Destination not found'
        });
    }

    res.json({
        success: true,
        data: destination
    });
});

const experiences = [
    { id: 1, name: 'Guided Mountain Trekking', category: 'adventure', price: 1500, duration: '1-5 days' },
    { id: 2, name: 'Wildlife Safari', category: 'nature', price: 2000, duration: '1-3 days' },
    { id: 3, name: 'Culinary Tours', category: 'culture', price: 1000, duration: '1 day' },
    { id: 4, name: 'Community Stays', category: 'culture', price: 2500, duration: '3-7 days' },
    { id: 5, name: 'Photography Tours', category: 'adventure', price: 1500, duration: '2-3 days' },
    { id: 6, name: 'Cultural Workshops', category: 'culture', price: 800, duration: '1 day' }
];

app.get('/api/experiences', (req, res) => {
    res.json({
        success: true,
        count: experiences.length,
        data: experiences
    });
});

// Get experience by category
app.get('/api/experiences/category/:category', (req, res) => {
    const category = req.params.category;
    const filtered = experiences.filter(e => e.category === category);

    res.json({
        success: true,
        count: filtered.length,
        data: filtered
    });
});

let bookings = [];
let bookingIdCounter = 1;

app.post('/api/bookings', (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            destination,
            experience,
            startDate,
            duration,
            adults,
            children,
            seniors,
            accommodation,
            meals,
            specialRequests
        } = req.body;

        if (!fullName || !email || !phone || !destination || !experience || !startDate || !duration) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        const booking = {
            id: bookingIdCounter++,
            fullName,
            email,
            phone,
            destination,
            experience,
            startDate,
            duration,
            adults,
            children,
            seniors,
            accommodation,
            meals,
            specialRequests,
            status: 'pending',
            createdAt: new Date()
        };

        bookings.push(booking);

        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            bookingId: booking.id,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating booking: ' + error.message
        });
    }
});

// Get booking by ID
app.get('/api/bookings/:id', (req, res) => {
    const booking = bookings.find(b => b.id === parseInt(req.params.id));

    if (!booking) {
        return res.status(404).json({
            success: false,
            message: 'Booking not found'
        });
    }

    res.json({
        success: true,
        data: booking
    });
});

app.get('/api/bookings', (req, res) => {
    res.json({
        success: true,
        count: bookings.length,
        data: bookings
    });
});

let contacts = [];
let contactIdCounter = 1;

app.post('/api/contact', (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email address'
            });
        }

        const contact = {
            id: contactIdCounter++,
            name,
            email,
            phone,
            subject,
            message,
            createdAt: new Date(),
            status: 'new'
        };

        contacts.push(contact);

        console.log('New contact submission:', contact);

        res.status(201).json({
            success: true,
            message: 'Thank you for contacting us. We will get back to you soon.',
            data: { id: contact.id }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error processing contact form: ' + error.message
        });
    }
});


let subscribers = [];

// Subscribe to newsletter
app.post('/api/newsletter/subscribe', (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        // Check if already subscribed
        if (subscribers.includes(email)) {
            return res.status(400).json({
                success: false,
                message: 'Already subscribed with this email'
            });
        }

        subscribers.push(email);

        res.json({
            success: true,
            message: 'Successfully subscribed to our newsletter'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error subscribing to newsletter: ' + error.message
        });
    }
});

// ===================================
// STATISTICS API
// ===================================

app.get('/api/statistics', (req, res) => {
    res.json({
        success: true,
        data: {
            totalDestinations: destinations.length,
            totalExperiences: experiences.length,
            totalBookings: bookings.length,
            totalSubscribers: subscribers.length,
            totalContacts: contacts.length
        }
    });
});

// ===================================
// ERROR HANDLING
// ===================================

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// ===================================
// START SERVER
// ===================================

app.listen(PORT, () => {
    console.log(`🌿 EcoTourism Maharashtra API Server`);
    console.log(`✨ Running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌍 API Base URL: http://localhost:${PORT}/api`);
});

module.exports = app;
