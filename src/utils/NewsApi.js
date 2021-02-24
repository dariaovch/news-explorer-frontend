class NewsApi {
    constructor(options) {
        this._url = options.url;
        this._apiKey = options.apiKey;
        this._from = options.from;
        this._to = options.to;
        this._pageSize = options.pageSize;
        this._headers = options.headers;
    }
  
    _getResponseData(res) {
           if(res.ok) {
               return res.json();
           }
           return Promise.reject(new Error(`Ошибка: ${res.status}`));
       }
  

    getNewsByKeyword(keyword) {
        return fetch(`${this._url}/v2/everything?q=${keyword}&apiKey=${this._apiKey}&from=${this._from}&to=${this._to}&pageSize=${this._pageSize}`, {
            headers: this._headers,
        }).then(res => this._getResponseData(res));
    }

}

const options = {
    url: 'https://newsapi.org',
    apiKey: 'b6ee03d4b45543cb9d7cea0bf280ff71',
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    to: new Date().toISOString().slice(0, 10),
    pageSize: 100,
    headers: {
        //   'Content-Type': 'application/json',
        //   authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    };
    console.log(options.to)
    console.log(options.from)

export const newsApi = new NewsApi(options);