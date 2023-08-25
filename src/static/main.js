require('./orientationchange');

var supportOrientation = (typeof window.orientation === 'number' && typeof window.onorientationchange === 'object');

// js
// var swipe = require('./swipe.init')
var lazyload = require('./lazyload')

// todo: fix window

var lazy = {
	init: function() {
		var $img = document.getElementsByClassName('js-image');
		for (var i = 0, len = $img.length; i < len; i++) {
			lazyload({
				container: document.getElementsByTagName('body')[0],
				$target: $img[i],
				selector: '.js-image'
			})
		}
	}
}

var resizeHandle = function (type) {
	var iw = window.innerWidth;
	var ih = window.innerHeight;
	if (iw <= 750) {
		var $thumbs = document.getElementsByClassName('js-photos-thumb');
		var width;
		if (type === 'landscape') {
			// 横屏
			width = '20%';
		} else if (type === 'portrait') {
			// 竖屏
			width = '33.333333%';
		}
		for (var i = 0, len = $thumbs.length; i < len; i++) {
			$thumbs[i].style.width = width;
		}
	}
	lazy.init();
}

window.onload = function() {
	var curType = window.neworientation.init;
	resizeHandle(curType);
	// swipe.init();
	

	if(typeof PhotoSwipeLightbox!='undefined'){
		var lightbox = new PhotoSwipeLightbox({
			gallery: '.photos',
			children: 'a',
			bgOpacity: 0.9,
			// dynamic import is not supported in UMD version
			pswpModule: PhotoSwipe 
		  });
		  lightbox.on('uiRegister', function() {
		  lightbox.pswp.ui.registerElement({
			name: 'custom-caption',
			order: 9,
			isButton: false,
			appendTo: 'root',
			html: 'Caption text',
			onInit: (el, pswp) => {
			  lightbox.pswp.on('change', () => {
				const currSlideElement = lightbox.pswp.currSlide.data.element;
				let captionHTML = '';
				if (currSlideElement) {
				  const hiddenCaption = currSlideElement.querySelector('.hidden-caption-content');
				  
				  if (hiddenCaption) {
					// get caption from element with class hidden-caption-content
					captionHTML = hiddenCaption.innerHTML;
				  } else {
					// get caption from alt attribute
					// captionHTML = currSlideElement.querySelector('img').getAttribute('alt');
				  }
				}
				el.innerHTML = captionHTML || '';
			  });
			}
		  });
		});
		lightbox.init();
	}

	window.addEventListener('orientationchange', function () {
		if (curType !== window.neworientation.current) {
			resizeHandle(window.neworientation.current);
			curType = window.neworientation.current;
		}
	}, false);
}
