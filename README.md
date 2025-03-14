# GitHub Candidate Search Application

A web application that allows employers to search for potential candidates using the GitHub API. Users can view candidate profiles, accept or reject candidates, and maintain a list of potential candidates for future reference.

![GitHub Candidate Search Application](https://via.placeholder.com/800x400?text=GitHub+Candidate+Search+Application)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Configuration](#api-configuration)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [License](#license)

## Features

- **Candidate Search**: View GitHub user profiles one at a time
- **Accept/Reject Functionality**: Save potential candidates or skip to the next profile
- **Persistent Storage**: Save accepted candidates to local storage for future reference
- **Candidate Management**: View, sort, and filter saved candidates
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- **React**: Frontend library for building user interfaces
- **TypeScript**: Static typing for JavaScript
- **Vite**: Next-generation frontend tooling
- **GitHub API**: Source of candidate data
- **Local Storage**: Client-side storage for saving candidate information
- **React Router**: Navigation between pages
- **React Icons**: Icon components for UI elements

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ReplicantCoder9000/module13.git
   cd module13
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a GitHub Personal Access Token:
   - Follow the instructions on [creating a fine-grained personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
   - No additional privileges are needed beyond the default permissions

4. Create a `.env` file in the `environment` folder:
   ```
   VITE_GITHUB_TOKEN=your_github_token_here
   ```

## Usage

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173`

3. On the Candidate Search page:
   - View candidate information including name, username, location, avatar, email, GitHub URL, and company
   - Click the "+" button to save a candidate to your potential candidates list
   - Click the "-" button to skip to the next candidate

4. On the Potential Candidates page:
   - View all saved candidates
   - Sort candidates by clicking on column headers
   - Filter candidates using the search box
   - Remove candidates from the list by clicking the "Remove" button

## API Configuration

The application uses the GitHub API to retrieve user data. The API calls are configured in `src/api/API.tsx`:

- `searchGithub()`: Retrieves a list of GitHub users
- `searchGithubUser(username)`: Retrieves detailed information about a specific user

## Deployment

### Deploying to Render

1. Create a Render account at [render.com](https://render.com/) if you don't have one

2. From your Render dashboard:
   - Click "New" and select "Static Site"
   - Connect your GitHub account and select the repository
   - Configure the following settings:
     - Name: Choose a name for your site (e.g., "github-candidate-search")
     - Branch: main
     - Build Command: `npm run build`
     - Publish Directory: `dist`
     - Environment Variables: Add your GitHub token
       - Key: `VITE_GITHUB_TOKEN`
       - Value: Your GitHub personal access token

3. Click "Create Static Site" and Render will automatically build and deploy your application

4. Once deployment is complete, you'll receive a URL where your site is hosted

## Project Structure

```
module13/
├── environment/          # Environment configuration
│   ├── .env              # Environment variables (not in repo)
│   └── .env.EXAMPLE      # Example environment file
├── public/               # Public assets
├── src/                  # Source code
│   ├── api/              # API calls
│   │   └── API.tsx       # GitHub API functions
│   ├── assets/           # Static assets
│   ├── components/       # Reusable components
│   │   └── Nav.tsx       # Navigation component
│   ├── interfaces/       # TypeScript interfaces
│   │   └── Candidate.interface.tsx  # Candidate data structure
│   ├── pages/            # Page components
│   │   ├── CandidateSearch.tsx      # Candidate search page
│   │   ├── ErrorPage.tsx            # Error page
│   │   └── SavedCandidates.tsx      # Saved candidates page
│   ├── App.tsx           # Main application component
│   ├── index.css         # Global styles
│   └── main.tsx          # Application entry point
├── .eslintrc.cjs         # ESLint configuration
├── .gitignore            # Git ignore file
├── index.html            # HTML entry point
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## Screenshots

### Candidate Search Page
![Candidate Search Page](https://via.placeholder.com/800x400?text=Candidate+Search+Page)

### Potential Candidates Page
![Potential Candidates Page](https://via.placeholder.com/800x400?text=Potential+Candidates+Page)

## License

© 2024 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.