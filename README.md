# Workout-Tracker
- Created a web app where users can create, publish, view, and get recommended gym workout routines. (ReactJS, NodeJS, Express, MongoDB).
- Implemented a dashboard with graphical visualisation of users’ workout muscle groups and time allocation.
-	Incorporated tools such as workout timer and dashboard comparison view with friends. 

# Video Demo
https://github.com/prithmanickam/Workout-Tracker/assets/53788322/047fcac6-c35d-41ef-a09a-6423552a6bba

## Screenshots

| Create Routine Page | Dashboard Page | Dashboard Comparison View with Friends |
| ------------- | ------------- | ------------- |
| <img src="https://github.com/prithmanickam/Workout-Tracker/assets/53788322/2afeaea4-e53b-4f71-8290-fc6c7542ceb6" width="330" height="156" /> | <img src="https://github.com/prithmanickam/Workout-Tracker/assets/53788322/58d94342-52d4-4261-977c-ae4facf03108" width="330" height="291" />| <img src="https://github.com/prithmanickam/Workout-Tracker/assets/53788322/6d643052-cf7f-45ce-b5c3-a1e4dd973797" width="330" height="156" />|



| Begin Routine Page  | View All Routines Page | Recommend Routines Page |
| ------------- | ------------- | ------------- |
| <img src="https://github.com/prithmanickam/Workout-Tracker/assets/53788322/128a0c12-b4bc-4f1f-8b1a-6fd65578b2f4" width="330" height="156" /> | <img src="https://github.com/prithmanickam/Workout-Tracker/assets/53788322/90d66814-0e1c-4ed8-9175-b9da3e236f66" width="330" height="156" />| <img src="https://github.com/prithmanickam/Workout-Tracker/assets/53788322/7a7b916f-89b7-4cc9-a7e6-2f22deb46cd2" width="330" height="156" />|

## Installation
- Use .env.example to create a .env file that contains your Mongo DB Cluster URI
- Terminal 1: `cd client` then `npm start`
- Terminal 2: `cd server` then `npm run dev`

## Completed / Todo
- [x] Sign in / Sign up Authentication
- [x] Create Routines Page
- [x] Dashboard Page 
  - [x] Display: Radar and Bar chart, routine history, created & saved routines, your friends
  - [x] Delete or Publish created routines functionality
  - [x] Dashboard Comparison View with Friends
- [x] Begin Routine Page
- [x] View All Routines Page
- [X] Recommend Routines Page
- [ ] Accounts Page
  - [x] Display user details and have a button to log out
  - [ ] Add and delete friends functionality (Currently set predefined users as friends)
  - [ ] Reset password functionality
- [ ] Toggle Light / Dark mode 
