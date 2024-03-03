const express = require('express');
const router = express.Router();

// list of the tags that will be used for categorization for users, organizations, and events.
const tags = [
        "Education", "Technology", "Community Service", "Environment",
        "Arts & Culture", "Health & Wellness", "Leadership", "Sports",
        "Social Justice", "Entrepreneurship", "International Affairs", "Gardening",
        "Creative Writing", "Dance & Movement", "Music & Performance", "Science & Research",
        "Engineering", "Mathematics", "Language & Linguistics", "Culinary Arts",
        "Animal Welfare", "History & Heritage", "Politics & Governance", "Media & Communication",
        "Spirituality & Religion", "Mental Health Awareness", "Conservation",
        "Diversity & Inclusion", "Tutoring & Mentoring", "Fundraising & Philanthropy",
        "Legal Aid & Human Rights", "Robotics & AI", "Fashion & Design", "Film & Photography",
        "Theater & Drama", "Outdoor Adventure", "Career Networking", "Gaming & eSports",
        "Volunteering", "Women's Empowerment", "LGBTQ+ Advocacy", "Disability Awareness",
        "Cultural Exchange", "Public Speaking", "Literary Society", "Software Development",
        "Astronomy & Space", "DIY & Crafting", "Yoga & Mindfulness", "Travel & Exploration"
];

router.get('/', async (req, res) => {
        res.json(tags);
});

module.exports = router;