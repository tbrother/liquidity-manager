-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    term INTEGER NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
