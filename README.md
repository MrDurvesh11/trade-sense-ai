**TradeSense.AI Project README**

Welcome to the TradeSense.AI project! This project aims to provide users with insightful stock analysis and trading recommendations using artificial intelligence and data analytics. Below you'll find important information about the project setup and components.

### Project Overview:

TradeSense.AI combines the power of AI-generated insights with real-time financial data to assist users in making informed trading decisions. The project consists of the following components:

1. **Frontend**: Built using Next.js, a React framework for building server-side rendered and static web applications.
2. **Backend**: Developed with Flask, a lightweight Python web framework, to interact with the Gemini API for stock analysis and recommendations.
3. **Database**: Utilizes a MySQL database stored in XAMPP to store user data and historical stock information.
4. **API**: The backend interacts with the database using a Next.js API to manage user authentication, data retrieval, and storage.

### Project Setup:

To set up the TradeSense.AI project on your local machine, follow these steps:

1. **Clone the Repository**: Clone the TradeSense.AI repository from the project's GitHub repository.
   ```bash
   git clone <repository_url>
   ```

2. **Frontend Setup**: Navigate to the `frontend` directory and install the required dependencies.
   ```bash
   cd frontend
   npm install
   ```

3. **Backend Setup**: Navigate to the `backend` directory and set up the Python virtual environment. Then, install the required Python packages.
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Activate virtual environment (Linux/Mac)
   .\venv\Scripts\activate    # Activate virtual environment (Windows)
   pip install -r requirements.txt
   ```

4. **Database Setup**: Install XAMPP and set up a MySQL database. Import the provided SQL dump file to create the necessary tables and data.

5. **Configuration**: Update the configuration files (`config.js` for frontend, `.env` for backend) with appropriate settings such as API keys, database credentials, etc.

6. **Run the Application**: Start both the frontend and backend servers.
   - Frontend: `npm run dev`
   - Backend: `flask run`

### Usage:

Once the application is running, access the TradeSense.AI web interface through your browser. Users can:

- View stock analysis and trading recommendations generated by AI.
- Perform stock searches and view detailed stock information.
- Authenticate to access personalized features like saved searches, watchlists, etc.

### Contributing:

We welcome contributions from the community! If you'd like to contribute to the TradeSense.AI project, please follow these steps:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Make your changes and ensure they pass all tests.
3. Submit a pull request detailing your changes, including a clear description and purpose.

### Support:

If you encounter any issues or have questions about the TradeSense.AI project, please don't hesitate to reach out to the project maintainers or open an issue on the GitHub repository.

Thank you for choosing TradeSense.AI! We hope you find it useful for your stock trading endeavors. Happy trading! 📈✨
