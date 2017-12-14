import { CIRCLE } from "../main.js";
import { Bitmap } from "./Bitmap.js";
import { Calc } from "./Calc.js";

export class Person {
    constructor(player,map,x,y) {
        this.player = player;
        this.x = x;
        this.y = y;
        this.color = '#cf3c8c',
        this.texture = new Bitmap('img/cowboy.png', 639, 1500),
        this.height = .6,
        this.width = .225,
        this.floorOffset = 0,
        this.map = map;
        this.hitting_the_fence = false;
        this.hitting_the_wall = false;
        this.count = 0;
        this.direction = 1;
        this.speed = .7;
        this.alive = true;
    };

    logic(){
        if(this.alive){
            this.count += 1;

            if (this.count > 270){
                this.direction = this.direction + Calc.getRandomFloat(-(CIRCLE/6),CIRCLE/6);
                this.count = 0;
            }
            //this.turn();
            this.move('img/cowboy');
            this.run();
            this.walk(0.05 * this.speed, this.direction);
        }
    }
    /*turn(){
        let angle = this.direction;
        let url = 'img/cowboy';
        if((angle < CIRCLE/4 && angle > 0) || (angle < CIRCLE && angle >= (CIRCLE - CIRCLE/4))){
            url = 'img/cowboy_r';
        } else if(angle < (CIRCLE - CIRCLE/4) && angle >= CIRCLE/4){
            url = 'img/cowboy_l';
        }
        this.move(url);
    }*/
    move(url){
        if (this.count%10 === 0){
            if (this.count%20 === 0){
                this.texture = new Bitmap(url + '2.png', 639, 1500);
            }
            else this.texture = new Bitmap(url + '.png', 639, 1500);
        }
    }
    run(){
        let x = this.player.x - this.x;
        let y = this.player.y - this.y;
        if(Math.sqrt(x*x+y*y) < 2){
            this.speed = 3;
            this.direction = -this.player.direction;
        } else this.speed = .7;
    }
    /*search(){
        let paper;
        this.map.objects.forEach((item)=>{
    		if(item instanceof Paper) paper = item;
    	});
        let x = this.x - paper.x;
        let y = this.y - paper.y;
        if(Math.sqrt(x*x+y*y) < 10){

        } else
    }*/

    walk(distance, direction) {
        let dx = Math.cos(direction) * distance;
        let dy = Math.sin(direction) * distance;
        let in_the_x_way = this.map.get(this.x + dx, this.y);
        let in_the_y_way = this.map.get(this.x, this.y + dy);

        if (in_the_x_way == 2 || in_the_y_way == 2) {
            this.hitting_the_fence = true;
            this.direction = direction + CIRCLE/6;
            this.walk(distance, this.map, this.direction);
        } else if (in_the_x_way == 1 || in_the_y_way == 1) {
            this.hitting_the_wall = true;
            this.direction = direction + CIRCLE/6;
            this.walk(distance, this.map, this.direction);
        }
        if (in_the_x_way <= 0) this.x += dx;
        if (in_the_y_way <= 0) this.y += dy;
    };

}