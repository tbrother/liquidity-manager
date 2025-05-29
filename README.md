# Liquidity Manager

A modern web application built with Angular and Node.js for managing liquidity and orders.

## Features

- Order history tracking
- Real-time order management
- User-friendly interface

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker and Docker Compose

### Quick Start

1. Clone and install
```bash
git clone https://github.com/YOUR_USERNAME/liquidity-manager.git
cd liquidity-manager
npm install
```

2. Start the database
```bash
docker compose up -d
```

3. Run the full stack (frontend + backend)
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:4200
- Backend API: http://localhost:3000

### Development

For separate development:
- Frontend: `npm run dev:client` (port 4200)
- Backend: `npm run dev:server` (port 3000)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 