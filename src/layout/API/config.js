import axios from "axios";
export const BaseApiUrl = 'https://agronomics.pk/api/'
export var USERTOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJwaG9uZSI6IjMwNTg3MjAwNTIiLCJmdWxsbmFtZSI6bnVsbCwiZW1haWwiOm51bGwsIkltYWdlIjpudWxsLCJjbmljIjpudWxsLCJwcm9mZXNzaW9uIjpudWxsLCJCaW8iOm51bGwsImxvY2F0aW9uIjpudWxsLCJwYXNzd29yZCI6bnVsbCwic3RhdHVzIjpudWxsLCJ0b2tlbiI6bnVsbCwicTEiOm51bGwsImltYWdlMSI6bnVsbCwiaW1hZ2UyIjpudWxsLCJxMiI6bnVsbCwicTMiOm51bGwsInE0LjEiOm51bGwsInE0LjIiOm51bGwsInE0LjMiOm51bGwsInE0LjQiOm51bGwsInE0LjUiOm51bGwsInE0LjYiOm51bGwsInE1IjpudWxsLCJ1cGRhdGVkX3RpbWUiOm51bGx9LCJpYXQiOjE2NTUzNjI5MTJ9.exDO3TSd1bXCjmeR7ftRVnqZb1FYv98XjvYAhdYS3OE";
export const API = axios.create({
    baseURL: BaseApiUrl,
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': USERTOKEN
    }
})

// export const legacyAPI = axios.create({
//     baseURL: 'https://agronomics.pk/legacy_api/',
//     headers: {
//         'Content-Type': 'application/json',
//         'Greenage': '5e306c70c4cc37211fae9044c927e1af3ebb3404',
//     }
// })