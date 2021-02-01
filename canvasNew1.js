export default class CircleProgress {
	constructor(id, inputId, unchosenBarColor, barColor, fontColor, loop, r,unit) {
		this.canvasObj = document.getElementById(id);
		this.inId = document.getElementById(inputId);
		this.inputid = inputId;
		this.ucbc = unchosenBarColor; //未选择进度条颜色
		this.bc = barColor; // 选中的进度条颜色
		this.fc = fontColor; // 字体颜色
		this.loop = loop; // n等分
		this.r = r; //半径
		this.num = 350;// 值默认为0 
		this.ag = 360 / 60;
		this.unit = unit;
		this.init();
	}
	init() {
		//初始化获得画布的宽高，以及中心点的位置
		this.width = this.canvasObj.offsetWidth;
		this.height = this.canvasObj.offsetHeight;
		this.ctx = this.canvasObj.getContext('2d');
		//中心点
		this.cx = this.width / 2;
		this.cy = this.height / 2;
		//监听事件
		//设置input的宽度
		this.inId.style.width = (this.r * 2 - this.r/2- this.r/3) + "px";
		this.fontSize = (this.r * 2 - this.r/2)/3;
		this.inId.style.fontSize = this.fontSize + 'px';

		this.func = (e) => {
			var x = e.offsetX;
			var y = e.offsetY;
			this.calcAngle(x, y);
		};
		this.drawInput = ()=>{
			// document.getElementById(this.inputid).value = this.num;
			this.inId.value = this.num;
			this.inId.style.display = "block";
			this.inId.focus();
		}
		this.hideInput =()=>{
			if (this.inId.style.display == "none") return;
			this.inId.style.display = "none";
			this.num = this.inId.value > this.loop ? this.loop : this.inId.value;
			this.num = this.num < 0 ? 0 : this.num
			this.ctx.clearRect(0, 0, this.width, this.height);
			this.draw();
			this.showNum();
		}
		//添加初始化监听函数
		// this.canvasObj.addEventListener("mousedown", () => {
		// 	this.canvasObj.addEventListener("mousemove", this.func);
		// });
		// this.canvasObj.addEventListener("mouseup", () => {
		// 	this.canvasObj.removeEventListener("mousemove", this.func);
		// });
		// this.canvasObj.addEventListener('dblclick', this.drawInput);
		// this.canvasObj.addEventListener('click', this.hideInput);
		// this.inId.addEventListener('blur', this.hideInput);
		this.draw();
		this.showNum();
	}
	draw() {
		this.ctx.save();
		console.log(this.ag);
		for (var i = 0; i < 60; i++) {
			this.ctx.beginPath();
			this.ctx.lineWidth = this.r / 2;
			this.ctx.strokeStyle = this.ucbc;
			var curNum = Number(this.num)*60/this.loop;
			if (i + 1 <= curNum) {
				this.ctx.strokeStyle = this.bc;
			}			
			// var x0 = this.cx - (this.r * Math.cos((this.ag * (i + 1) + 3) * Math.PI / 180));
			// var y0 = this.cy - (this.r * Math.sin((this.ag * (i + 1) + 3) * Math.PI / 180));
			// this.ctx.moveTo(x0, y0);
			this.ctx.arc(this.cx, this.cy, this.r, (this.ag * i -90) * Math.PI / 180, (this.ag * (i + 0.65)-1 -90) * Math.PI / 180, false);
			this.ctx.stroke();
			this.ctx.closePath();
		}
		this.ctx.restore();
	}
	showNum() {
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.moveTo(0, 0);
		this.ctx.fillStyle = this.fc;
		this.ctx.font = this.fontSize+'px Arial';
		console.log(this.fontSize);
		console.log(this.ctx.font);
		this.ctx.textBaseline = 'middle'; //设置文本的垂直对齐方式
		this.ctx.textAlign = 'center';//设置文本的水平对齐方式
		this.ctx.fillText(Number(this.num)+this.unit, this.cx, this.cy);
		// this.ctx.fill();
		this.ctx.closePath();
		this.ctx.restore();
	}
	calcAngle(x1, y1) {
		var dx = (x1 - this.cx);
		var dy = (y1 - this.cy);
		var numTemp = 0;
		var perangle = 360 / this.loop;
		// var angle = Math.abs(Math.atan(dx/dy));
		var angle = Math.abs(Math.atan(dx / dy));
		

		angle = angle * 180 / Math.PI;
		// console.log(angle);
		//区分为四个区域 1. x > 0; y > 0; 2. x > 0; y < 0; 3. x < 0; y > 0; 4. x < 0; y < 0;
		if (dx > 0 && dy > 0) {
			// + 180
			// numTemp = Math.ceil((angle + 180) / perangle);
			numTemp = Math.ceil((90 - angle + 90) / perangle);
		} else if (dx > 0 && dy < 0) {
			// + 270
			// numTemp = Math.ceil((90 - angle + 270) / perangle);
			numTemp = Math.ceil((angle + 0) / perangle);
		} else if (dx < 0 && dy > 0) {
			// + 90
			// numTemp = Math.ceil((90 - angle + 90) / perangle);
			numTemp = Math.ceil((angle + 180) / perangle);
		}else if(dy>0 && dx == 0){
			numTemp = this.loop / 2;
		}else if(dy==0 && dx > 0){
			numTemp = this.loop / 4 * 1;
		}else {
			// + 0
			// numTemp = Math.ceil((angle + 0) / perangle);
			numTemp = Math.ceil((90 - angle + 270) / perangle);
		}
		//先清除画布
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.num = numTemp;
		this.draw();
		this.showNum();
		// console.log(numTemp);
		return;
	}

}