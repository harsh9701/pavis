# `/users/register` Endpoint

## Description

Registers a new user in the system. This endpoint accepts user details, validates the input, hashes the password, creates a new user in the database, and returns an authentication token along with the user data.

## Method

`POST`

## Endpoint

`/users/register`

## Required Data (Request Body)

Send a JSON object with the following fields:

| Field         | Type   | Required | Description                       |
|---------------|--------|----------|-----------------------------------|
| fullName      | String | Yes      | Full name of the user (min 3 chars) |
| contactNo     | Number | Yes      | Contact number (min 10 digits)    |
| email         | String | Yes      | Valid email address               |
| password      | String | Yes      | Password (min 6 chars)            |
| confirmPassword | String | Yes    | Must match the password           |
| company       | String | No       | Company name                      |
| gstNo         | String | No       | GST number                        |

## Example Request

```json
{
  "fullName": "John Doe",
  "contactNo": "9876543210",
  "email": "john@example.com",
  "password": "securePass123",
  "confirmPassword": "securePass123",
  "company": "Acme Corp",
  "gstNo": "22AAAAA0000A1Z5"
}
```

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "token": "<jwt_token>",
      "user": {
        "_id": "user_id",
        "fullName": "John Doe",
        "email": "john@example.com",
        "contactNo": "9876543210",
        "companyName": "Acme Corp",
        "gstNo": "22AAAAA0000A1Z5",
        "role": "customer"
      }
    }
    ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Full name must be atleast 3 character",
          "param": "fullName",
          "location": "body"
        }
        // ...other errors
      ]
    }
    ```

### Server Error

- **Status Code:** `500 Internal Server Error`
- **Body:**
    ```json
    {
      "message": "Error message"
    }
    ```

---

**See implementation:**  
- Controller: [`controllers/user.controller.js`](backend/controllers/user.controller.js)  
- Route: [`routes/user.routes.js`](backend/routes/user.routes.js)
