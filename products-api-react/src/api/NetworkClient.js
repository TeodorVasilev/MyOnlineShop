import Constants from "../constants/Constants";

class NetworkClient {

    get(url) {
        return this.request({
            url,
            method: 'GET',
        })
    }

    post(url){
        
    }


    request = async(options = {}) => {
        if(!options.url) {
            console.log('URL is required');
            return;
        }

        const token = localStorage.getItem('token');

        const data = Object.assign({
            method: options.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + token
            },
        }, options);

        return new Promise((resolve, reject) => {
            fetch(options.url, data)
                .then(response => {
                    if(options.success){
                        options.success(response);
                    }
                    resolve(response);
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