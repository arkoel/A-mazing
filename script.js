



let strmap = "O2	O2	O2	O2	O2	O2	O2	O2	O2	C5	C5	O2	O2	O2	O2	O2	O2	O2	O2	O2\tO2	C2	D1	C4	C4	C2	C4	C3	C3	C5	C3	O1	O1	O1	O1	R1	C5	C5	C5	O2\tO2	C2	C4	C2	C4	C2	C4	C3	C3	C3	C5	C3	O1	O1	R1	R3	O1	D2	C5	O2\tO2	C2	C4	C2	C4	C2	C4	C3	C3	O1	C3	C3	O1	R1	R3	O1	E9	C3	C5	O2\tO2	C4	C2	C4	C2	C4	C4	C3	O1	C3	C5	C5	R2	R3	O1	O1	B2	O1	C5	O2\tO2	C3	C3	C3	C3	C3	C3	C3	C3	C3	C3	C3	O1	O1	O1	O1	C5	C5	C5	O2\tO2	C3	C3	O1	C3	C3	O1	C3	C3	O1	C3	C3	C3	O1	O1	O1	O1	O1	O1	O2\tO2	C3	C3	C3	C3	C3	C3	C3	C3	C3	C3	C3	C3	C3	O1	O1	O1	O1	C3	O2\tO2	C3	C3	C3	O1	C3	C3	C3	O0	C7	C7	O0	C3	C3	C3	C3	C3	C3	C3	O2\tC5	C5	C3	C3	C3	O1	C3	C3	C7	S0	C0	C7	C3	C3	C3	C3	C3	C5	C5	C5\tC5	C3	C5	C5	C3	C3	C3	C3	C7	C0	C0	C7	C3	C3	O1	O1	C3	C5	D4	C5\tO2	C3	C3	C3	C3	C3	C3	C3	O0	C7	C7	O0	C3	C3	O1	C3	C3	C3	C3	O2\tO2	C3	C3	C3	C3	C3	C3	C3	C3	C3	C3	C3	C3	O1	C3	C3	O1	C3	C3	O2\tO2	C5	C3	C3	C3	C3	C3	C3	C3	C3	C3	C3	C3	C3	C3	O3	O1	O1	C3	O2\tO2	C5	C3	O1	O1	C3	O1	C3	C3	C3	C3	C3	C3	C3	O3	O3	O3	C3	C3	O2\tO2	D5	C3	C3	C3	C3	C3	C3	C3	C3	C3	C3	C3	O3	O3	B0	O3	O3	C3	O2\tO2	C5	C3	O1	C3	C3	O1	C3	C3	C3	C3	C3	C3	C3	O3	E7	O3	C3	C3	O2\tO2	C5	C3	C3	O1	C3	C3	O1	C3	C3	C3	C3	C3	O1	O3	C3	O3	D3	C3	O2\tO2	C5	C5	C5	C5	C5	C5	C5	C5	C5	C5	C5	C5	C5	C5	C5	C5	C5	C5	O2\tO2	O2	O2	O2	O2	O2	O2	O2	O2	C5	C5	O2	O2	O2	O2	O2	O2	O2	O2	O2"
var map = strmap.split("\t")
console.log(map)



let div = document.getElementsByClassName("grid-container");
var ccolors = ["black","purple","blue","green","yellow","orange","red","gray","white"]
var ocolors = ["fake","darkgreen","lightgray","brown"]
for(let y = 0;y<20;y++){
    for(let x=0;x<20;x++){
        let color
        if(map[y*20+x].charAt(0)==="C"){
            color = ccolors[map[y*20+x].charAt(1)]
        }else if(map[y*20+x].charAt(0)==="O"){
            color = ocolors[map[y*20+x].charAt(1)]
        }else if(map[y*20+x].charAt(0)==="R"){
            color = "pink"
        }else if(map[y*20+x].charAt(0)==="E"){
            color = "gold"
        }


        div[0].innerHTML += "<div class='grid-item' id='"+x+"-"+y+"' style='background-color: "+color+"'>"+map[y*20+x]+"</div>"
    }
}
class robot{
    constructor(startpos,dir){
        if(!Array.isArray(dir)){dir=[1,0]}
        this.dir = dir
        //dir is [1 0] [-1 0] [0 1] [0 -1]
        if(!Array.isArray(startpos)){startpos=[0,0]}
        this.starposX = startpos[0]
        this.starposY = startpos[1]
        this.pos = startpos
        this.doel = 0
        this.disppos("start")
        this.maxdoel=0;
        for(let i = 0;i<400;i++){if(map[i].charAt(0)==="D"){this.maxdoel++}}
        console.log("maxdoel: "+this.maxdoel)
        this.bombs = Array();
        this.runcode()
    }
    disppos(txt){
        console.log(txt+"pos ("+this.pos[0]+", "+this.pos[1]+")")
        console.log(txt+"dir ("+this.dir[0]+", "+this.dir[1]+")")
        console.log(this.bombs);

    }

    tilefront(front){
        let fronttile
        if(front===1){fronttile = [this.pos[0]+this.dir[0],this.pos[1]+this.dir[1]];}
        else if(front===-1){fronttile = [this.pos[0]-this.dir[0],this.pos[1]-this.dir[1]];}
        else {fronttile = this.pos;}
        for(let y = 0;y<20;y++){
            for(let x=0;x<20;x++){
                if(fronttile[0] === x && fronttile[1] === y){
                    if(front!==0){console.log(map[y*20+x]);}
                    return map[y*20+x]
                }
            }
        }
    }

