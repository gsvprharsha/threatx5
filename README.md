<h1 align="center">
  <br>
  <a href="https://github.com/gsvprharsha/threatx5"><img src="https://github.com/gsvprharsha/threatx5/blob/main/public/images/threatx5/hero.png" alt="Threat X5" width="700" height="160"></a>
  <br>
  Threat X5
  <br>
</h1>

<h3 align="center">
<b>Open-source APT Search Engine & Encyclopedia</b>
</h3>

<p align="center">
<b><a href="https://threatx5.vercel.app">Visit Threat X5</a></b>
<b>&ensp;•&ensp;</b>
<b><a href="#features">Features</a></b>
<b>&ensp;•&ensp;</b>
<b><a href="#future-goals">Future Goals</a></b>
</p>

# What's Threat X5?
**Threat X5 is an open-source APT (Advanced Persistent Threat) search engine and encyclopedia designed to provide cybersecurity professionals, researchers, and enthusiasts with detailed information on APT groups worldwide. By compiling and categorizing publicly available information, Threat X5 enables users to easily access critical intelligence on APT groups, including their origins, motives, targets, attack techniques, and more.**

**Threat X5 is a powerful tool for anyone seeking insights into global cyber threats, allowing for effective searches by regions, industries, or specific attack characteristics. It aims to be an educational and practical resource for a deeper understanding of cyber threat intelligence.**

# Screenshot
<h1 align="center">
  <a href="https://threatx5.vercel.app"><img src="https://github.com/gsvprharsha/threatx5/blob/main/public/images/threatx5/screenshot.png" alt="Threat X5" width="666" height="375"></a>
</h1>

# Getting Started
Getting Threat X5 up and running locally is quick and straightforward. Follow the steps below to set up the project on your local machine.

### Prerequisites
Before you begin, ensure you have the following installed:

- Node.js (version 16 or higher)
- npm (comes with Node.js)
- Git (Latest version)

## Steps to Set Up

1. **Clone the Repository**  

   Clone the Threat X5 repository to your system:  
   ```bash
   git clone https://github.com/gsvprharsha/threatx5.git
   cd threatx5
   ```
3. **Install Dependencies**

   Install the required dependencies using npm:
   ```bash
   npm install
   ```
4. **Start the Development Server**

   Launch the application locally by running:
   ```bash
   npm run dev
   ```
6. **Access the Application**

   Once the server starts, open your browser and visit: ```http://localhost:3000```

# Environment Variables
To run Threat X5 locally, you need to set up three critical environment variables in a .env file. These variables ensure the application connects properly to its backend services. You can refer the ```.env.example``` file in the root directory of the project

```
SUPABASE_KEY: A Supabase project API key, used to interact with the Supabase backend services.
SUPABASE_URL: The URL of your Supabase project.
DATABASE_URL: The connection string for your database.
```

# Features

- **Comprehensive APT Profiles:** Access detailed profiles on APT groups, including information on their history, motives, typical targets, and attack strategies.
- **Real-Time Updates:** Stay up-to-date with the latest APT campaigns, emerging threat actors, and new attack tactics.
- **Educational Resources:** Includes articles, research papers, and guides to help users understand and defend against APTs.

# Future Goals
The roadmap for Threat X5 includes:

- Create the Project Wiki
- Adding a community-driven feedback and review system to improve data accuracy.
- Extending the database to cover more malware and APT families and regions.
- Implementing advanced data visualization features for APT activity over time.
- Introducing API support for automated data extraction.

**Threat X5** is licensed under the [MIT License](https://opensource.org/licenses/MIT), encouraging open-source contributions and collaboration.
