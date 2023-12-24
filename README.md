# SubClub - The Sublet Management App

🌎 [Deployed App](https://thesubclubapp.netlify.app/)

## Overview

Sub.club is a web application that addresses Victoria's housing challenges by providing a streamlined solution for those looking to share their home by subletting. This application simplifies the management of rooms, occupants(tenant) and agreements made with each occupant. Focused on ease of use and automation, it aims to improve the subletting experience, filling a gap in the market left by existing solutions such as paper or Excel-based methods.

The application has been built with the MERN stack and deployed with Netlify and Heroku.

### Main features of the application:

#### User account:

- user account creation
- Login authentication
- Keeps the session open for a maximum of 24 hours for security reasons.
- Logout button to end the session.

#### Rooms:

- Creation of rooms available for subletting
- View users' rooms
- Button to update room information
- Button to delete rooms

#### Occupants:

- Create occupant profiles
- View occupant profile
- Button to update occupant profile data
- Button for deleting occupant

#### Room Assignment:

- Create room assignments by linking occupants and rooms, and adding information about payment arrangements and dates of stay.
- Display of each room assignment
- Button to update room assignment information.
- Button to cancel a room assignment.
- Display status of room assignments (active / cancelled).


## Installation Instructions

To use the production application, please visit [The SubClub App](https://thesubclubapp.netlify.app/) and create an account, and enjoy using the application!


*To use the app locally, please follow the below instructions.*

### Requirements:

- Node.js v18.18.0
- MongoDB Atlas account. _If you do not have MongoDB please visit [MongoBD Atlas](https://www.mongodb.com/docs/atlas/) and create a free account.


### SubClub App Local Setup Guide

#### Server:

1. **Create a Directory:**
   Open your terminal and create a directory for the SubClub app server side on your machine.

   ```bash
   mkdir SubClub-backend
   cd SubClub-backend
   ```

2. **Clone the Server Repo:**
   Clone the server repository into the newly created directory.

   ```bash
   git clone git@github.com:SubClub-The-Sublet-Management-App/SubClub-backend.git
   cd server
   ```

3. **Install Dependencies:**
   Install the required npm packages for the server.

   ```bash
   npm install
   ```

4. **Create .env file:**
    In the server directory, create a .env file and add your MongoDB Atlas [Connection String](https://www.mongodb.com/docs/guides/atlas/connection-string/), and the other variables for the set up.

```bash
    DB_URI=YourMongoDBAtlasConnectionStringHere

    PORT=3030

    JWT_KEY=YourSecretKeyHere
```

5. **Start the Server:**
   Start the local server.

   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:3030`.

  

#### Client:

1. **Create a Directory:**
   Create a new directory for the `SubClub` app frontend. 

   ```bash
   cd ..
   mkdir sub-club-frontend
   cd sub-club-frontend
   ```

2. **Clone the Client Repo:**
   Clone the client repository into the `client` directory.

   ```bash
   git clone git@github.com:SubClub-The-Sublet-Management-App/subclub-frontend.git
   cd client
   ```

3. **Install Dependencies:**
   Install the required npm packages for the client.

   ```bash
   npm install
   ```

4. **Create .env file:**
   In the `sub-club-frontend` directory, create a `.env` file to connect with your server.

   ```env
    REACT_APP_BACKEND_URL=http://localhost:3030
   ```

5. **Ensure the Server is Running:**
   Make sure that your local server is still running on port 3030.

6. **Start the Client:**
   Start the local client.

   ```bash
   npm start
   ```

   The client will run on `http://localhost:3000`.

7. **Open in Browser:**
   A new browser window will open automatically, displaying the SubClub app.


You have successfully set up and run the SubClub app locally with MongoDB Atlas. Explore the features and enjoy using the application!

_____

## Frontend End Points 

| Route | Component | Description |
|-------|-----------|-------------|
| /signup | SignupPage | Display signup form to signup |
| /login | LoginPage | Display login form to login |
| /rooms | RoomsPage | Display all rooms and their details |
| /rooms/add-room | NewRoomsPage | Display a form to add new room |
| /occupants | OccupantsPage | Display all occupants and their profile details |
| /occupants/add-occupant | NewOccupantPage | Display a form to add new occupant |
| /room-assignments | RoomAssignmentsPage | Display all room assignments and their details |
| /room-assignments/add-room-assignment | NewRoomAssignmentPage | Display a form to add new room assignment |


_____


## Site Map

The Sub-Club App site map

![SubClub site map](/readme-img//SubClub-sitemap.drawio.png)

## Screenshot of the website

### Desktop view

#### Signup page
![signup-page](/readme-img/Signup-page.png)

#### Login page
![login-page](/readme-img/Login-page.png)

#### Rooms page
*Display all available rooms*

![Rooms-page](/readme-img/Rooms-page.png)

#### Add new Room 
*Displays a form and sends a post request to the backend to add a new room*.

![Add-new-room-page](/readme-img/Add-new-room-page.png)

#### Update a Room
*Displays a prefill form and sends a patch request to the backend to update a room*.

![Update-room-page](/readme-img/Update-room.png)


#### Delete a Rooom - confirm delete message
*Displays a pop up messages for user to confirm a room deletion*.

![Delete-room-page](/readme-img/Confirmation-message-delete-room.png)


#### Occupants Page
*Display all occupants profile*

![Occupants-page](/readme-img//Occupants-page.png)

#### Occupants - view occupant contact information
*Display occupants contacts when click on "Contacts" button*

![Occupants-page-occupant-contacts](/readme-img/Occupants-page-view-ocupant-contact-information.png)

#### Add new Occupant
*Displays a form and sends a post request to the backend to add a new occupant*.

![Add-new-occupant-1](/readme-img/Add-new-occupant-1.png)
![Add-new-occupant-2](/readme-img/Add-new-occupant-2.png)

#### Update an occupant
*Displays a prefill form and sends a patch request to the backend to update an occupant profile*

![Update-occupant-1](/readme-img/Update-occupant-1.png)
![Update-occupant-2](/readme-img/Update-occupant-2.png)

#### Delete an Occupant- confirm delete message
*Displays a pop-up message for the user to confirm the deletion of an occupant profile and send the delete request to the backend on confirmation*

![Delete-occupant](/readme-img/Confirmation-message-delete-room.png)


### Room Assignment page
*Display all rooom assignments*

![Room-assignment-page](/readme-img/Room-assignment-page-all-assignments-1.png)


#### Room Assignments - view assignment payment agreement information
*Display payment agreement  information of the room assignment when click on "Agreement" button*

![Room-assignment-page-view-agreement-info](/readme-img/Room-assignment-page-agreement-information.png)


#### Add new Room Assignment
*Displays a form and sends a post request to the backend to add a new room assignment*.

![Add-new-room-assignment](/readme-img/Add-new-room-assignment-page.png)

#### Update a Room Assignment
*Displays a prefill form and sends a patch request to the backend to update a room assignment*.

![Update-room-assignment](/readme-img/Update-room-assignment.png)


#### Cancel a Rooom Assignment- confirm cancel message
*Displays a pop-up message for the user to confirm the cancellation of a room assignment and send a patch request to the backend to change assignment status on confirmation**

![Cancel-room-assignment](/readme-img/Confirmation-message-cancel-room-assignment.png)

#### View of a cancelled Rooom Assignment

*Change the status of the room assignment to "Cancelled" and disables the cancel button*

![Cancelled-room-assignment](/readme-img/Room-assignment-status-change.png)


## Frontend Libraries & Dependencies:

### Production Dependencies:

1. **@headlessui/react:**
   - Description: A set of completely unstyled, fully accessible UI components for React.
   - Usage: Used for building accessible user interfaces.

2. **@tailwindcss/forms:**
   - Description: Tailwind CSS plugin that provides styles for form elements.
   - Usage: Enhances styling for form elements in the project.

3. **axios:**
   - Description: A promise-based HTTP client for the browser and Node.js.
   - Usage: Used for making HTTP requests to interact with a backend or API.

4. **react:**
   - Description: A JavaScript library for building user interfaces.
   - Usage: Core library for building the React application.

5. **react-dom:**
   - Description: DOM-specific methods for React.
   - Usage: Necessary for rendering React components in the DOM.

6. **react-icons:**
   - Description: A library of popular icons for React.
   - Usage: Provides a collection of icons for use in the application.

7. **react-router-dom:**
   - Description: DOM bindings for React Router.
   - Usage: Enables navigation and routing in the React application.

8. **react-scripts:**
   - Description: Configuration and scripts for Create React App.
   - Usage: Handles the build, start, and test scripts for the React application.

9. **react-spinners:**
   - Description: A collection of loading spinner components for React.
   - Usage: Provides loading indicators for better user experience during data fetching.

10. **web-vitals:**
    - Description: Library for tracking web vitals.
    - Usage: Measures and reports essential web performance metrics.

### Development Dependencies:

1. **prettier:**
   - Description: A code formatter that enforces a consistent code style.
   - Usage: Used for formatting code during development to maintain code consistency.

2. **tailwindcss:**
   - Description: A utility-first CSS framework for rapidly building custom user interfaces.
   - Usage: Provides a set of utility classes for styling components in the project.
