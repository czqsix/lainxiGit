import simbajs from "simba-awesome-js";
import cookie from 'js-cookie'
import axios from './request'
export default {
    data() {
        return {
            sb: simbajs,
            cookie
        }
    },
    methods: {
        $get(url, params) {
            return axios.get(url, { params })
        },
        $post(url, params) {
            return axios.post(url, params)
        }
    },
}