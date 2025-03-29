const { faker } = require("@faker-js/faker");

// Function to generate books dynamically
const generateBooks = (seed, page, region, reviewsCount) => {
    faker.seed(Number(seed) + page);
    faker.locale = region;

    const books = [];
    for (let i = 0; i < 20; i++) {
        const isbn = faker.string.numeric(13);
        const title = faker.lorem.words(3);
        const author = faker.person.fullName();
        const publisher = faker.company.name();
        const cover = faker.image.urlLoremFlickr({ category: "books" });
        const likes = faker.number.int({ min: 0, max: 100 });
        const uploaded = new Date();

        let reviews = [];
        if (reviewsCount > 0) {
            for (let j = 0; j < reviewsCount; j++) {
                reviews.push({
                    text: faker.lorem.sentence(),
                    author: faker.person.fullName(),
                    company: faker.company.name(),
                });
            }
        }

        books.push({ isbn, title, author, publisher, cover, likes, reviews, uploaded });
    }

    return books;
};


// Controller to return generated books
const getBooks = async (req, res) => {
    try {
        const { seed = 12345, page = 1, region = "en", reviews = 0 } = req.query;
        const books = generateBooks(seed, page, region, Number(reviews));
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getBooks };

