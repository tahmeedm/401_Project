# FitMade

## Overview
FitMade is a project developed by **Group 1** for the **SNEG 401** course. It is a full-stack application designed to provide AI-driven solutions, leveraging modern web technologies and machine learning frameworks.

---

## Project Structure
The project is divided into two main components:

### 1. **Client**
- **Framework**: [Next.js](https://nextjs.org/)
- **Setup Instructions**:
    1. Navigate to the `client` folder.
    2. Run the following commands:
         ```bash
         npm install --force
         npm run dev
         ```
- The client serves as the front-end of the application, providing an intuitive user interface.

### 2. **Server**
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Setup Instructions**:
    1. Navigate to the `server` folder.
    2. Install dependencies:
         ```bash
         pip install -r requirements.txt
         ```
    3. Run the server to enable backend functionality.

---

## AI Integration
The server includes advanced AI capabilities implemented in the `agent.py` file:
- **Agent**: Gemini Agent (developed by Google).
- **Framework**: [LangChain](https://langchain.com/), used for building and managing AI workflows.

The AI component powers the core functionality of FitMade, enabling intelligent and dynamic responses.

---

## Technologies Used
- **Frontend**: Next.js
- **Backend**: FastAPI
- **Database**: PostgreSQL
- **AI Frameworks**: LangChain, Gemini Agent
- **Package Managers**: npm, pip
- **Deployment**: AWS

---

## How to Run
1. Set up the client and server as described above.
2. Start the client and server simultaneously.
3. Access the application via the client interface.

---

FitMade combines cutting-edge AI with modern web development to deliver a seamless and intelligent user experience.