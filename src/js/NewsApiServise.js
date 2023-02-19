
import axios from 'axios';


const ENDPOINT = 'https://pixabay.com/api/';
const API_KEY = "33671711-e7c4a63df0ba9dde612e7c95b";
const NUANCES = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';  
 

export default class NewsApiServise {
    constructor() {
        this.page = 1;
        this.searchQuery = "";
        this.totalHits = 0;
    }

     getGallery () {
        const URL =`${ENDPOINT}?key=${API_KEY}&q=${this.searchQuery}&${NUANCES}&page=${this.page}`;
        
         return fetch(URL)
          .then((response)=> response.json())
          .then(({hits}) => {
            this.nextPage();
            return hits;
          });
        }

        get hits() {
          return this.totalHits;
        }
      
        set hits(newTotalHits) {
          this.totalHits = newTotalHits;
        }

        nextPage() {
          this.page +=1;
        }
        resetPage() {
          this.page = 1;
       }
  };


