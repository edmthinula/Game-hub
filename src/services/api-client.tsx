
import axios from 'axios'

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params:{
        key : '7ff649f928e448d58ceaaadcb391c639'

    }
})

// export default