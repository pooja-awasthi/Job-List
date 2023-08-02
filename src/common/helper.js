import axios from 'axios';

const fetchData = async(dataObj={}) => {
    const requestData = {
        url: 'https://64c3e52967cfdca3b6606d3b.mockapi.io/api/v1/jobDetail/jobDetail',
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
          },
    }
    if (dataObj.url) {
        requestData.url = dataObj.url;
    }
    if (dataObj.method) {
        requestData.method = dataObj.method;
    }
    if (dataObj.data) {
        requestData['data'] = dataObj.data;
    }

    try {
        const response = await axios(requestData);
        return response;
    } catch (error) {
        console.error('Error making request:', error);
        return error;
      }
}
export default fetchData;