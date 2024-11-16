class StartScreen{constructor(){this.updateLayout()}
display(){background('#AE6D95');image(textureLayer,0,0);this.displayTarget()}
displayTarget(){push();stroke(255);strokeWeight(14);fill('#6E4460');rect(this.boxX,this.boxY,this.boxSize,this.boxSize);pop();push();textFont('Sans Serif');textSize(this.fontSize);textAlign(CENTER,CENTER);text(targetAnimal,this.boxX+this.boxSize/2,this.boxY+this.boxSize/2);pop();this.displayText()}
displayText(boxX,boxY,size){push();textFont(wallFont);stroke(255);strokeWeight(4);noFill();textAlign(LEFT,CENTER);textSize(this.fontSize);text(`X${targetScore}`,this.boxX+this.boxSize,windowHeight/2);pop()}
updateLayout(){this.boxSize=min(windowWidth,windowHeight)*0.3;this.boxX=windowWidth/2-this.boxSize;this.boxY=windowHeight/2-this.boxSize/2;this.fontSize=this.boxSize*0.6}
resize(){this.updateLayout()}}