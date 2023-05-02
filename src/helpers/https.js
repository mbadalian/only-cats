import axios from "axios";

const CATS_API = process.env.CATS_API;

export default axios.create({
    baseURL: `https://api.thecatapi.com/v1/`,
    headers: {
        'x-api-key': CATS_API,
        "Content-type": "application/json"
    }
})
