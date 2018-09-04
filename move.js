function getStyle(ele, attr){
		if(ele.currentStyle){
			return ele.currentStyle[attr];
		}else{
			return window.getComputedStyle(ele,false)[attr];
		}
	}
function startMove(ele, iTargetObj, callback){
		clearInterval(ele.timer);
		// var bstop =true;
		var ispeed, icur;
		ele.timer = setInterval(function(){
			var bstop = true;
			for(var attr in iTargetObj){
				if(attr === 'opacity'){
					icur = parseFloat(getStyle(ele,attr))*100;
			}else{
				icur = parseInt(getStyle(ele,attr));
			}
			ispeed = (iTargetObj[attr] - icur) /7;
			ispeed = ispeed > 0 ? Math.ceil(ispeed) : Math.floor(ispeed);
			if(attr === 'opacity'){
				ele.style.opacity = (icur + ispeed) /100;
			}else {
				ele.style[attr] = icur + ispeed + 'px';
			}
			if(iTargetObj[attr] !== icur){
				bstop = false;
			}
		}
		if(bstop){
			clearInterval(ele.timer);
			callback(bstop);
		}
		},30)
	}
var oslider = document.getElementsByTagName('ul')[3];		
var oLeftBtn = document.getElementById('leftbtn');
		var oRightBtn = document.getElementById('rightbtn');
		var oIArray = document.getElementsByTagName('i');
		var MoveDistance = oslider.children[1].offsetWidth;
		var sliderTimer = null;
		var globalIndex = 0;
		var imageNumber = oslider.children.length - 1 ;
		var lock = true;
		for(var i = 0; i < oIArray.length; i++){
			(function(j){
				oIArray[i].onclick = function(){
					clearTimeout(sliderTimer);
					globalIndex = j;
					changeIndex(globalIndex);
					lock = false;
					startMove(oslider, {left: -globalIndex * MoveDistance},function(){
						lock = true;
						sliderTimer = setTimeout(autoMove,1500);
					});
				}

			})(i);
		
		}
		oLeftBtn.onclick = function(){
			autoMove('right');//left from right
		}
		oRightBtn.onclick = function(){
			autoMove('left');//right from left;
		}
		function autoMove(direction){
			// console.log('aaa');
			if(lock){
				lock = false;
				clearTimeout(sliderTimer)
				if(!direction || direction === 'left'){
					//left to right
					globalIndex++;
					startMove(oslider,{left:oslider.offsetLeft - MoveDistance},function(){
						if(oslider.offsetLeft === -MoveDistance * imageNumber){
							oslider.style.left = '0px';
							globalIndex = 0;
						}
						sliderTimer =setTimeout(autoMove,1500);
						lock = true;
						changeIndex(globalIndex);
					});
				}else if(direction === 'right'){
					if(oslider.offsetLeft === 0){
						globalIndex = oslider.length - 1; 
						oslider.style.left = -MoveDistance * imageNumber + 'px';

					}
					globalIndex--;
					startMove(oslider,{left:oslider.offsetLeft + MoveDistance}, function(){
						sliderTimer = setTimeout(autoMove,1500);
						lock = true ;
						changeIndex(globalIndex);
					});
				}
			
				 
			}
			

		}
		function changeIndex(index){
				for(var i = 0; i< oIArray.length; i++){
					oIArray[i].setAttribute('class', '');
				}
				oIArray[index].setAttribute('class','active');

			}
		sliderTimer = setTimeout(autoMove,1500);
	