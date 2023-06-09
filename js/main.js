import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js';



//장바구니!
const basketSterterEl = document.querySelector('header .basket-starter');
const basketEl = basketSterterEl.querySelector('.basket')

basketSterterEl.addEventListener('click',function(event){
  event.stopPropagation()
  if(basketEl.classList.contains('show')){
    hideBasket()
  }else{
    showBasket()
  }
})

basketEl.addEventListener('click',(event)=>{
  event.stopPropagation()
})

window.addEventListener('click', ()=>{
  hideBasket()
})

function showBasket(){
  basketEl.classList.add('show')
}
function hideBasket(){
  basketEl.classList.remove('show')
}


//검색!
const headerEl = document.querySelector('header')
const headerMenuEl = [...headerEl.querySelectorAll('ul.menu > li')]
const serchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const serchCloserEl = serchWrapEl.querySelector('.serch-closer')
const serchShadowEl = serchWrapEl.querySelector('.shadow')
const searchInputEl =serchWrapEl.querySelector('input')
const searchDelayEls = [...serchWrapEl.querySelectorAll('li')]

searchStarterEl.addEventListener('click', showSearch)
serchCloserEl.addEventListener('click', function(event){
  event.stopPropagation()
  hideSearch()
})
serchShadowEl.addEventListener('click', hideSearch)


function showSearch() {
  headerEl.classList.add('searching')
  stopScroll()
  headerMenuEl.reverse().forEach(function(el, index){
    el.style.transitionDelay = index * .4 / headerMenuEl.length + 's' 
  })
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's' 
  });
  setTimeout(function(){
    searchInputEl.focus()
  }, 600)
}

function hideSearch(){
  headerEl.classList.remove('searching')
  playScroll()
  headerMenuEl.reverse().forEach(function(el, index){
    el.style.transitionDelay = index * .4 / headerMenuEl.length + 's' 
  })
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's';
  });
  searchDelayEls.reverse()
  searchInputEl.value = ''
}

function playScroll(){
  document.documentElement.classList.remove('fixed')
}
function stopScroll(){
  document.documentElement.classList.add('fixed')
}


//헤더 메뉴 토글! 
const menuStarterEl = document.querySelector('header .menu-starter')
menuStarterEl.addEventListener('click',function(){
  if(headerEl.classList.contains('menuing')){
    headerEl.classList.remove('menuing')
    searchInputEl.value = ''
    playScroll()
  }else{
    headerEl.classList.add('menuing')
    stopScroll()
  }
})



//헤더 검색!
const serchTextFieldEl = document.querySelector('header .textfield')
const searchCancelEl = document.querySelector('header .search-canceler')
serchTextFieldEl.addEventListener('click', function(){
  headerEl.classList.add('sharching--mobile')
  searchInputEl.focus()
})
searchCancelEl.addEventListener('click',function(){
  headerEl.classList.remove('sharching--mobile')
})


//
window.addEventListener('resize',function(){
  if(window.innerHTML <= 740){
    headerEl.classList.remove('searching')
  }else{
    headerEl.classList.remove('serching--mobile')
  }
})

//
const navEl = document.querySelector('nav')
const navMenuToggleEl = navEl.querySelector('.menu-toggler')
const navMenuShadowEl = navEl.querySelector('.shadow')

navMenuToggleEl.addEventListener('click', function (){
  if(navEl.classList.contains('menuing')){
    hideNaveMenu()
  }else{
    showNavMenu()
  }
})
navEl.addEventListener('click', function(event){
  event.stopPropagation()
})
navMenuShadowEl.addEventListener('click',hideNaveMenu)
window.addEventListener('click',hideNaveMenu)

function showNavMenu(){
  navEl.classList.add('menuing')
}
function hideNaveMenu(){
  navEl.classList.remove('menuing')
}





//요소의 가시성 관찰 
const io = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(!entry.isIntersecting){
      return
    }
    entry.target.classList.add('show')
  })
})

const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function (el) {
  io.observe(el)
})




//비디오 재생 !


const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function(){
  video.play()
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
})
pauseBtn.addEventListener('click', function(){
  video.pause()
  playBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')
})


//당신에게 맞는 아이패드는? 랜더링!
const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(function(ipad){
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')

  let colorList = ''
  ipad.colors.forEach(function(color){
    colorList += `<li style="background-color:${color};"></li>`
  })



  itemEl.innerHTML = /*html*/`
 <div class="thumbnail">
  <img src="${ipad.thumbnail}" alt="${ipad.name}">
 </div>
 <ul class="colors">
  ${colorList}
 </ul>
 <h3 class="name">${ipad.name}</h3>
 <p class="tagline">${ipad.tagline}</p>
 <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
 <button class="btn">구입하기</button>
 <a herf="${ipad.url}" class="link">더 알아보기</a>
  `


  itemsEl.append(itemEl)
})



const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(function(nav){
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

    let mapList = ''
    nav.maps.forEach(function(map){
      mapList += /*HTML */`<li>
        <a href="${map.url}">${map.name}</a>
      </li>`
    })

  mapEl.innerHTML =/*HTML */ `
    <h3>
      <span class="text">${nav.title}</span>
      <span class="icon">+</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

  navigationsEl.append(mapEl)
})


const thisYearEl = document.querySelector('span.this-year')
thisYearEl.textContent = new Date().getFullYear()


const mapEl = document.querySelectorAll('footer .navigations .map')
mapEl.forEach(function(el){
  const h3El = el.querySelector('h3')
  h3El.addEventListener('click', function(){
    el.classList.toggle('active')
  })
})