export class CircleProgress{
	constructor(id,inputId,unchosenBarColor,barColor,fontColor,loop,r){
		this.canvasObj = document.getElementById(id);
		this.inId = inputId;
		this.ucbc = unchosenBarColor; //未选择进度条颜色
		this.bc = barColor; // 选中的进度条颜色
		this.fc = fontColor; // 字体颜色
		this.loop = loop; // n等分
		this.r = r; //半径
		this.num = 0;// 值默认为0 
		this.ag = 360 / this.loop;
	}
	init(){
		//初始化获得画布的宽高，以及中心点的位置
		this.width = this.canvasObj.offsetWidth;
		this.height = this.canvasObj.offsetHeight;
		this.ctx = this.canvasObj.getContext('2d');
		//中心点
		this.cx = this.width/2;
		this.cy = this.height/2;
		//监听事件
		this.func = (e)=>{
			var x = e.offsetX;
			var y = e.offsetY;
			this.calcAngle(x,y);
		};
		//添加初始化监听函数
		this.canvasObj.addEventListener("mousedown",()=>{
			document.getElementById("myCanvas").addEventListener("mousemove",this.func);
		});
		this.canvasObj.addEventListener("mouseup",function(){
			document.getElementById("myCanvas").removeEventListener("mousemove",this.func);
		});
		this.canvasObj.addEventListener('dblclick',drawInput);
		this.canvasObj.addEventListener('click',hideInput);
		document.getElementById('inputs').addEventListener('blur',this.hideInput);
	}
	draw(){
		this.ctx.save();
		for(var i = 0; i < 120; i++){
			this.ctx.beginPath();
			this.ctx.lineWidth = 30;
			this.ctx.strokeStyle = this.ucbc;
			if(i+1 <= this.num){
				this.ctx.strokeStyle = this.bc;
			}
			var x0 = this.cx - (this.r*Math.sin((this.ag*(i+1)-2)*Math.PI/180));
			var y0 = this.cy - (this.r*Math.cos((this.ag*(i+1)-2)*Math.PI/180));
			this.ctx.moveTo(x0,y0);
			this.ctx.arc(this.cx,this.cy,r,(270 - this.ag * (i + 1) + 3) * Math.PI / 180, (270 - this.ag * i) * Math.PI / 180, true);
			this.ctx.stroke();
			this.ctx.closePath();
		}
		ctx.restore();
	}
	showNum(){
		this.ctx.beginPath();
		this.ctx.moveTo(0,0);
		this.ctx.strokeStyle=this.fc;
		this.ctx.font="30px Arial";
		this.ctx.textBaseline = 'middle'; //设置文本的垂直对齐方式
    	this.ctx.textAlign = 'center';//设置文本的水平对齐方式
		this.ctx.strokeText(this.num,this.cx,this.cy);
		this.ctx.closePath();
	}
	calcAngle(x1,y1){
			var dx = (x1 - x);
			var dy = (y1 - y);
			var numTemp = 0;
			var perangle = 360 / 120;
			// var angle = Math.abs(Math.atan(dx/dy));
			var angle = Math.abs(Math.atan(dx/dy));

			angle = angle * 180 / Math.PI;
			//区分为四个区域 1. x > 0; y > 0; 2. x > 0; y < 0; 3. x < 0; y > 0; 4. x < 0; y < 0;
			if(dx > 0 && dy > 0){
				// + 180
				numTemp = Math.ceil((angle + 180)/perangle);
			}else if( dx > 0 && dy < 0){
				// + 270
				numTemp = Math.ceil((90 - angle + 270)/perangle);
			}else if( dx < 0 && dy > 0){
				
				// + 90
				numTemp = Math.ceil(( 90 - angle + 90)/perangle);
			}else{
				
				// + 0
				numTemp = Math.ceil((angle + 0)/perangle);
			}
			//先清除画布
			ctx.clearRect(0,0,this.width,this.height);
			this.num = numTemp;
			this.draw();
			this.shownum();
			console.log(numTemp);
			return;
		}
	drawInput(){
			document.getElementById(this.inId).value = this.num;
			document.getElementById(this.inId).style.display = "block";
		}
	hideInput(){
			if(document.getElementById(this.inId).style.display == "none") return;
			document.getElementById(this.inId).style.display = "none";
			this.num = document.getElementById(this.inId).value;
			ctx.clearRect(0,0,this.width,this.height);
			this.draw();
			this.shownum();
		}
}