# MedTrack

MedTrack is a created with one goal in mind: to make one’s healthcare journey smoother than ever before. Whether you’re a doctor looking to streamline your practice or a patient in need of convenient appointment scheduling, MedTrack has got you covered.

It’s a digital hub where all your medical info converges seamlessly. Doctors, it’s time for easy access to patient particulars and consultation records. No more digging through piles of paperwork, as MedTrack puts everything you need right at your fingertips.

And for you, the patient? Get ready for a whole new level of convenience. Say goodbye to endless waiting rooms and hello to effortless appointment booking. Need to cancel or reschedule? No problem! MedTrack makes it a breeze.

But that’s not all. With features like profile customisation (and upcoming communication channel), MedTrack is more than just a medical tool—it can easily be your healthcare sidekick, here to make your life easier every step of the way.

Why wait? With MedTrack, it’s effortless medical management, proactive care, and a healthier tomorrow.

## Screenshots

### Login Page
<img width="1710" alt="Screenshot 2024-05-04 at 2 41 28 PM" src="https://github.com/aetheryn/ga-project-4/assets/158107061/aa6a02d9-410c-4f98-847c-89ed27abf505">

#### Doctor

##### Dashboard
<img width="1710" alt="Screenshot 2024-05-04 at 2 42 21 PM" src="https://github.com/aetheryn/ga-project-4/assets/158107061/53e10c63-5937-489f-b571-0c3c75a801e1">

##### User List
<img width="1710" alt="Screenshot 2024-05-04 at 2 42 51 PM" src="https://github.com/aetheryn/ga-project-4/assets/158107061/0d595c59-5fe5-4af4-a51e-0ce26b852649">

##### Appointments
<img width="1710" alt="Screenshot 2024-05-04 at 2 43 07 PM" src="https://github.com/aetheryn/ga-project-4/assets/158107061/38d00f45-48cf-4589-b55b-93b43e36b49d">

#### Patient

###### Dashboard
<img width="1710" alt="Screenshot 2024-05-04 at 2 43 26 PM" src="https://github.com/aetheryn/ga-project-4/assets/158107061/8f6afe21-478b-4d32-91a9-c3d72621e4c8">

###### Booking an Appointment
<img width="1710" alt="Screenshot 2024-05-04 at 2 43 44 PM" src="https://github.com/aetheryn/ga-project-4/assets/158107061/f1cdd90d-b7b7-4a90-940d-ffadfd86899e">

###### Appointments
<img width="1710" alt="Screenshot 2024-05-04 at 2 48 26 PM" src="https://github.com/aetheryn/ga-project-4/assets/158107061/d5b06686-dc42-46c5-b5e8-b60837e5c8ff">

## Technologies Used

### Tech Stack

PostgreSQL, Express, React (TypeScript), Node.js

## Getting Started

Access the project’s public board [here](https://github.com/users/aetheryn/projects/2).

### Setting Up Guide

1. **Clone the Repository:**
   ```shell
   git clone https://github.com/aetheryn/ga-project-4
   
3. **Navigate to the Frontend Directory:**
   ```shell
   cd ./frontend
   ```
4. **Create a .env file:**
   ```shell
   touch .env
   ```
5. **Open and update the .env file with the frontend environment variables.**
6. **Install Dependencies:**
   ```shell
   npm install
   ```
7. **Start the Development Server:**
   ```shell
   npm run dev
   ```
8. **Access the Application:** Open your browser and visit http://localhost:5173
   
9. **Start a new terminal.**
   
10. **Naviate to the Backend Directory:**
   ```shell
   cd ./backend
   ```
11. **Create a .env file:**
   ```shell
   touch .env
   ```
12. **Open and update the .env file with the backend environment variables.**

13. **Install Dependencies:**
   ```shell
   npm install
   ```
14. **Start the Development Server:**
   ```shell
   npm run dev
   ```
15. The backend server will be running on http://localhost:5001.

### Environment Variables

#### Frontend
```
VITE_SERVER=http://localhost:5001 #ENSURE THAT PORT CORRESPONDS TO THAT IN BACKEND ENV
```

#### Backend
```
#DATABASE_INFO
PGDATABASE
PGUSER
PGPASSWORD
PGHOST
PGPORT=5432

#SERVER_INFO
PORT=5001 #ENSURE THE PORT NUMBER IS THE SAME AS THAT IN FRONTEND ENV

#AUTH
ACCESS_SECRET
REFRESH_SECRET
```

## Next Steps

Planned future enhancements:

- To implement chat feature
- To enable doctors to input their unavailable/blocked dates
- To enable verification checks upon updating of patient particulars 

## References

- [W3Schools](http://w3schools.com)
- [Stack Overflow](http://stackoverflow.com)
- [MDN Web Docs](http://developer.mozilla.org)
- [W3docs](http://w3docs.com)
- [Geeks for Geeks](http://geeksforgeeks.org)
- [Google Fonts](http://fonts.google.com)
- [Material UI](https://mui.com)
