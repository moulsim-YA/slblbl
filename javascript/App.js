import View from "./view.js";
import Storage from "./store.js";
let count = 1;
let results = [0,0,0]
let pressed = [0,0,0,0,0,0,0,0,0]

let player1 = {
    id :"x",
    colorClass:"blue",
    iconClass:"fa-x"
}
let player2 =  {
    id : "o",
    colorClass:"red",
    iconClass:"fa-o"
}
let end = {
    colorClass:"lightblue",
    iconClass :"fa-gamepad"
}
let current_player = player1;
let next_player = player2;
let stop = false;


function init(){
    const view = new View();
    const store = new Storage();
    window.localStorage.setItem("results",JSON.stringify(results));
    let scores = JSON.parse(localStorage.getItem("results"));
    let load =  view.load(player1,player2,pressed,scores);
    let parse = true;
    count = load[0];
    pressed = load[1];
    view.resetbnt(event => {
        view.clearMoves();
        view.closeMenu();
        view.updateScores(0,0,0);
        view.setTurnindicator(player1,"It's your turn!");
        count = 1;
        localStorage.clear();
        pressed = [0,0,0,0,0,0,0,0,0];
        results = [0,0,0];
        parse = true;
   
        
    })
    view.newbtn(event => {
        view.clearMoves();
        view.closeMenu();
        view.updateScores(scores[0],scores[1],scores[2]);
        view.setTurnindicator(player1,"It's your turn!");
        count = 1;
        for(let i=localStorage.length-1;i>=0;i--){
            if(localStorage.key(i) !== "results"){
                localStorage.removeItem(localStorage.key(i))
            }
        }
        pressed = [0,0,0,0,0,0,0,0,0];
        parse = true;
        
        
    })
    
    view.PlayerMoveEventListener(event => {
        let winner;
        if(stop === false){
            if(pressed[event.target.id-1] === 0){
                pressed[event.target.id-1] = 1;
                console.log(pressed);
                if(count%2 !== 1){
                    current_player = player2;
                    next_player = player1;
                }
                else{
                    current_player = player1;
                    next_player = player2;
                }
                if(count < 9){
                    count += 1;
                    view.initializeMoves(event.target,current_player,next_player,"It's your turn!");
                    store.save_moves(String(event.target.id),current_player.id);    
                }
            
                else if(count === 9){
                    view.updateScores(results[0],results[1],results[2]);
                    view.initializeMoves(event.target,current_player,end,"Game Over!");
                }

        }
            winner = store.check_winner(parse,pressed);
            if (winner){
                stop = true;
                if(winner === "x"){
                    results[0] += 1
                }
                else if(winner === "o"){
                    results[2] += 1
                }
                window.localStorage.setItem("results",JSON.stringify(results));
                view.updateScores(results[0],results[1],results[2]);
                parse = false;
                view.openModal(`${winner}`);
                view.playAgain((event) => {
                    for(let i=localStorage.length-1;i>=0;i--){
                        if(localStorage.key(i) !== "results"){
                            localStorage.removeItem(localStorage.key(i))
                        }
                    }
                    view.closeall();
                    count = 1;
                    view.setTurnindicator(player1,"It's your turn!");
                    pressed = [0,0,0,0,0,0,0,0,0];
                    parse = true;
                    stop = false;

                })
                winner = undefined
            }
        }
    })
   

}
window.addEventListener("load",init());