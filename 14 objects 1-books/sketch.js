// Objects 1-Books
// Ryder Martin
// 3/24/2026
// library sorting system

//global variables
let myBook; //CANT INIT OBJECTS HERE
//add and display 2 more books
let myBook2;
let myBook3;


function setup() {
  createCanvas(windowWidth, windowHeight);
//create a single book
  myBook = new Book("CS30 Text", "Mr.Scott", 1234567891011, "leatherbound", 500, width*0.3);
  myBook2 = new Book("One fish two red fish blue fish", "Dr.Seuz", 23456789101112, "softcover", 72, width*0.4)
}

function draw() {
  background(220);
  myBook.display();
  myBook2.display();
}

class Book{
  // 1.Constructor
  constructor(title, author, isbn, cover, pages, x){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.cover = cover;
    this.pages = pages;
    this.x = x;
  }

  //2 class methods
  //since were in a class we omit the function keyword
  display(){
    // render our book object on canvas
    rectMode(CENTER); textAlign(CENTER,CENTER);
    textSize(20);

    //set fill color ased on cover type
    switch(this.cover){
      case "softcover":
        fill(250,200,150); break;
      case "hardcover":
        fill(120,255,255); break;
      case "leatherbound":
        fill(150,100,15); break;
    }

    // now draw the book
    push();
    translate(this.x, height/2);
    rect(0, 0, this.pages/10, 150);
    fill(255);
    text(this.title[0], 0, -50);
    pop();
    push();
    translate(this.x, height/2);
    rect(0, 0, this.pages, 150);
    fill(255);
    text(this.title[0], 0, -50);
    pop();
  }


}