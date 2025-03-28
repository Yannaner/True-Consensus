
<div align="center">

# True-Consensus

Open Source Consensus Voting with the Ranked Pairs Algorithm

[![Last Commit](https://img.shields.io/github/last-commit/Yannaner/True-Consensus?label=Last%20Commit)](https://github.com/Yannaner/True-Consensus/commits)  
[![Contributors](https://img.shields.io/github/contributors/Yannaner/True-Consensus?label=Contributors)](https://github.com/Yannaner/True-Consensus/graphs/contributors)  
[![Issues](https://img.shields.io/github/issues/Yannaner/True-Consensus?label=Issues)](https://github.com/Yannaner/True-Consensus/issues)  
[![Forks](https://img.shields.io/github/forks/Yannaner/True-Consensus?label=Forks)](https://github.com/Yannaner/True-Consensus/network)  
[![Stars](https://img.shields.io/github/stars/Yannaner/True-Consensus?label=Stars)](https://github.com/Yannaner/True-Consensus/stargazers)  
[![License](https://img.shields.io/github/license/Yannaner/True-Consensus?label=License)](https://github.com/Yannaner/True-Consensus/blob/main/LICENSE)  
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/Yannaner/True-Consensus/actions)  
[![Languages](https://img.shields.io/github/languages/count/Yannaner/True-Consensus?label=Languages)](https://github.com/Yannaner/True-Consensus)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Inspiration](#inspiration)
- [Features](#features)
- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Usage](#installation--usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

---

## Overview

**True-Consensus** is an open-source consensus voting platform that implements the Ranked Pairs algorithm. Designed to ensure transparency and fairness in decision-making processes, True-Consensus enables communities to conduct votes that accurately reflect collective preferences using advanced voting methods.

---

## Inspiration

Traditional voting systems often suffer from opacity and bias. True-Consensus was developed to restore trust in the voting process by implementing a clear, verifiable algorithm. Our goal is to empower communities with a transparent voting system where every vote is accounted for, and the final decision truly represents the consensus.

---

## Features

- **Transparent Process**: Open and verifiable implementation of the Ranked Pairs algorithm.
- **Fair Decision-Making**: Uses the Condorcet method to determine the most broadly supported option.
- **Secure Voting**: Ensures that each user can vote only once, maintaining the integrity of the vote.
- **Community Driven**: Built for open-source collaboration and continuous improvement.
- **Scalable Architecture**: Designed to handle complex voting scenarios and growing user bases.

---

## How It Works

1. **Vote Collection**: Participants rank their choices in order of preference.
2. **Pairwise Comparison**: The system conducts head-to-head comparisons between all candidates.
3. **Ranked Pairs Algorithm**: Locks in the strongest wins while avoiding cycles, establishing a clear ranking.
4. **Result Declaration**: The candidate who prevails in all pairwise matchups is declared the consensus winner.

---

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: NestJS, TypeORM
- **Database**: PostgreSQL
- **Authentication**: Firebase
- **Hosting**: Vercel (frontend), Render (backend)
- **Languages**: TypeScript, JavaScript

---

## Project Structure

```
True-Consensus/
├── backend/                 # NestJS backend application
├── frontend/                # Next.js frontend application
├── docs/                    # Documentation and design resources
├── .gitignore
├── package.json             # Root package configuration
├── README.md                # This README file
└── LICENSE                  # License file
```

---

## Installation & Usage

### Prerequisites

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Firebase](https://firebase.google.com/)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Yannaner/True-Consensus.git
   cd True-Consensus
   ```

2. **Setup the Backend**:
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```

3. **Setup the Frontend**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Environment Configuration**:
   - Configure your environment variables for the backend (e.g., PostgreSQL connection, Firebase credentials) and the frontend (e.g., API endpoints).

### Running the Application

- **Backend**: The backend server runs on `http://localhost:4000` by default.
- **Frontend**: The frontend application runs on `http://localhost:3000` by default.

---

## Contributing

Contributions are welcome! To contribute to True-Consensus:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes with clear, descriptive messages.
4. Push to your branch (`git push origin feature/your-feature`).
5. Open a pull request detailing your changes.

---

## License

This project is licensed under the [MIT License](LICENSE).

---



## Acknowledgements

- Thanks to the open-source community for their continuous support and feedback.
- Special recognition to the developers behind NestJS, Next.js, and PostgreSQL.
- Inspired by the need for transparent and fair voting systems.

```