    stapVooruit(){
        let front = this.tilefront(1)
        if(front.charAt(0)!=="O"){
            this.pos[0]+=this.dir[0]
            this.pos[1]+=this.dir[1]
            document.getElementById(this.pos[0]+"-"+this.pos[1]).style.backgroundColor = "red"
        }else{
            console.log("WALL")
            let x = this.pos[0]+=this.dir[0]
            let y = this.pos[1]+=this.dir[1]
            map[x+y*20] = front
        }
        this.checktile()
    }

    checktile(){
        let tile = this.tilefront(0)
        switch(tile.charAt(0)){
            case "D":
            if(this.doel+1 === parseInt(tile.charAt(1))){this.doel++;}
            if(this.doel===this.maxdoel){
                console.log("GEWONNEN")
            }
            break
            case "R":
                let num = 0;
                if(parseInt(tile.charAt(1))===0){
                    num = Math.floor(Math.random() * 4);
                }else{num = parseInt(tile.charAt(1))}

            for(let i = 0;i<num;i++){
                if(this.dir[0]===0){
                    if(this.dir[1]===1){this.dir=[-1,0]}
                    else{this.dir=[1,0]}
                }else{
                    if(this.dir[0]===1){this.dir=[0,1]}
                    else{this.dir=[0,-1]}
                }
            }
            console.log("spinning")
            break
            case "B":
                let time = parseInt(tile.charAt(1))
                if(time===0){console.log("GAMEOVER")}
                else{
                    this.bombs[this.bombs.length] = [time,[this.pos[0],this.pos[1]]]
                }
                break
        }



        for(let i = 0;i<this.bombs.length;i++){
            this.bombs[i][0]--
            if(this.bombs[i][0]===0 && this.pos===this.bombs[i][1]){console.log("GAMEOVER")}    
        }
    //    this.disppos("")
    }
    
    stapAchteruit(){
        let front = this.tilefront(-1)
        if(front.charAt(0)!=="O"){
            this.pos[0]-=this.dir[0]
            this.pos[1]-=this.dir[1]
            document.getElementById(this.pos[0]+"-"+this.pos[1]).style.backgroundColor = "red"

        }else{console.log("WALL")}
        this.checktile()
    }

    draaiLinks(){
        if(this.dir[0]===0){
            if(this.dir[1]===1){this.dir=[1,0]}
            else{this.dir=[-1,0]}
        }else{
            if(this.dir[0]===1){this.dir=[0,-1]}
            else{this.dir=[0,1]}
        }
        this.checktile()
    }

    draaiRechts(){
        if(this.dir[0]===0){
            if(this.dir[1]===1){this.dir=[-1,0]}
            else{this.dir=[1,0]}
        }else{
            if(this.dir[0]===1){this.dir=[0,1]}
            else{this.dir=[0,-1]}
        }
        this.checktile()
    }

    getcolor(){
        let tile = this.tilefront(0)
        if(tile.charAt(0)==='C'){
            return tile.charAt(1)
        }else{return 0}
    }

    runcode(){//plaats hier alle code
        // this.stapVooruit()
        // this.stapVooruit()
        // this.draaiLinks()
        // for(let i = 0;i<7;i++){
        //     this.stapVooruit()
        // }
        // this.draaiRechts()
        // for(let i = 0;i<6;i++){
        //     this.stapVooruit()
        // }

        // nummer 1

        // this.draaiLinks()
        // this.draaiLinks()
        // for(let i = 0;i<4;i++){
        //     this.stapVooruit()
        // }
        // this.draaiLinks()
        // for(let i = 0;i<9;i++){
        //     this.stapVooruit()
        // }
        // this.draaiLinks()
        // this.stapVooruit()
        // this.draaiRechts()
        // this.stapVooruit()
        // for(let i = 0;i<9;i++){
        //     this.stapAchteruit()
        // }
        // this.draaiLinks()
        // for(let i = 0;i<4;i++){
        //     this.stapVooruit()
        // }
        // for(let i = 0;i<2;i++){
        //     this.draaiRechts()
        // this.stapVooruit()
        // this.stapVooruit()
        // }
        
        // this.draaiRechts()
        // this.stapVooruit()
        // this.draaiLinks()
        // this.stapVooruit()

        // nummer 2

        // this.stapVooruit()
        // this.draaiLinks()
        // this.stapVooruit()
        // this.stapVooruit()
        // for(let i = 0;i<3;i++){
        //     this.stapAchteruit()
        //     this.stapVooruit()
        // }
        // this.stapAchteruit()
        // this.stapAchteruit()
        // this.draaiRechts()
        // for(let i = 0;i<14;i++){
        //     this.stapVooruit()
        // }
        // this.draaiLinks()
        // for(let i = 0;i<5;i++){
        // this.stapVooruit()
        // }
        // this.draaiLinks()
        // this.stapVooruit()
        // this.stapVooruit()
        // this.stapAchteruit()
        // this.stapAchteruit()
        // this.draaiRechts()
        // this.stapVooruit()
        // this.stapVooruit()
        // this.draaiLinks()
        // this.stapVooruit()

        // //nummer 3
        // this.draaiRechts()
        // this.stapVooruit()
        // this.draaiLinks()
        // for(let i = 0;i<8;i++){
        // this.stapVooruit()
        // }    
        // //nummer 4

        // this.draaiLinks()
        // for(let i = 0;i<11;i++){
        // this.stapVooruit()
        // }
        // this.draaiLinks()
        // for(let i = 0;i<6;i++){
        // this.stapVooruit()
        // }
        // this.draaiRechts()
        // for(let i = 0;i<6;i++){
        //     this.stapVooruit()
        // }
    }

}





var robot1 = new robot([9,9] , [0,-1])