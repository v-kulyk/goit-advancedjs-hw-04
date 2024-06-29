import{S as g,a as y,i as l}from"./assets/vendor-b0d10f48.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const L="https://pixabay.com/api/",b="44459429-c3864503d57e6d0fc4818852c",d=40,n={searchForm:document.querySelector("#search-form"),container:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")},u=new g(".gallery a");let i=1;async function v(t){t.preventDefault();const r=n.searchForm.elements.searchQuery.value;if(r!==""){n.container.innerHTML="",n.loadMoreBtn.classList.add("is-hidden");try{const o=await h(r,i);if(o.hits.length===0)return;w(o.totalHits);const a=o.hits.reduce((e,s)=>e+f(s),"");n.container.insertAdjacentHTML("beforeend",a),o.totalHits>d*i?n.loadMoreBtn.classList.remove("is-hidden"):(p(),n.loadMoreBtn.classList.add("is-hidden")),u.refresh()}catch(o){console.log(o),m();return}}}function f(t){return`<div class="photo-card">
            <a href="${t.largeImageURL}">
                <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
            </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                    ${t.likes}
                </p>
                <p class="info-item">
                    <b>Views</b>
                    ${t.views}
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    ${t.comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b>
                    ${t.downloads}
                </p>
            </div>
        </div>`}async function h(t,r=1){const o={q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:d,page:r,key:b};return(await y.get(L,{params:o})).data}function m(){l.error({title:"Error",message:"Something went wrong. Please try again later."})}function w(t){l.success({title:"Success",message:`Hooray! We found ${t} images.`})}function p(){l.info({title:"End of feed",message:"We're sorry, but you've reached the end of search results."})}async function M(t){i+=1;try{const r=await h(n.searchForm.elements.searchQuery.value,i);if(r.hits.length===0)return;const o=r.hits.reduce((a,e)=>a+f(e),"");n.container.insertAdjacentHTML("beforeend",o),r.totalHits>d*i?n.loadMoreBtn.classList.remove("is-hidden"):(n.loadMoreBtn.classList.add("is-hidden"),p()),u.refresh()}catch(r){console.log(r),m();return}}n.searchForm.addEventListener("submit",v);n.loadMoreBtn.addEventListener("click",M);
//# sourceMappingURL=commonHelpers.js.map
