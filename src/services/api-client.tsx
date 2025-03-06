
import axios from 'axios'

const apikey = import.meta.env.VITE_RAWG_API;
export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params:{
        key : apikey

    }
})

// export default