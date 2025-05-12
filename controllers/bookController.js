const { faker } = require("@faker-js/faker");

// Function to generate books dynamically
const generateBooks = (seed, page, region, avgLikes, avgReviews) => {
    faker.seed(Number(seed) + page);
    faker.locale = region;

    const books = [];
    for (let i = 0; i < 20; i++) {
        const isbn = faker.string.numeric(13);
        const title = faker.lorem.words(3);
        const author = faker.person.fullName();
        const publisher = faker.company.name();
        const cover = faker.image.urlLoremFlickr({ category: "books" });

        // Generate likes around the average value
        const likes = Math.max(0, Math.min(10, faker.number.float({ min: avgLikes - 1, max: avgLikes + 1 })));

        let reviews = [];
        const numReviews = Math.max(0, Math.round(faker.number.float({ min: avgReviews - 1, max: avgReviews + 1 })));
        for (let j = 0; j < numReviews; j++) {
            reviews.push({
                text: faker.lorem.sentence(),
                author: faker.person.fullName(),
                company: faker.company.name(),
            });
        }

        books.push({ isbn, title, author, publisher, cover, likes, reviews });
    }

    return books;
};

// Controller to return generated books
const getBooks = async (req, res) => {
    try {
        const { seed = 12345, page = 1, region = "en", avgLikes = 5, avgReviews = 1 } = req.query;
        const books = generateBooks(seed, Number(page), region, Number(avgLikes), Number(avgReviews));
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getBooks };
