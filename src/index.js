import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


import NewsApiServise from './js/NewsApiServise';
import createMarkup from './js/createmarkup';
import LoadMoreBtn from './js/LoadMoreBtn';
import LoadMoreBtn from './js/LoadMoreBtn';

const form = document.getElementById("search-form");
const ulEl = document.querySelector(".gallery");


const newsApiServise = new NewsApiServise();
const loadMoreBtn = new LoadMoreBtn({
  selector : '#loadMore',
  isHidden: true
});

const lightbox = new SimpleLightbox('.gallery a');


form.addEventListener('submit', onSubmit);
loadMoreBtn.button.addEventListener('click', fetchHits);

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
    loadMoreBtn.show();
    fetchHits().finally(() => form.reset());
};


async function fetchHits(){
    loadMoreBtn.disabled();
  
    try{
      const { totalHits, hits } = await newsApiServise.getGallery();

     if (hits.length === 0) {
      loadMoreBtn.hide();
      return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
   
    if (hits.length !== 0) {
      Notify.success(`Hooray! We found ${totalHits} images.`)
  }  

  const markup = hits.reduce((markup, hit) =>
  createMarkup(hit) + markup ,""); 
  
  appendNewsGallery (markup);
      loadMoreBtn.enable();

}
     catch(err){
  console.error(err);
  onError();
}
  
};


function appendNewsGallery (markup){
    ulEl.insertAdjacentHTML ('beforeend',markup);
    lightbox.refresh();

    lightbox.on('show.simplelightbox', function () {
      lightbox.defaultOptions.captionDelay = 250;
    });
   
};


function clearNewsGallery (){
  ulEl.innerHTML = "";
}

function onError (err){
    console.error(err);
    loadMoreBtn.hide();
};







