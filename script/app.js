const skeleton =  document.querySelector(".skeleton")
const wrapper = document.querySelector(".wrapper")
const seeMoreBtn = document.querySelector(".see-more__btn")
const collection = document.querySelector(".collection")
const gam_card = document.querySelector(".sidebar_card")

const API_URL = "https://dummyjson.com"


for(let i=0; i<12; i++){
    let skeletonItem = document.createElement("div")
    skeletonItem.classList.add("skeleton__item")
    skeletonItem.innerHTML =`
    <div class="skeleton__image skeleton__anime"></div>
    <div class="skeleton__line skeleton__anime"></div>
    <div class="skeleton__line skeleton__anime"></div>
    <div class="skeleton__line skeleton__anime"></div>
    `
    skeleton.append(skeletonItem)
}

let perPageCount = 6
let offset = 1
let categoryValuy = ""


async function fetchData(api, limit, category){
    let reponse = await fetch(`${api}/products${category}?limit=${limit}`)
    reponse
    .json()
    .then(res => createCard(res))
    .catch(err => console.log(err))
    .finally(() => {
        skeleton.style.display = "none"
    })
}
fetchData(API_URL, perPageCount, "")

function createCard(data){
    while(wrapper.firstChild){
        wrapper.firstChild.remove()
    }
    data.products.forEach((product) => {
        let cardItem = document.createElement("div")
        cardItem.classList.add("products__card")
        cardItem.innerHTML =`
        <figure>
              <img src="${product.thumbnail}" alt="${product.title}">
        </figure>
        <h3>${product.title}</h3>
        <p class="desc cards__p- cards__p--" title="${product.description}">${product.description}</p>
        <button class="buyNow-btn"><a href="./pages/buy.html">Buy now</a></button>
        `
        wrapper.appendChild(cardItem)
    })
}

seeMoreBtn.addEventListener('click', () => {
    offset++
    fetchData(API_URL, perPageCount * offset, categoryValuy)
})


async function fetchCategory(api){
    let reponse = await fetch(`${api}/products/category-list`)
    reponse
    .json()
    .then(res => createCategory(res))
}
fetchCategory(API_URL)

function createCategory(data){
    data.forEach((category)=>{
        let list = document.createElement("li")
        list.className = "item"
        list.innerHTML = `
        <data value="/category/${category}">${category}</data> 
        `
        collection.appendChild(list)
    })
}

document.addEventListener('DOMContentLoaded', function () {
    var modeSwitch = document.querySelector('.mode-switch');
  
    modeSwitch.addEventListener('click', function () {
        document.documentElement.classList.toggle('dark');
      modeSwitch.classList.toggle('active');
    });
  });

collection.addEventListener("click", (e)=>{
    if(e.target.tagName === "DATA"){
        categoryValuy = e.target.value
        fetchData(API_URL, perPageCount, categoryValuy)
    }
})
