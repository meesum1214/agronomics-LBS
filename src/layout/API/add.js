import axios from "axios";
import { API, legacyAPI } from "./config";

export const getLands = async (uid) => {
    return await API.get(`/landrecord/get?uid=${uid}&page=1`)
}

export const postCropRecord = async (user_id, crop, season, latitude, longitude, sowing_date, land_id, variety_name, srange, erange, sowing_method) => {
    return API.post('/cropRecord/add', { user_id, crop, season, latitude, longitude, sowing_date, land_id, variety_name, srange, erange, sowing_method })
}

export const postCheckbox = async (record_id, preparation_id) => {

    let registerData = new FormData();
    registerData.append('record_id', record_id);
    registerData.append('preparation_id', preparation_id);

    return axios.post('https://agronomics.pk/legacy_api/insert_checkbox', registerData, {
        headers: {
            "Greenage": "5e306c70c4cc37211fae9044c927e1af3ebb3404",
        },
    })
}

export const getCropWater = async (id) => {
    return axios.get(`https://agronomics.pk/legacy_api/get_crop_list_by_crop?crop_record_id=${id}`, {
        headers: {
            "Greenage": "5e306c70c4cc37211fae9044c927e1af3ebb3404",
        }
    })
}

export const deleteLand = async (id, userID) => {
    return API.get(`/landrecord/deleteLand?id=${id}&userID=${userID}`)
}

export const getLandData = async (latlng) => {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAS8MyZQtm7vnW1zXTHAZtIy61nMDLbHrg&language=eng&latlng=${latlng}`)
}

export const addLandRecord = (user_id, name, size, address, province, district, tehsil, location, geometry) => {
    return API.post('/landrecord/add', {
        user_id,
        name,
        size,
        address,
        province,
        district,
        tehsil,
        location,
        geometry
    })
}

export const CheckPhone = async (phone) => {
    return API.get(`/login/check?phone=${phone}`)
}