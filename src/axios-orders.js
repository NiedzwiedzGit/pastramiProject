import axios from 'axios';

const instance = axios.create({
    baseURL: "https://pastramiproject-d254b.firebaseio.com/"
});

export default instance;