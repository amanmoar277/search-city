import axios from 'axios';

export const getCities = (cityName) => axios.get('https://base.amberstudent.com/api/v0/regions', 
    {   params: {
            sort_key: cityName,
            sort_order: 'desc',
            states: 'active',
            search_name: cityName
        }
    }
)
.then(res => res?.data?.data?.result)
.catch(err => console.log(err));