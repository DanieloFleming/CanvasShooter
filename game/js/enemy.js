function Enemy(posX, posY, m){

	this.active = true;
	this.alive = true;
	this.x = posX;
	this.y = posY;
	this.width = 15;
	this.height = 15;
	this.hp = 3;
	this.speed = m + Math.random() * 2;
	this.decy = 0;
	this.decx = 0;//
	this.r = 40;//
	this.points = 100;//

	var shake = false,
    tmr = 20,
    color = "#224433";
    
	this.draw = function draw() {
        if (this.alive) {
            PF.fillStyle = color;
            PF.fillRect(this.x, this.y, this.width, this.height)
        } else {
            if (this.alive === false && this.r > 0) {
                PF.beginPath();
                PF.fillStyle = "rgba(255,25,0, 0.4)";
                PF.arc(this.x + 7, this.y + 7, this.r, 0, 2 * Math.PI);
                PF.fill()
            }
        }
    }
	this.update = function update(){
		this.decy = (mouseY - 150) * 0.006;
		this.decx = mouseX * 0.003;
        this.x -= this.speed + this.decx;
        this.y -= this.decy;
		
		if(this.x < -20){
			this.active = false;
		}
		
		if(this.alive === false){
			this.speed = 0;
			this.r -= 1;
			if(this.r < 3){
				this.active = false;
			}
		}
	}
	this.hit = function hit(l) {
        this.hp -= l;
        if(this.hp <= 5){
        	color = "#ee3322";
        	this.speed += 2;
        }
        if(this.hp <= 0){
        	this.alive = false;
        	return this.points;
        }else{
        	return 25;
        }
	}
}
////////////////////////////////






///////////////////////////////







/////////////////////////////////
function Enemy2(posX, posY){
    this.active = true;
    this.alive = true;
    this.x = posX;
    this.y = posY;
    this.width = 20;
    this.height = 20;
    this.hp = 30;
    this.speed = 1 + Math.random() * 2;
    this.speedX = 0
    this.decy = 0;
    this.decx = 0;
    this.r = 40;
    this.points = 150;
    
	var color = "#dddd33",
    tmr = 0,
    frr = 3 + Math.random() * 3,
    bb = "";
	
    this.draw = function draw() {
        if (this.alive) {
            PF.fillStyle = color;
            PF.fillRect(this.x, this.y, this.width, this.height)
        } else {
            if (this.alive === false && this.r > 0) {
                PF.beginPath();
                PF.fillStyle = "rgba(255,150,0, 0.4)";
                PF.arc(this.x + 7, this.y + 7, this.r, 0, 2 * Math.PI);
                PF.fill()
            }
        }
    }
	
    this.update = function update() {
		tmr += 0.02

        this.decy = (mouseY - 150) * 0.006;
        this.decx = mouseX * 0.003;
        this.x -= this.speed + this.decx;
        this.y += ((SH.y - this.y + this.height/2)/1000);
        if (this.x < -20) {
            this.active = false
        }
        if (this.alive === false) {
            this.speed = 0;
            this.r -= 1;
            if (this.r < 3) {
                this.active = false
            }
        }
        if(tmr > frr){

        	tmr = 0;
        	shoot(this.x + this.width/2, this.y + this.height/2);
        }
        

    }
    function shoot(x, y){
		bb = new BB(x, y);
		EL.push(bb);
		EB.push(bb);
    }
    this.hit = function hit(f) {
        this.hp -= f;
        if(this.hp <= 10){
        	clr = "#ff8899";
        	frr = 2;
        	this.speed = 1;
        }
        if(this.hp <= 0){
        	this.alive = false;
        	return this.points;
        }else{
        	return 25;
        }
    }
}
function BB(bx, by) {
    this.active = true;
    this.alive = true;
    this.color = "#ff0000";
    this.x = bx;
    this.y = by;
    this.tX = (SH.x + SH.width/2) - this.x;
    this.tY = (SH.y + SH.height/2) - this.y;
    this.lenth = Math.sqrt(this.tX*this.tX + this.tY*this.tY);
    this.tX /= this.lenth;//
	this.tY /= this.lenth;//
    this.speed = 4;
    this.tX *= this.speed;
    this.tY *= this.speed;
    this.width = 10;
    this.height = 10;
    this.points = 0;
    
    this.draw = function draw() {
        PF.fillStyle = this.color;
        PF.fillRect(this.x, this.y, this.width, this.height)
    }
    this.update = function update() {
        this.x += this.tX;
        this.y += this.tY;
        if (this.x < 0 || this.alive === false) {
            this.active = false
        }
    }
    this.hit = function hit(){
    	//this.active = false;
    	//this.alive = false;
    }
}