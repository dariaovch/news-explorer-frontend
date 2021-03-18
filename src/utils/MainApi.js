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

    getInitialCards() {
       return this.getData('articles')
           .then(res => this._getResponseData(res));
        
    }

    getAllPageData() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()]);
    }

    // saveEditedInfo(formData) {
    //     return fetch(`${this._url}users/me`, {
    //         method: "PATCH",
    //         headers:  this._headers,
    //         body: JSON.stringify({
    //             name: formData.name,
    //             about: formData.about
    //           })
    //     }).then(res => this._getResponseData(res));
    
    // }

    saveArticle(item) {
        return fetch(`${this._url}articles`, {
            method: "POST",
            headers:  this._headers,
            body: JSON.stringify({
                keyword: item.keyword,
                title: item.title,
                text: item.text,
                date: item.date,
                source: item.source,
                link: item.link,
                image: item.image,
              })
        }).then(res => this._getResponseData(res));
       
    }

    // changeLikeCardStatus(cardId, isLiked) {
    //     if(isLiked){
    //         return fetch(`${this._url}cards/${cardId}/likes`, {
    //             method: "PUT",
    //             headers: this._headers,
    //         }).then(res => this._getResponseData(res));
    //     } else {
    //         return fetch(`${this._url}cards/${cardId}/likes`, {
    //             method: "DELETE",
    //             headers:  this._headers
    //         }).then(res => this._getResponseData(res));
    //     }
    // }

    deleteCard(articleId) {
        return fetch(`${this._url}articles/${articleId}`, {
            method: "DELETE",
            headers:  this._headers
        }).then(res => this._getResponseData(res));
        
    }

    // updateAvatar(formData) {
    //     return fetch(`${this._url}users/me/avatar`, {
    //         method: "PATCH",
    //         headers:  this._headers,
    //         body: JSON.stringify({
    //             avatar: formData.avatar,
    //           })
    //     }).then(res => this._getResponseData(res));
    // }
    
    register(name, email, password) {
        return fetch(`${this._url}signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password})
        })
        .then(this._getResponseData)
    };
    
    login(email, password) {
        return fetch(`${this._url}signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        })
        .then(this._getResponseData)
    };
    
    getContent(token) {
    return fetch (`${this._url}users/me`, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(this._getResponseData)
    }
};

const options = {
    url: 'https://api.darovnews.students.nomoredomains.icu/',
    headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    };

export const mainApi = new MainApi(options);