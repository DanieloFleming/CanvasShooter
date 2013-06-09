function Player(){
    this.x = -100;
    this.y = CW;
    this.width = 50;
    this.height = 32;
    this.hp = 5;//health
    this.alive = true;
    this.active = true;
    this.hitt = false;
	this.vbrt = 30;//shake screen
	this.vbrs = 0.7;
	this.alph = 0.6;
    ammo = "bullet";
	
    var a = 0, 
	f = 0, 
	c = 0, 
	i = new Image(), 
	g = "", 
	j = "", 
	r = 10, 
	al = 1, 
	cshot = 0, 
	charge = false;
    
    i.src = "game/img/ship.png";
    this.draw = function draw() {
	    if(this.alive == true){
	        PF.drawImage(i, this.x, this.y)
	    }else {
			if(r > 1){
				PF.fillStyle = "rgba(0,100,150,"+al+")";
				PF.beginPath();
				PF.arc(this.x + 25, this.y + 16, r, 0, 2 * Math.PI);
				PF.fill();
			}
		}
    }
	
    this.check = function check(event){

		switch(event.type){
			case "mousedown":
				charge = true;
				shootbullets();
				break;
			case "mouseup":
				if(cshot > 2){
					shootlaser();
				}
				charge = false;
           		cshot = 0;
           		SC.chargeShot(cshot);
				break;
		}
    }
    function shootbullets() {
        if (BL.length < 4) {
            g = new Bullet(a + 60, f + 10 + c);
            EL.push(g);
			BL.push(g);

            g = new Bullet(a + 60, f + 18 + c);
            EL.push(g);
			BL.push(g)	            
        }
    }
    function shootlaser(){
        if (BL.length < 1) {
            g = new Laser(a + 60, f + 13 + c);
            EL.push(g);
			BL.push(g);
        }
    }
	
	this.update = function update() {
        if(this.alive == false){
   			r += 7;
   			al -= 0.005;
   			this.width += 30;
   			this.height += 30;
   			if(al <= 0){
   				this.active = false;
   			}
        }
        else{
	        this.x += (mouseX - this.x) / 10;
	        this.y += (mouseY -  this.y) / 10;
	        a = this.x;
	        f = this.y;
	        c = ((mouseY - this.y) / 10);
        }
        if(charge == true){
			cshot += 0.02;
			SC.chargeShot(cshot);
        }
        if(this.hitt == true){
	    	if(this.vbrt > 0){
		    	this.alph -= 0.027;
		    	TILT.style.top = - this.vbrt + Math.round(Math.random()* this.vbrt) + "px";
		    	TILT.style.left = - this.vbrt + Math.round(Math.random()* this.vbrt) + "px";
		    	PF.fillStyle = "rgba(255, 0, 0, "+this.alph+")";
		    	PF.fillRect(0, 0, CW, CH);
		    	this.vbrt -= this.vbrs;
	    	}else{
		    	TILT.style.top = "0px";
		    	TILT.style.left = "0px";
		    	this.hitt = false;
	    	}
        }

    }
   
   this.hit = function(){
    	this.hp -= 1;
    	if(this.hp >= 0){
	    	this.hitt = true;
		    this.vbrt = 30;
		    this.alph = 0.8;
		    this.vbrs = 0.7;
		}else{
		    this.killed();
		}
		return this.hp;
    }
    this.killed = function killed(){
		FIELD.onmousedown = null;
	    FIELD.onmouseup = null;
	   	this.hitt = true;
	   	this.vbrs = 0.3;
		this.vbrt = 40;
		this.alph = 0.9;
    	this.alive = false;
    }
}	
	
function Bullet(bx, by) {
    this.active = true;
    this.color = "#ffff00";
    this.x = bx;
    this.y = by;
    this.width = 15;
    this.height = 4;
    this.pwr = 10;
   
   this.draw = function draw() {
        PF.fillStyle = this.color;
        PF.fillRect(this.x, this.y, this.width, this.height)
    }
    this.update = function update() {
        this.x += 20;
        if (this.x > CW) {
            this.active = false
        }
    }
    this.hit = function(){
    	this.active = false;
    }
}
function Laser(d, b) {
    this.active = true;
    this.color = "purple";
    this.y = SH.y + 9;
    this.x = SH.x + 60;
    this.fd = 0;
    this.width = 15;
    this.height = 15;
    this.pwr= 7;
    this.draw = function draw() {
    if(this.height > 0){
        PF.fillStyle = this.color;
        PF.fillRect(this.x, this.y, this.width, this.height)
        }
    }
    this.update = function update() {
    	this.fd += 0.1;
    	this.pwr -= .02;
        this.width += 40;
        this.height -= 0.2;
   		this.y = SH.y + 9 + this.fd;
        this.x = SH.x + 60;
        if (this.height < -4.5) {
            this.active = false
        }
    }
    this.hit = function(){
    
    }
}
