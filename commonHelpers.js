import{S as y,a as L,i as l}from"./assets/vendor-b0d10f48.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}})();const b="https://pixabay.com/api/",w="44459429-c3864503d57e6d0fc4818852c",u=40,o={searchForm:document.querySelector("#search-form"),container:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")},f=new y(".gallery a");let i=1,c;async function M(r){if(r.preventDefault(),c=o.searchForm.elements.searchQuery.value.trim(),c!==""){o.container.innerHTML="",o.loadMoreBtn.classList.add("is-hidden"),i=1;try{const t=await m(c,i);if(t.hits.length===0){S();return}else v(t.totalHits);const n=t.hits.reduce((a,e)=>a+h(e),"");o.container.insertAdjacentHTML("beforeend",n),t.totalHits>u*i?o.loadMoreBtn.classList.remove("is-hidden"):(p(),o.loadMoreBtn.classList.add("is-hidden")),f.refresh()}catch(t){console.log(t),g();return}}}function h(r){return`<div class="photo-card">
            <a href="${r.largeImageURL}">
                <img src="${r.webformatURL}" alt="${r.tags}" loading="lazy" />
            </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                    ${r.likes}
                </p>
                <p class="info-item">
                    <b>Views</b>
                    ${r.views}
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    ${r.comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b>
                    ${r.downloads}
                </p>
            </div>
        </div>`}async function m(r,t=1){const n={q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:u,page:t,key:w};return(await L.get(b,{params:n})).data}function g(){l.error({title:"Error",message:"Something went wrong. Please try again later."})}function v(r){l.success({title:"Success",message:`Hooray! We found ${r} images.`})}function S(){l.info({title:"Nothing found",message:"Sorry, there are no images matching your search query. Please try again."})}function p(){l.info({title:"End of feed",message:"We're sorry, but you've reached the end of search results."})}async function E(r){i+=1;try{const t=await m(c,i);if(t.hits.length===0)return;const n=t.hits.reduce((a,e)=>a+h(e),"");o.container.insertAdjacentHTML("beforeend",n),t.totalHits>u*i?o.loadMoreBtn.classList.remove("is-hidden"):(o.loadMoreBtn.classList.add("is-hidden"),p()),f.refresh()}catch(t){console.log(t),g();return}}o.searchForm.addEventListener("submit",M);o.loadMoreBtn.addEventListener("click",E);
//# sourceMappingURL=commonHelpers.js.map
