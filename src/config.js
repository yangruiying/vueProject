import Vue from 'vue';

const baseurl = process.env.BASE_API.split('//')[1]
const uploadurl = process.env.BASE_API
const pColor = 'rgb(254,58,59)'
export default {
    baseurl,
    uploadurl,
    pColor
}

