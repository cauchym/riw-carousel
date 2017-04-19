const Carousel = {
  init() {
    Carousel.config = {
      indexIds: Carousel._getIndexIds(),
    }
    Carousel.state = {
      isAlready: true,
    }
    Carousel.config.isInfinite = true;
    if (!Carousel.config.isInfinite) {
      document.getElementById('p-leftBtn').classList.add('is-hidden');
    }
    Carousel.setEventListener();
  },
  setEventListener() {
    const leftArrow = document.getElementById('p-leftBtn');
    leftArrow.addEventListener('click', Carousel.clickLeftArrow, false);
    const rightArrow = document.getElementById('p-rightBtn');
    rightArrow.addEventListener('click', Carousel.clickRightArrow, false);
  },
  clickLeftArrow() {
    if (!Carousel.state.isAlready) return;
    Carousel._rollCarousel(Carousel._getShownId(), 'former');
  },
  clickRightArrow() {
    if (!Carousel.state.isAlready) return;
    Carousel._rollCarousel(Carousel._getShownId(), 'latter');
  },
  _getShownId() {
    const activeImage = document.getElementsByClassName('is-active');
    return activeImage[0].id;
  },
  _rollCarousel(shownId, towardOpt) {
    const _shownId = shownId;
    const towardId = Carousel.getTowardId(_shownId, towardOpt);
    if(_shownId !== towardId) {
      Carousel.changeShownImage(_shownId, towardId, towardOpt);
    }
  },
  _getIndexIds() {
    const ImagesArray = document.getElementsByClassName('p-image');
    const indexIds = [];
    Array.prototype.forEach.call(ImagesArray, (el) => {
      indexIds.push(el.id);
    });
    return indexIds
  },
  _refreshArrows(towardId) {
    const rightArrow = document.getElementById('p-rightBtn');
    const leftArrow = document.getElementById('p-leftBtn');
    const indexIds = Carousel.config.indexIds;
    if(!Carousel.config.isInfinite && towardId === indexIds[indexIds.length-1]){
      rightArrow.classList.add('is-hidden');
    }else if(!Carousel.config.isInfinite && towardId === indexIds[0]){
      leftArrow.classList.add('is-hidden');
    }else{
      rightArrow.classList.remove('is-hidden');
      leftArrow.classList.remove('is-hidden');
    }
  },
  getTowardId(shownId, towardOpt) {
    const _shownId = shownId;
    const _indexIds = Carousel.config.indexIds;
    const shownIndex = _indexIds.indexOf(_shownId);
    let towardIndex  = -1;
    if (towardOpt === 'former' && shownIndex === 0) {
      towardIndex = Carousel.config.isInfinite ? (_indexIds.length - 1) : shownIndex;
    } else if (towardOpt === 'latter' && shownIndex === (_indexIds.length - 1)) {
      towardIndex = Carousel.config.isInfinite ? 0 : shownIndex;
    } else {
      towardIndex = (towardOpt === 'former') ? (shownIndex - 1) : (shownIndex + 1);
    }
    return _indexIds[towardIndex];
  },
  changeShownImage(shownId, towardId, moveDir) {
    const _shownId = shownId;
    const _towardId = towardId;
    const shownImage = document.getElementById(_shownId);
    const towardImage = document.getElementById(_towardId);
    if (moveDir === 'latter') {
      // slide to left
      Carousel.state.isAlready = false;
      towardImage.classList.add('is-right');
      setTimeout(()=>{
        shownImage.classList.remove('is-active');
        shownImage.classList.add('is-sliding-ctol');
        towardImage.classList.add('is-sliding-rtoc');
        setTimeout(()=>{
          towardImage.classList.add('is-active');
          towardImage.classList.remove('is-right');
          shownImage.classList.remove('is-sliding-ctol');
          towardImage.classList.remove('is-sliding-rtoc');
          Carousel._refreshArrows(towardId);
          Carousel.state.isAlready = true;
        }, 1000);
      }, 10);
    } else if (moveDir === 'former') {
      // slide to right
      Carousel.state.isAlready = false;
      towardImage.classList.add('is-left');
      setTimeout(()=>{
        shownImage.classList.remove('is-active');
        shownImage.classList.add('is-sliding-ctor');
        towardImage.classList.add('is-sliding-ltoc');
        setTimeout(()=>{
          towardImage.classList.remove('is-left');
          shownImage.classList.remove('is-sliding-ctor');
          towardImage.classList.remove('is-sliding-ltoc');
          towardImage.classList.add('is-active');
          Carousel._refreshArrows(towardId);
          Carousel.state.isAlready = true;
        }, 1000);
      }, 10);
    }
  },
}

module.exports = Carousel;
