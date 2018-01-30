CREATE TABLE IF NOT EXISTS knifeTable (
    id SERIAL PRIMARY KEY,
    knife_name VARCHAR(240),
    description VARCHAR (600),
    blade_length DECIMAL(7, 2),
    overall_length DECIMAL(7, 2),
    blade_thickness DECIMAL(7, 2)
    price DECIMAL(7, 2),
    handle_material VARCHAR(180),
    steel_type VARCHAR(180),
    img TEXT
)