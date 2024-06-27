
import axios from 'axios'

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params:{
        key : 'c0a56a62b1ec42e0a717c14d6570f5fc'

    }
})

// export default