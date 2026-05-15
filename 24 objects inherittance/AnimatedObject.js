//parent class ("super Class")
// --- if all classes in one file, this should occur first ---
class AnimatedObject{
    //constructor
    constructor(x,y){
      this.x = x; this.y = y;
      this.size = 6;
    }
  
    //class methods
    move(){ //add a "wiggle" effect
      this.x += random(-2,2);
      this.y += random(-2,2);
    }
  
    display(){
      strokeWeight(this.size);
      point(this.x,this.y);
    }
  }