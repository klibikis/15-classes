class BasicImageCarousel {
    rootElement: HTMLDivElement;
    slideshowButtonPrevious: HTMLButtonElement;
    slideshowButtonNext: HTMLButtonElement;
    images: string[] = [];
    currentSlide: HTMLImageElement;
    slideIndex: number;
    

    constructor(selector: string){
        this.rootElement = document.querySelector(selector);
        this.currentSlide = this.rootElement.querySelector(".js-slide");
        this.slideshowButtonNext = this.rootElement.querySelector(".js-nextButton");
        this.slideshowButtonPrevious = this.rootElement.querySelector(".js-previousButton");
        this.slideIndex = 0;

        this.images[0] = "/assets/images/iceland1.jpg"
        this.images[1] = "/assets/images/iceland2.jpg"
        this.images[2] = "/assets/images/iceland3.jpg"
        this.images[3] = "/assets/images/iceland4.jpg"
        this.images[4] = "/assets/images/iceland5.jpg"
        this.images[5] = "/assets/images/iceland6.jpg"
        this.images[6] = "/assets/images/iceland7.jpg"
        this.images[7] = "/assets/images/iceland8.jpg"
        this.currentSlide.src = this.images[0];

        this.initEvents()
    }


    initEvents() {
        this.slideshowButtonNext.addEventListener("click", () => {
            this.changeNextSlide()
        });
        this.slideshowButtonPrevious.addEventListener("click", () => {
            this.changePreviousSlide()
        });
    }
    changeNextSlide() {
        if(this.slideIndex < this.images.length-1){
            this.slideIndex += 1;
        }else{
            this.slideIndex = 0;
        }
        this.currentSlide.src = this.images[this.slideIndex];
    }
    changePreviousSlide() {
        if(this.slideIndex > 0){
            this.slideIndex -= 1;
        }else{
            this.slideIndex = this.images.length-1
        }
        this.currentSlide.src = this.images[this.slideIndex];
    }
}

class ExtendedImageCarousel extends BasicImageCarousel{
    dotContainer: HTMLDivElement;
    dots: NodeListOf<Element>;

    constructor(selector: string){
        super(selector);
        this.dotContainer = this.rootElement.querySelector(".js-slideshow-dots")
        this.createSlideshowDots();
        this.dots = this.rootElement.querySelectorAll(".js-slide-dot");
        this.changeSlidePressingDot();
    }


    createSlideshowDots() {
        this.images.forEach((image, i) => {
            const dot = document.createElement("span");
            dot.classList.add("carousell__dot", "js-slide-dot");
            dot.setAttribute("id", i+"");
            this.dotContainer.appendChild(dot);
        })
    }
    changeSlidePressingDot() {
        this.dots.forEach(dot => {
            dot.addEventListener("click", () => {
            this.currentSlide.src = this.images[+dot.id];
            this.makeAllDotsInactive()
            dot.classList.add("carousell__dot--active");
            })
        })  
    }
    makeAllDotsInactive() {
        this.dots.forEach(dot => {
            dot.classList.remove("carousell__dot--active");
        })
    }
    changeNextSlide() {
        this.makeAllDotsInactive()
        if(this.slideIndex < this.images.length-1){
            this.slideIndex += 1;
        }else{
            this.slideIndex = 0;
        }
        this.currentSlide.src = this.images[this.slideIndex];
        this.dots[this.slideIndex].classList.add("carousell__dot--active");
    }
    changePreviousSlide() {
        this.makeAllDotsInactive()
        if(this.slideIndex > 0){
            this.slideIndex -= 1;
        }else{
            this.slideIndex = this.images.length-1
        }
        this.currentSlide.src = this.images[this.slideIndex];
        this.dots[this.slideIndex].classList.add("carousell__dot--active");
    }
}

