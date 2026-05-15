//child class #1 - Circle
class CircleObject extends AnimatedObject{
    constructor(x,y){
        super(x,y);//run the parent class constructor
        //we can also add on to what was in the parent class
        this.size = random(20,40);
    }

    //no mention of move()...we get an exact copy of move() from parent class

    display(){//function override; copies overtop of the parent version
        if(dist(this.x,this.y,mouseX,mouseY)<this.size/2){
            fill(255,0,0);
        }
        else fill(255);

        circle(this.x,this.y,this.size);
    }
}