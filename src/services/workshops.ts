import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const getWorkshops = async ( page : number ) => {
    const response = await axios.get( `${apiBaseUrl}/workshops`, {
        params: {
            _page: page
        }
    });
    return response.data;
};

const getWorkshopById = async ( id : number | string ) => {
    const response = await axios.get( `${apiBaseUrl}/workshops/${id}`);
    return response.data;
};

export {
    getWorkshops,
    getWorkshopById
};