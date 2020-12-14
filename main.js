const bd = [
    "image/Mix_2560x1440_054-040.jpg",
    "image/Mix_2560x1440_054-041.jpg",
    "image/Mix_2560x1440_054-042.jpg",
    "image/Mix_2560x1440_054-043.jpg",
    "image/Mix_2560x1440_054-059.jpg",
];
const createTag = (tag, attr = null, ...children) => {
    const elem = document.createElement(tag);
    if(attr != null)
        for(let key in attr)
            elem.setAttribute(key, attr[key]);
    if(children.length != 0)
        for(let child of children)
            elem.append(child);
    return elem;
};


const sliderUl = createTag("ul", {"class":"slider__ul"}, ...bd.map((path, index) => {
    return createTag("li", {"class":`slider__li${index == 0 ? " slider__li_active" : ""}`}, createTag("img", {"src":path}));
}));
const sliderButtonPrev = createTag("button", {"class":"slider__button slider__button_prev"}, "prev"); 
const sliderButtonNext = createTag("button", {"class":"slider__button slider__button_next"}, "next");

const sliderPageUl = createTag("ul", {"class":"slider__page-ul"},
    ...bd.map((path, index) => createTag("li", 
    {"class": `slider__page-li${index == 0 ? " slider__page-li_active" : ""}`, "data-target": index}))
);
const sliderPageBlock = createTag("div", {"class":"slider__page-block"}, sliderPageUl);
document.body.prepend(createTag("div", {"class":"slider"}, sliderUl, sliderButtonPrev, sliderButtonNext, sliderPageBlock));


const images = document.querySelectorAll(".slider__li");
const pages = document.querySelectorAll(".slider__page-li");
const buttonPrev = document.querySelector(".slider__button_prev");
const buttonNext = document.querySelector(".slider__button_next");

let index = 0;

function nextImage() {
    images[index].className = "slider__li"; 
    pages[index].className = "slider__page-li";
    index++;
    if(index >= images.length)
        index = 0;
    images[index].className = "slider__li slider__li_active"; 
    pages[index].className = "slider__page-li slider__page-li_active";
}

function prevImage() {
    images[index].className = "slider__li"; 
    pages[index].className = "slider__page-li";
    index--;
    if(index < 0)
        index = images.length - 1;
    images[index].className = "slider__li slider__li_active"; 
    pages[index].className = "slider__page-li slider__page-li_active";
}

function setImage(event) {
    images[index].className = "slider__li"; 
    pages[index].className = "slider__page-li";
    index = event.currentTarget.dataset.target;
    images[index].className = "slider__li slider__li_active"; 
    pages[index].className = "slider__page-li slider__page-li_active";
}
let interval;
function run(){
    interval = setInterval(nextImage,2000)
} 

function stop(){
    clearInterval(interval)
}

function prevStop(){
    stop()
    prevImage()
    setTimeout(run,5000)
}
function nextStop(){
    stop()
    nextImage()
    setTimeout(run,5000)
}
sliderUl.addEventListener("mouseover", stop)
sliderUl.addEventListener("mouseout", run);
// buttonPrev.addEventListener("click", prevStop);
// buttonNext.addEventListener("click", nextStop);



pages.forEach(elem => {
    elem.addEventListener("click", setImage);
});
run()