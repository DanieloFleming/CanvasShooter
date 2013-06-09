CW = 630, CH = 500, mouseX = 0, mouseY = 0, DOM = document, SF = "", EL = [], BL = [], EB = [], EN = [], FPS = 1000 / 60, SH = "", P = 0;

function setGame() {
	SF = new Background();
	startScreen();
}
function startScreen() {
	PF = DOM.getElementById('playfield').getContext("2d");
	PF.font = "40pt Century Gothic";
	PF.fillStyle = "white";
	PF.fillText("Click to Play", 150, 170);
	DOM.getElementById('playfield').onclick = startGame;
}
function startGame() {
	TILT = DOM.getElementById("tilt");
	FIELD = DOM.getElementById('playfield');
	FIELD.onclick = null;
    FIELD.onselectstart = function () {
        return false
    }
    FIELD.onmousedown = function () {
        return false
    }
    var d, tmr, hitt, vbrt, gameover, alph, es;
	start();
    
	function start(){
        PF.clearRect(0, 0, CW, CH);
	    d = 15,
	    tmr = 10,
	    hitt = false,
	    vbrt = 20,
	    gameover = false,
	    alph = 0.6;
	    es = 1;
	    while (d--) {
	        addEnemy();
	    }
	
	    SC = new scoreBoard();
	    SH = new Player;
	    EL.push(SH);
	    SC.lives(SH.hp);
	    FIELD.onmousedown = SH.check;
	    FIELD.onmouseup = SH.check;
    }
    var loop = setInterval(function () {
        draw();
        update();
        collision();
        boundery();
    }, FPS);

    function draw() {
        PF.clearRect(0, 0, CW, CH);
        var k = EL.length;
        while (k--) {
            EL[k].draw();
        }
    }
    function update() {
        var k = EL.length;
        while (k--) {
            EL[k].update();
        }
    }
    function collision() {
        for (var i = 0; i < EN.length; i++) {
            if (EN[i].alive && SH.alive && detectHit(SH, EN[i]) === true ) {
                EN[i].alive = false;
              	
              	SC.lives(SH.hit());
            }
            for (var k = 0; k < BL.length; k++) {
                if (EN[i].alive && detectHit(BL[k], EN[i]) === true) {
                    
					SC.score(EN[i].hit(BL[k].pwr));
					BL[k].hit();
                }
            }
        }
        for(var eg = 0; eg < EB.length; eg++)
        {
            if(EB[eg].alive && SH.alive && detectHit(SH, EB[eg]) === true )
            {
                EB[eg].alive = false;
				SC.lives(SH.hit());
                
            }
        }
    }
    function boundery() {
        var l = BL.length,
            k = EN.length,
            qu = EB.length;
        while (l--) {
            if (BL[l].active === false) {
                removeEnemy(BL[l], "b");
                break;
            }
        }
        while (k--) {
            if (EN[k].active === false) {
                removeEnemy(EN[k], "en");
                break;
            }
        }
        while (qu--) {
            if (EB[qu].active === false) {
                removeEnemy(EB[qu], "eb");
                break;
            }
        }
        if(SH.active === false){
        	gameOver();
        }
    }
    
	function detectHit(k, i) {
        return k.x < i.x + i.width && k.x + k.width > i.x && k.y < i.y + i.height && k.y + k.height > i.y
    }
    
	function addEnemy() {
		if(P < 3000){
			es *= 1.009;
			e = new Enemy(CW + Math.random() * 100, - 80 + Math.random() * 420, es);
			EN.push(e);
			EL.push(e)
		}else{
	       if(EN.length <= 6){
			   e = new Enemy2(CW + Math.random() * 100, - 80 + Math.random() * 420);
			   EL.push(e);
			   EN.push(e);
		   }
       }
    }
	
    function removeEnemy(obj, type) {
        switch (type) {
        case "b":
            BL.splice(BL.indexOf(obj), 1);
            break;
        case "en":
            EN.splice(EN.indexOf(obj), 1);
            if(gameover == false){
				addEnemy();
			}
            break;
        case "eb":
        	EB.splice(EB.indexOf(obj), 1);
        }
        EL.splice(EL.indexOf(obj), 1)
    }
	
    function gameOver(){
    	gameover = true;
    	EL.splice(EL.indexOf(SH), 1);
		PF.font = "40pt Century Gothic";
		PF.fillStyle = "white";
		PF.fillText("Game Over", 150, 150);
		PF.font = "15pt Century Gothic";
		PF.fillText("Click to restart", 240, 220);
    	FIELD.onmousedown = reset;
    }
    function reset(){
    	EL.splice(0);
    	BL.splice(0);
    	EN.splice(0);
    	EB.splice(0);
    	P = 0;
    	SH = null;
    	SC = null;
    	start();
    }
}
	
function scoreBoard(){

	hud = document.getElementById("score").getContext("2d");
	var points = 0, 
	hp = 0, 
	li = 0, 
	load = 0, 
	cclr = 0, 
	alp = 1, 
	reload = false;
	
	P = points;
	
	this.score = function score(s){
		points += s;
		P = points;
		this.update();
	}
	this.lives = function lives(l){
		hp = l;
		this.update();
	}
	this.chargeShot = function chargeShot(c, r){
		if(c <= 2){
			if(c < 0.3)cclr = 0;
			alp = 1;
			cclr += 3;
			load = c * 45;
		}
		else {
			if(c > 2){
				cclr = 255;
				alp = 0.1 + Math.random() * 0.9;
				reload = true;
			}
		}
		this.update();
	}
	this.update = function(){
		hud.clearRect(0, 0, CW, CH);
		hud.fillStyle = "#fff";
		hud.font = "30px Century Gothic";
		
		hud.fillText("score: " + points, 190, 290);
		hud.fillStyle = "rgba(255, 20, "+cclr+", " + alp + ")";
		hud.fillRect(400, 272, load, 20);
		if(hp >0){
			for(li;li < hp; li++){
				hud.fillStyle = "#fff";
				hud.fillRect(85 + 15 * li, 272, 10, 20);

			}
			li = 0;
		}
	}

}	