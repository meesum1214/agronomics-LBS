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