class DoubleExtendedImageCarousel extends ExtendedImageCarousel{
    thumbnailContainer: HTMLDivElement;
    thumbnails: NodeListOf<HTMLImageElement>
    constructor(selector: string){
        super(selector);
        this.thumbnailContainer = this.rootElement.querySelector(".js-thumbnail-container")
        this.createThumbnail()
        this.thumbnails = this.rootElement.querySelectorAll<HTMLImageElement>(".js-thumbnail-item");
        this.makeThumbnailSelectable()
    }

    
    createThumbnail() {
        this.images.forEach((image, i) => {
            const thumbnail = document.createElement("img") as HTMLImageElement;
            thumbnail.src = image;
            thumbnail.setAttribute("id", i+"");
            thumbnail.classList.add("thumbnails__item", "js-thumbnail-item")
            this.thumbnailContainer.appendChild(thumbnail)
        });
    }
    makeThumbnailSelectable() {
        this.thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener("click", () => {
                this.currentSlide.src = this.images[+thumbnail.id];
                this.makeAllDotsInactive()
                this.makeAllThumbnailsInactive()
                this.dots[+thumbnail.id].classList.add("carousell__dot--active");
                thumbnail.classList.add("thumbnails__item--active")
            })
        })
    }
    makeAllThumbnailsInactive() {
        this.thumbnails.forEach(thumbnail => {
            thumbnail.classList.remove("thumbnails__item--active")
        })
    }
    changeSlidePressingDot() {
        this.dots.forEach(dot => {
            dot.addEventListener("click", () => {
            this.currentSlide.src = this.images[+dot.id];
            this.makeAllThumbnailsInactive()
            this.makeAllDotsInactive()
            this.thumbnails[+dot.id].classList.add("thumbnails__item--active")
            dot.classList.add("carousell__dot--active");
            })
        })  
    }
    changeNextSlide() {
        this.makeAllDotsInactive()
        this.makeAllThumbnailsInactive()
        if(this.slideIndex < this.images.length-1){
            this.slideIndex += 1;
        }else{
            this.slideIndex = 0;
        }
        this.currentSlide.src = this.images[this.slideIndex];
        this.dots[this.slideIndex].classList.add("carousell__dot--active");
        this.thumbnails[this.slideIndex].classList.add("thumbnails__item--active")
    }
    changePreviousSlide() {
        this.makeAllDotsInactive()
        this.makeAllThumbnailsInactive()
        if(this.slideIndex > 0){
            this.slideIndex -= 1;
        }else{
            this.slideIndex = this.images.length-1
        }
        this.currentSlide.src = this.images[this.slideIndex];
        this.dots[this.slideIndex].classList.add("carousell__dot--active");
        this.thumbnails[this.slideIndex].classList.add("thumbnails__item--active")
    }
}

class TripleExtendedImageCarousel extends DoubleExtendedImageCarousel{
    timerButton: HTMLDivElement;
    intervalID: NodeJS.Timer;
    constructor(selector: string){
        super(selector);
        this.timerButton = this.rootElement.querySelector<HTMLDivElement>(".js-slideshow-button")
        this.fullscreenCurrentSlide()
        this.changeSlideshowState()
        
    }


    changeSlideshowState() {
        this.timerButton.addEventListener("click", () => {
            if(this.timerButton.getAttribute("slideshow")){
                this.stopSlideshow();
                this.timerButton.removeAttribute("slideshow")
                this.timerButton.lastElementChild.innerHTML = "START"
                this.timerButton.style.boxShadow = "none";
            }else{
                this.startSlideshow();
                this.timerButton.lastElementChild.innerHTML = "STOP"
                this.timerButton.style.boxShadow = "0 0 10px white";
            }
        })
    }
    startSlideshow() {
        this.timerButton.setAttribute("slideshow", "true");
            this.intervalID = setInterval(() => {
                this.changeNextSlide();
            }, 1000)
    }
    stopSlideshow() {
        clearInterval(this.intervalID);
    }
    fullscreenCurrentSlide() {
        this.currentSlide.style.cursor = "pointer";
        this.currentSlide.addEventListener("click", () => {
                this.currentSlide.requestFullscreen();
                if( window.innerHeight == screen.height) {
                document.exitFullscreen();
            }
        })
    }
}


const teste = new BasicImageCarousel(".js-slideshow-base");
const teste2 = new ExtendedImageCarousel(".js-slideshow-base-extend-I")
const teste3 = new DoubleExtendedImageCarousel(".js-slideshow-base-extend-II")
const teste4 = new TripleExtendedImageCarousel(".js-slideshow-base-extend-III")





