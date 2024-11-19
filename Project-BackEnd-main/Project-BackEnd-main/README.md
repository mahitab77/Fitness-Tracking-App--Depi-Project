
# Fitness Tracker API

This Fitness Tracker API helps users track fitness-related data including workouts, calories, various logs (sleep, water, steps, etc.), and personal goals. The backend is built using Node.js, Express, and MongoDB.

## Table of Contents

1. [Installation](#installation)
2. [Environment Variables](#environment-variables)
3. [API Endpoints](#api-endpoints)
   - [Users](#users)
   - [Workouts](#workouts)
   - [Logs](#logs)
   - [Workout Logs](#workout-logs)
   - [Goals](#goals)
4. [Error Handling](#error-handling)
5. [Testing with Postman](#testing-with-postman)
6. [Deployment](#deployment)
7. [Conclusion](#conclusion)

## Installation

1. Clone the repository:
   bash
   git clone https://github.com/Depi-Graduation-Project/Project-BackEnd
   cd my-fitness-app-backend

2. Install dependencies:
   bash
   npm install

3. Set up MongoDB Atlas or a local MongoDB instance. Use your MongoDB connection string as follows:

   env
   MONGO_URI=mongodb+srv://firstuser:firstpassword@fitness-tracker.zqhdq.mongodb.net/fitness-tracker?retryWrites=true&w=majority&appName=Fitness-Tracker

4. Create a `.env` file in the root directory and add the following:

   env
   PORT=5000
   MONGO_URI=mongodb+srv://firstuser:firstpassword@fitness-tracker.zqhdq.mongodb.net/fitness-tracker?retryWrites=true&w=majority&appName=Fitness-Tracker

5. Start the server:

   bash
   node server.js

   The server will start on the specified `PORT`.

## Environment Variables

Ensure that your `.env` file contains the following variables:

env
PORT=5000
MONGO_URI=mongodb+srv://firstuser:firstpassword@fitness-tracker.zqhdq.mongodb.net/fitness-tracker?retryWrites=true&w=majority&appName=Fitness-Tracker

## API Endpoints

### Users

#### Create a User

- **Method**: `POST`
- **Endpoint**: `/api/users`
- **Request Body**:
  json
  {
  "name": "John Doe",
  "userName": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "dateOfBirth": "1990-01-01",
  "gender": "male",
  "role": "client"
  }

#### Get All Users

- **Method**: `GET`
- **Endpoint**: `/api/users`

#### Get User by ID

- **Method**: `GET`
- **Endpoint**: `/api/users/:id`

#### Update User by ID

- **Method**: `PUT`
- **Endpoint**: `/api/users/:id`

#### Delete User by ID

- **Method**: `DELETE`
- **Endpoint**: `/api/users/:id`

### Workouts

#### Create a Workout

- **Method**: `POST`
- **Endpoint**: `/api/workouts`
- **Request Body**:
  json
  {
  "userId": "6701a20ac7dd2225c04bdba2",
  "workoutName": "Morning Run",
  "workoutType": "Cardio",
  "workoutDescription": "Running session in the park",
  "howItWorks": "Start with a 5-minute warm-up, then run for 30 minutes",
  "primaryMuscles": ["Legs", "Core"],
  "secondaryMuscles": ["Arms"],
  "setsOrDuration": false
}

#### Get All Workouts

- **Method**: `GET`
- **Endpoint**: `/api/workouts`

#### Get Workout by ID

- **Method**: `GET`
- **Endpoint**: `/api/workouts/:id`

#### Update Workout by ID

- **Method**: `PUT`
- **Endpoint**: `/api/workouts/:id`

#### Delete Workout by ID

- **Method**: `DELETE`
- **Endpoint**: `/api/workouts/:id`


### **Logs Endpoints**

These endpoints allow the user to manage logs for various activities (sleep, water, steps, weight, calorie intake, calorie burned, etc.).

#### **Create a Log**

**Endpoint:**
bash
POST /api/logs


**Description:**
Create a new log for the specified activity (e.g., sleep, water, steps, etc.).

**Request Body:**
json
{
  "userId": "ObjectId of the user",
  "logType": "Type of log (e.g., Sleep, Water, Steps, Calories-intake, Calories-burned)",
  "logDate": "Date when the log was recorded",
  "valueLogged": "Numeric value for the logged activity",
  "metric": "Unit of measurement (e.g., hours, liters, steps, calories)"
}


**Response:**
json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "logType": "Sleep",
  "logDate": "2024-10-05T00:00:00.000Z",
  "valueLogged": 8,
  "metric": "hours",
  "createdAt": "2024-10-05T00:00:00.000Z",
  "updatedAt": "2024-10-05T00:00:00.000Z"
}


---

#### **Get All Logs**

**Endpoint:**
bash
GET /api/logs


**Description:**
Retrieve all logs from the database.

**Response:**
json
[
  {
    "_id": "ObjectId",
    "userId": "ObjectId",
    "logType": "Sleep",
    "logDate": "2024-10-05T00:00:00.000Z",
    "valueLogged": 8,
    "metric": "hours",
    "createdAt": "2024-10-05T00:00:00.000Z",
    "updatedAt": "2024-10-05T00:00:00.000Z"
  },
  {
    "_id": "ObjectId",
    "userId": "ObjectId",
    "logType": "Calories-intake",
    "logDate": "2024-10-06T00:00:00.000Z",
    "valueLogged": 2000,
    "metric": "calories",
    "createdAt": "2024-10-06T00:00:00.000Z",
    "updatedAt": "2024-10-06T00:00:00.000Z"
  }
]


---

#### **Get a Log by ID**

**Endpoint:**
bash
GET /api/logs/:id


**Description:**
Retrieve a specific log by its ID.

**Response:**
json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "logType": "Sleep",
  "logDate": "2024-10-05T00:00:00.000Z",
  "valueLogged": 8,
  "metric": "hours",
  "createdAt": "2024-10-05T00:00:00.000Z",
  "updatedAt": "2024-10-05T00:00:00.000Z"
}


---

#### **Update a Log by ID**

**Endpoint:**
bash
PUT /api/logs/:id


**Description:**
Update an existing log by its ID.

**Request Body:**
json
{
  "logType": "Calories-intake",
  "logDate": "2024-10-07T00:00:00.000Z",
  "valueLogged": 1800,
  "metric": "calories"
}


**Response:**
json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "logType": "Calories-intake",
  "logDate": "2024-10-07T00:00:00.000Z",
  "valueLogged": 1800,
  "metric": "calories",
  "createdAt": "2024-10-05T00:00:00.000Z",
  "updatedAt": "2024-10-07T00:00:00.000Z"
}


---

#### **Delete a Log by ID**

**Endpoint:**
bash
DELETE /api/logs/:id


**Description:**
Delete a specific log by its ID.

**Response:**
json
{
  "message": "Log deleted successfully"
}


---

#### **Get Logs by Date Range**

**Endpoint:**
bash
GET /api/logs/date-range?userId=<userId>&startDate=<startDate>&endDate=<endDate>


**Description:**
Retrieve logs for a user between a specified date range.

**Example Request:**
bash
GET /api/logs/date-range?userId=6701a20ac7dd2225c04bdba2&startDate=2024-01-01&endDate=2024-12-31


**Response:**
json
[
  {
    "_id": "ObjectId",
    "userId": "ObjectId",
    "logType": "Sleep",
    "logDate": "2024-10-05T00:00:00.000Z",
    "valueLogged": 8,
    "metric": "hours",
    "createdAt": "2024-10-05T00:00:00.000Z",
    "updatedAt": "2024-10-05T00:00:00.000Z"
  }
]


---

#### **Get Logs by Type**

**Endpoint:**
bash
GET /api/logs/type/:logType


**Description:**
Retrieve all logs of a specified type (e.g., `Calories-intake`, `Sleep`, `Water`, etc.).

**Example Request:**
bash
GET /api/logs/type/Sleep


**Response:**
json
[
  {
    "_id": "ObjectId",
    "userId": "ObjectId",
    "logType": "Sleep",
    "logDate": "2024-10-05T00:00:00.000Z",
    "valueLogged": 8,
    "metric": "hours",
    "createdAt": "2024-10-05T00:00:00.000Z",
    "updatedAt": "2024-10-05T00:00:00.000Z"
  }
]
#### **Get Logs by Type and Date Range**
**Endpoint:**
 GET GET /api/logs/date-range/type/:logType?userId=<user_id>&startDate=<start>&endDate=<end>

**Description:**
 Retrieves logs filtered by both type and a specific date range.
Query Parameters:
userId: The ID of the user to filter logs.
startDate: The start date of the range.
endDate: The end date of the range.
Response Example:
json
[
  {
    "_id": "6701ace1b6d36d9ee4e1213c",
    "logType": "Calories intake",
    "valueLogged": 1200,
    "metric": "calories",
    "logDate": "2024-10-05T20:31:03.918Z"
  }
]




### Workout Logs

#### Create a Workout Log

- **Method**: `POST`
- **Endpoint**: `/api/workoutslogs`
- **Request Body**:
  json
  {
  "userId": "user_id",
  "workoutId": "workout_id",
  "logDate": "2024-10-01",
  "logStartTime": "07:00 AM",
  "duration": 45,
  "caloriesBurned": 300
  }

#### Get All Workout Logs

- **Method**: `GET`
- **Endpoint**: `/api/workoutslogs`

#### Get Workout Log by ID

- **Method**: `GET`
- **Endpoint**: `/api/workoutslogs/:id`

#### Update Workout Log by ID

- **Method**: `PUT`
- **Endpoint**: `/api/workoutslogs/:id`

#### Delete Workout Log by ID

- **Method**: `DELETE`
- **Endpoint**: `/api/workoutslogs/:id`

#### Get Workout Logs by Date Range

- **Method**: `GET`
- **Endpoint**: `/api/workoutslogs/date-range`
- **Query Parameters**: `userId`, `startDate`, `endDate`


### Goals

#### Create a Goal

- **Method**: `POST`
- **Endpoint**: `/api/goals`
- **Request Body**:
  json
  {
  "userId": "user_id",
  "goalType": "Weight",
  "targetValue": 75,
  "startDate": "2024-01-01",
  "endDate": "2024-12-31",
  "isCompleted": false
  }

#### Get All Goals

- **Method**: `GET`
- **Endpoint**: `/api/goals`

#### Get Goal by ID

- **Method**: `GET`
- **Endpoint**: `/api/goals/:id`

#### Update Goal by ID

- **Method**: `PUT`
- **Endpoint**: `/api/goals/:id`

#### Delete Goal by ID

- **Method**: `DELETE`
- **Endpoint**: `/api/goals/:id`

## Error Handling

- **400 Bad Request**: When required fields are missing or invalid.
- **404 Not Found**: When a resource ID does not exist.
- **500 Internal Server Error**: For server-related issues.

## Testing with Postman

Use [Postman](https://www.postman.com/) to test each endpoint. Configure requests based on the methods, endpoints, and body examples provided.

## Deployment
deployement url on vercel :https://project-back-end-delta.vercel.app/
