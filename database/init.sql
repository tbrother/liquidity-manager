-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    term INTEGER NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Treasury data table (for caching)
CREATE TABLE treasury_yields (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    term INTEGER NOT NULL,
    yield_rate DECIMAL(8,4) NOT NULL,
    UNIQUE(date, term)
);
