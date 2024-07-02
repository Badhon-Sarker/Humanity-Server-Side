Website Name: Humanity

Live site link: https://assignment-11-e078a.web.app

Features & Characteristics:

● Our website has 3 routes in the top. By default it will show on home section. It also have site name, profile image and a logout button. when user is logged in he will show profile image and logout button, otherwise it will show login button and register button.

● Login section have email and password based system and sign in with google and github system.

● If a new user click on profile image it will show another two routes.

● After successful account creation, log in , log out, the website will notify with hot toast.

● In home page one can see a slider, volunteer needs now, faq and others sections.

● All card will display in basis of upcoming deadline.

● After clicking on see all button it will redirect him to need volunteer page.

● A user can become volunteer and he will see all his request on my volunteer request page.

● A user can add new volunteer through add volunteer page.

● By manage volunteer post page he can modify and delete those added item.

● This site is connected with Mongodb.

● This site is responsive for small, medium and large devises.



## HTML, CSS, Tailwind, React, Node JS, Express JS, Mongo DB and JWT have been used in this project.



Follow these instructions to set up and run the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (version X.X.X)
- [MongoDB](https://www.mongodb.com/) (version X.X.X)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**

    ```sh
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name
    ```

2. **Install dependencies**

    ```sh
    npm install
    ```

3. **Set up environment variables**

    Create a `.env` file in the root directory and add the following environment variables:

    ```env
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/your-database-name
    ```

4. **Start MongoDB**

    Ensure MongoDB is running. You can start MongoDB using:

    ```sh
    mongod
    ```

5. **Run the application**

    ```sh
    npm start
    ```

    The application should now be running on [http://localhost:5000](http://localhost:5000).

### Additional Notes

- Ensure MongoDB is properly installed and running on your local machine. You can refer to the [MongoDB installation guide](https://docs.mongodb.com/manual/installation/) for detailed instructions.
- If you encounter any issues, check the console for error messages and ensure all dependencies are correctly installed.
- For more advanced usage and configuration, refer to the project documentation or source code comments.
