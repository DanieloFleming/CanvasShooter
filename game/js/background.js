function Background() {
	BG = DOM.getElementById('gamebg').getContext("2d"),
	GX = [];
	var i = 0, 
	fps = 1000/60,
	sp  = [];
	for(i; i< 200;i++){
		var s = new star;
		GX[i] = s;
	}
	setInterval(function(){
		update();
		draw();
	}, fps);
	function update(){
		for(i = 0; i < GX.length; i++){GX[i].update();}
	}
	function draw(){
		BG.clearRect(0, 0, CW, CH);
		for(i = 0; i < GX.length; i++){GX[i].draw();}
	}
	DOM.getElementById('playfield').onmousemove = function(e){
        mouseX = e.layerX;
        mouseY = e.layerY;
		var m = mouseY - 150;
		for(i = 0; i < GX.length; i++){
				GX[i].decx = 0.005 * mouseX;
				GX[i].decy = 0.01 * m;
		}
	}
}
function star(){
	this.color = ['#ffffff', '#ffa2a2', '#b3f2ff', '#ffefa2',];
	this.color = this.color[Math.round(Math.random() * 3)]
	this.xvel = Math.random() * 5;
	this.decx = 0;
	this.decy = 0;
	this.x =  Math.random() * CW;
	this.y =  Math.random() * CH;
	this.width = Math.random() *6;
	
	this.draw = function draw(){
		BG.fillStyle = this.color;
		BG.fillRect(this.x, this.y, this.width, 2);
	}
	this.update = function update(){
		this.x -= this.xvel + this.decx;
		this.y -= 0 + this.decy;
		if(this.x < 0){
			this.x = CW;
			this.width = Math.random() *6;
			this.y =  Math.random() * CH;
		}
		if(this.y < 0){this.y = CH}
		else if(this.y > CH){this.y = 0}
	}
}