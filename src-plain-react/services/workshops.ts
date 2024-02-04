import axios from 'axios';

const getWorkshops = async ( page : number ) => {
    const response = await axios.get( `https://workshops-server.onrender.com/workshops`, {
        params: {
            _page: page
        }
    });
    return response.data;
};

const getWorkshopById = async ( id : number | string ) => {
    const response = await axios.get( `https://workshops-server.onrender.com/workshops/${id}`);
    return response.data;
};

export {
    getWorkshops,
    getWorkshopById
};
