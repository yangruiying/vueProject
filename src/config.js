import Vue from 'vue';

const baseurl = process.env.BASE_API.split('//')[1]
const uploadurl = process.env.BASE_API
const pColor = 'rgb(81, 81, 255)'
export default {
    baseurl,
    uploadurl,
    pColor
}

