import './styles.css';
import NewsApiService from './apiService';
import LoadMoreBtn from './load-more-button';
import articlesTpl from './templates/articles.hbs';

import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

// defaultModules.set(PNotifyMobile, {});
// alert({
//   text: 'Notice me, senpai!'
// });

const refs = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    
};

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(e) {
    e.preventDefault();
   
    newsApiService.query = e.currentTarget.elements.query.value;
    
    if (newsApiService.query === '') {
        defaultModules.set(PNotifyMobile, {});
        return alert({
            text: '!Enter something!',
            addClass: 'notify',
            delay: 2000,
        });

    };

    newsApiService.resetPage();
    clearArticlesContainer();

    newsApiService.fetchArticles()
        .then(appendArticlesMarkup).catch(error => {
            defaultModules.set(PNotifyMobile, {});
            return alert({
                text: '!Information not found!',
                addClass: 'notify',
                delay: 2000,
            });
        });
}

function fetchArticles() {
    newsApiService.fetchArticles().then(appendArticlesMarkup);
    setTimeout(() => {
        refs.gallery.lastChild.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }, 500);
}

function appendArticlesMarkup(articles) {
    if (articles.length >= 12) {
        loadMoreBtn.show();
    }
    else {
        loadMoreBtn.hide();
    }
    refs.gallery.insertAdjacentHTML('beforeend', `${articlesTpl(articles)}`);
}

function clearArticlesContainer() {
    refs.gallery.innerHTML = "";
}
