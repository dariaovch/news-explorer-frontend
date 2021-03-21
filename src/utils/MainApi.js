class MainApi {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    getData(name) {
        return fetch (`${this._url}${name}`, {
            headers: this._headers,
        });
    }

  
    _getResponseData(res) {
           if(res.ok) {
               return res.json();
           }
           return Promise.reject(new Error(`Ошибка: ${res.status}`));
       }
  

    getUserInfo() {
        return this.getData('users/me')
             .then(res => this._getResponseData(res));  
    }

    getSavedArticles() {
       return this.getData('articles')
           .then(res => this._getResponseData(res));
        
    }

    // getAllPageData() {
    //     return Promise.all([this.getUserInfo(), this.getSavedArticles()]);
    // }

    saveArticle(item, keyword) {
        return fetch(`${this._url}articles`, {
            method: 'POST',
            headers:  this._headers,
            body: JSON.stringify({
                keyword: keyword,
                title: item.title,
                text: item.description,
                date: item.publishedAt,
                source: item.source.name,
                link: item.url,
                image: item.urlToImage,
              })
        }).then(res => this._getResponseData(res));  
    }

    deleteArticle(articleId) {
        return fetch(`${this._url}articles/${articleId}`, {
            method: 'DELETE',
            headers:  this._headers
        }).then(res => this._getResponseData(res));
        
    }
}

const options = {
    url: 'https://api.darovnews.students.nomoredomains.icu/',
    headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    };

export const mainApi = new MainApi(options);