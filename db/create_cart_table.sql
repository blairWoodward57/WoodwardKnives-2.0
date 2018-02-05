CREATE TABLE IF NOT EXISTS knivesCart (
    id SERIAL PRIMARY KEY,
    userId INTEGER,
    knifeId INTEGER,
    quantity INTEGER DEFAULT 1
)