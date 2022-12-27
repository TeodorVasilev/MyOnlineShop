import Constants from "../constants/Constants";

class NetworkClient {

    get(url, params) {
        return this.request({
            url,
            params,
            method: 'GET',
        })
    }


    request = async(options = {}) => {
        if(!options.url) {
            console.log('URL is required');
            return;
        }

        const token = localStorage.getItem('token');

        const data = Object.assign({
            //url,
            method: options.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Berarer ' + token
            },
        }, options);

        return new Promise((resolve, reject) => {

            fetch(data)
                .then((response) => {
                    if(options.success){
                        options.success(response.data)
                    }
                    resolve(response.data);
                })
                .catch((error) => {
                    if(options.failure){
                        options.failure(error);
                    }
                    reject(error);
                })
        })
    }
}

export default new NetworkClient();