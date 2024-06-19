import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '44459429-c3864503d57e6d0fc4818852c';
const PER_PAGE = 40;

const refs = {
  searchForm: document.querySelector('#search-form'),
  container: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
const lightbox = new SimpleLightbox('.gallery a');

let page = 1;

async function onSearch(e) {
  e.preventDefault();

  const searchQuery = refs.searchForm.elements.searchQuery.value;

  if (searchQuery === '') {
    return;
  }

  refs.container.innerHTML = '';

  refs.loadMoreBtn.classList.add('is-hidden');

  try {
    const data = await loadData(searchQuery, page);

    if (data.hits.length === 0) {
      return;
    } else {
      showFetchSuccessMessage(data.totalHits);
    }

    const elements = data.hits.reduce((carry, item) => {
      return carry + buildImageCard(item);
    }, '');

    refs.container.insertAdjacentHTML('beforeend', elements);

    if (data.totalHits > PER_PAGE * page) {
      refs.loadMoreBtn.classList.remove('is-hidden');
    } else {
      showEndOfFeedMessage();
      refs.loadMoreBtn.classList.add('is-hidden');
    }

    lightbox.refresh();
  } catch (error) {
    console.log(error);
    showError();
    return;
  }
}

function buildImageCard(item) {
  return `<div class="photo-card">
            <a href="${item.largeImageURL}">
                <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
            </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                    ${item.likes}
                </p>
                <p class="info-item">
                    <b>Views</b>
                    ${item.views}
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    ${item.comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b>
                    ${item.downloads}
                </p>
            </div>
        </div>`;
}

async function loadData(searchQuery, page = 1) {
  const params = {
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: PER_PAGE,
    page: page,
    key: API_KEY,
  };

  const response = await axios.get(BASE_URL, { params });

  return response.data;
}

function showError() {
  iziToast.error({
    title: 'Error',
    message: 'Something went wrong. Please try again later.',
  });
}

function showFetchSuccessMessage(totalHits) {
  iziToast.success({
    title: 'Success',
    message: `Hooray! We found ${totalHits} images.`,
  });
}

function showEndOfFeedMessage() {
  iziToast.info({
    title: 'End of feed',
    message: `We're sorry, but you've reached the end of search results.`,
  });
}

async function onLoadMore(e) {
  page += 1;

  try {
    const data = await loadData(
      refs.searchForm.elements.searchQuery.value,
      page
    );

    if (data.hits.length === 0) {
      return;
    }

    const elements = data.hits.reduce((carry, item) => {
      return carry + buildImageCard(item);
    }, '');

    refs.container.insertAdjacentHTML('beforeend', elements);

    if (data.totalHits > PER_PAGE * page) {
      refs.loadMoreBtn.classList.remove('is-hidden');
    } else {
      refs.loadMoreBtn.classList.add('is-hidden');
      showEndOfFeedMessage();
    }
    lightbox.refresh();
  } catch (error) {
    console.log(error);
    showError();
    return;
  }
}

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
