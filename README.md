# DriveMe - Luxury Car Rental App (React Native + Django)

DriveMe is a car rental application where users can rent luxury cars. It is a simple CRUD application with a REST API backend.

---

## Project Overview

- **Backend**: Django 5.1, DRF 3.15.2, Djoser 2.2.3, Drf-Yasg 1.21.7
- **Frontend**: React Native 0.74.5, Expo 51.0.27

## Installation & Setup

### Backend

1. Make sure you have Docker and `docker-compose` installed.
2. Run the following command from the project root:
  ```bash
  cd back-end
  docker compose up
  ```

### Frontend

1. Make sure you have `npm` and `Expo CLI v51` installed.
2. Install the dependencies:
  ```bash
  cd front-end
  npm i expo@51
  npm i
  ```
3. Start the frontend:
  ```bash
  npm run ios
  ```

### Important Notices

- You must have Expo SDK v51 to run this project on your device.
- The image sizes may vary depending on the device's screen size.
- The payment system is currently mocked and only logs transactions in the database.
- If you want to access the admin panel on backend-side -- username: testUser -- password: password1234

---

## Screenshots
<img width="351" alt="Screenshot 2024-03-21 at 18 41 07" src="https://github.com/1olelllka/DriveMe/assets/67587036/c802da55-e428-4c98-97d7-d82527f837fe">
<img width="351" alt="Screenshot 2024-03-21 at 18 44 18" src="https://github.com/1olelllka/DriveMe/assets/67587036/c45cedd7-1b6a-4b16-be6a-1967f1e99169">


**Disclaimer:** The code for this project was written entirely by me. A design template was used for visual inspiration only and was applied solely for educational purposes.
The template url: https://dribbble.com/shots/21653322-Car-Shop-Mobile-App