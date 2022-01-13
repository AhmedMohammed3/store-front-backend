-- seed products table
INSERT INTO products (name, price, category) VALUES
    ('Apple', '1.00', 'Fruit'),
    ('Banana', '0.50', 'Fruit'),
    ('Orange', '0.75', 'Fruit'),
    ('Pear', '0.75', 'Fruit'),
    ('Tomato', '0.75', 'Vegetable'),
    ('Potato', '0.75', 'Vegetable'),
    ('Carrot', '0.75', 'Vegetable'),
    ('Cucumber', '0.75', 'Vegetable'),
    ('Onion', '0.75', 'Vegetable'),
    ('Garlic', '0.75', 'Vegetable'),
    ('Celery', '0.75', 'Vegetable'),
    ('Lettuce', '0.75', 'Vegetable'),
    ('Spinach', '0.75', 'Vegetable'),
    ('Broccoli', '0.75', 'Vegetable'),
    ('Asparagus', '0.75', 'Vegetable'),
    ('Cauliflower', '0.75', 'Vegetable'),
    ('Kale', '0.75', 'Vegetable'),
    ('Artichoke', '0.75', 'Vegetable'),
    ('Zucchini', '0.75', 'Vegetable'),
    ('Eggplant', '0.75', 'Vegetable'),
    ('Celery', '0.75', 'Vegetable'),
    ('Cabbage', '0.75', 'Vegetable'),
    ('Turnip', '0.75', 'Vegetable'),
    ('Asparagus', '0.75', 'Vegetable'),
    ('Cauliflower', '0.75', 'Vegetable'),
    ('Kale', '0.75', 'Vegetable'),
    ('Artichoke', '0.75', 'Vegetable'),
    ('Zucchini', '0.75', 'Vegetable'),
    ('Eggplant', '0.75', 'Vegetable'),
    ('Celery', '0.75', 'Vegetable');

-- seed users table
INSERT INTO users(firstname,lastname,password) VALUES
    ('John', 'Doe', '$2b$10$yG8etlWFfqR0bVNdImfOjuBWYFmvj8Nu9Pa6.15v7iehPpvccvtye'),
    ('Jane', 'Doe', '$2b$10$jMUmsJvLQKDMDnhe0smb9OeXq73T334v5YHXlluBMG4Qgu9E3R5O2');

-- seed orders table
INSERT INTO orders (user_id, status) VALUES
    (1, 'completed'),
    (1, 'completed'),
    (2, 'active'),
    (2, 'completed'),
    (2, 'active');

-- seed orders_products table
INSERT INTO orders_products (order_id, product_id, quantity) VALUES
    (1, 1, 1),
    (1, 2, 1),
    (1, 3, 1),
    (2, 4, 1),
    (2, 5, 1),
    (2, 6, 1),
    (3, 7, 1),
    (3, 8, 1),
    (3, 9, 1),
    (3, 10, 1),
    (4, 11, 1),
    (5, 12, 1),
    (5, 13, 1),
    (5, 14, 1),
    (5, 15, 1);