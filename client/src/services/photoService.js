import axios from 'axios'

export default {
    getAll: async() => {
        let res = await axios.get(`/api/photos`)
        return res.data || []
    }
}