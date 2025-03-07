**AcademiNet**

AcademiNet is a web application that allows researchers to post open positions in their labs, specify qualification requirements, and provide contact information. Students can create profiles, upload resumes, and apply for research positions directly through the site. The project is built using the MERN (MongoDB, Express, React, Node.js) stack.

Current Features Implemented

Frontend

✅ AcademiNet homepage with fake research news feed✅ Navigation sidebar with options:

View Positions

Post a Position

Apply for a Position

Add Friends✅ Login & Signup system with:

First Name & Last Name validation (Must start with an uppercase letter, no spaces, dashes allowed)

Password validation (Minimum 8 characters, 1 number, 1 special character)

Email validation (Must end in .edu)

Account confirmation via email✅ A confirmation email is sent upon signup with a verification link✅ Resend confirmation email option✅ Protected routes: Unconfirmed users cannot view positions or apply

Backend

✅ Node.js + Express.js backend with API endpoints for:

User authentication (Signup, Login, Email Confirmation)

Managing research positions & applications✅ MongoDB database running in a Docker container✅ Passwords are hashed for security using bcrypt✅ Email notifications sent using Nodemailer

🚀 How to Set Up the Project Locally

To run this project on your local machine, follow these steps.

1. Clone the Repository

Open a terminal or command prompt and run:

git clone https://github.com/YOUR_GITHUB_USERNAME/AcademiNet.git
cd AcademiNet

2. Install Dependencies

The project has backend and frontend directories. Install dependencies for both:

cd backend
npm install

cd ../frontend
npm install

3. Start MongoDB in Docker

Ensure Docker is installed and running, then start a MongoDB container:

docker run --name mongodb -p 27017:27017 -d mongo

4. Set Up Environment Variables

Create a .env file in the backend/ folder with the following:

EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

(Replace with your actual email credentials for sending confirmation emails.)

5. Start the Backend

In the backend/ directory, run:

npm start

You should see Server running on port 5000 and MongoDB connected.

6. Start the Frontend

In the frontend/ directory, run:

npm start

The React app should open at http://localhost:3000.

📌 Things I Want Done Next

✅ Make the website look better (Improve UI design, layout, and styling)✅ Connect the backend fully (Ensure all API endpoints work correctly with the frontend)✅ Enhance functionality:

Improve user experience when applying for positions

Add more filters for finding research opportunities

Implement real research news updates

Improve friend search functionality✅ Deployment: Host the site online using services like Heroku, Vercel, or AWS✅ Better authentication system:

Implement password reset functionality

Add social login options (Google, GitHub, etc.)

💡 Contributing

If you’d like to contribute, please fork the repository, create a new branch, and submit a pull request. Any help with improving the UI, connecting backend features, or adding new features is welcome!

🔗 License

This project is licensed under the MIT License.

