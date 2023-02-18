import { Notify } from 'notiflix/build/notiflix-notify-aio';

import NewsApiServise from './js/NewsApiServise';
import createMarkup from './js/createmarkup';

const newsApiServise = new NewsApiServise();
console.log(newsApiServise);


const form = document.getElementById("search-form");
const ulEl = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");

// loadMoreBtn.classList.add("is-hidden");
form.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', fetchHits);

 function onSubmit(e){
    e.preventDefault();

    const form = e.currentTarget;
    const value = form.elements.searchQuery.value.trim();
    newsApiServise.searchQuery = value;

    if(newsApiServise.searchQuery === ''){
      return Notify.info(`Please, enter what you want to search`);
    }
  
    newsApiServise.resetPage();
    clearNewsGallery();
    fetchHits().finally(() => form.reset());
};

function fetchHits(){
 return newsApiServise
 .getGallery()
 .then((hits) =>{
 
      if (hits.length === 0){
        return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      }
    
    return hits.reduce((markup, hit) => 
  createMarkup(hit) + markup ,"");
})
   .then(appendNewsGallery)
    .catch(onError);
};

function appendNewsGallery (markup){
    ulEl.insertAdjacentHTML ('beforeend',markup);
};

function clearNewsGallery (){
  ulEl.innerHTML = "";
}

function onError (err){
    console.error(err);
};





