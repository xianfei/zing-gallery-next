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

async function supportsImgType(type) {
	// Create
	//
	// <picture>
	//   <source srcset="data:,x" type="{type}" />
	//   <img />
	// </picture>
	//
	// (where "data:,x" is just a minimal URL that is valid but doesn't trigger network)
	let img = document.createElement('img');
	document.createElement('picture').append(
	  Object.assign(document.createElement('source'), {
		srcset: 'data:,x',
		type
	  }),
	  img
	);
	// Wait a single microtick just for the `img.currentSrc` to get populated.
	await 0;
	// At this point `img.currentSrc` will contain "data:,x" if format is supported and "" otherwise.
	return !!img.currentSrc;
}

window.onload = async function() {
	for(let format of JSON.parse(document.querySelector('meta[name="support-img-format"]').getAttribute('content'))){
		const isSupport = await supportsImgType('image/'+(format=='jpg'?'jpeg':format))
		if(isSupport){
			console.log('Support:' + format)
			break
		}else{
			console.log('Unsupport:' + format)
		}
	}


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
