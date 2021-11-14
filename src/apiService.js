// const BASE_URL = 'https://pixabay.com/api/'
// const options = {
//     headers: {
//         authorization: '24326711-c75af6ca42eaac7ed3ff7c6d9'
//     }
// }

export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    fetchArticles() {
        return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=24326711-c75af6ca42eaac7ed3ff7c6d9`)
            .then(r => {
                return r.json();
            })
            .then(data => {
                this.incrementPage();
                
                return data.hits;
            });
    }
    
    incrementPage() {
        this.page += 1;
    }
    
    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        return this.searchQuery = newQuery;
    }
}
