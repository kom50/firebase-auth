import axios from "axios";


export default axios.create({
    baseURL: 'https://social-diary1-default-rtdb.firebaseio.com/'
})