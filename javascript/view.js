export default class View{
    $ = {};
    $$ = {};
    count = 0;
    constructor(){
        this.$.menu = document.querySelector('[data-id=menu]');
        this.$.turns = document.querySelector('[data-id=turns]');
        this.$.options = document.querySelector('[data-id=options]');
        this.$.menu_btn= document.querySelector('[data-id=menu-btn]');
        this.$.options_menu= document.querySelector('[data-id=options-menu]');
        this.$.reset_button = document.querySelector('[data-id=reset-btn]');
        this.$.new_game = document.querySelector('[data-id=new-game]');
        this.$.grid = document.querySelector('[data-id=grid]');
        this.$$.squares = document.querySelectorAll('[data-id=squares]');
        this.$.p1_wins = document.querySelector('[data-id=p1-wins]');
        this.$.tie = document.querySelector('[data-id=tie]');
        this.$.p2_wins= document.querySelector('[data-id=p2-wins]');
        this.$.pop_up= document.querySelector('[data-id=winner-window]');
        this.$.play_again = document.querySelector('[data-id=play-again]');


        this.$.menu_btn.addEventListener("click",(event) => {
            this.#toggleMenu();
        });
        
    }
    load(player1,player2,pressed,scores){
        let item;
        let move_number = 1;
        this.updateScores(scores[0],scores[1],scores[2]);
        this.$$.squares.forEach((square) => {
            item = window.localStorage.getItem(String(square.id));
            if(item === "x"){
                this.handleplayermove(square,player1);
                this.setTurnindicator(player2,"It's your turn!");
                move_number += 1;
                pressed[square.id-1] = 1;
            }
            else if(item === "o"){
                this.handleplayermove(square,player2);
                this.setTurnindicator(player1,"It's your turn!");
                move_number += 1;
                pressed[square.id-1] = 1;
            }
        })
        return [move_number,pressed];
    }
    
    resetbnt(handler){
        this.$.reset_button.addEventListener("click",handler);
    }
    newbtn(handler){
        this.$.new_game.addEventListener("click",handler);
    }
    playAgain(handler){
        this.$.play_again.addEventListener("click",handler);
    }
    PlayerMoveEventListener(handler){
        this.$$.squares.forEach((square) => {
            square.addEventListener("click",handler);
        })

    }
    #toggleMenu(){
        this.$.options_menu.classList.toggle("hidden");
        this.$.options.classList.toggle("border");
        this.$.menu_btn.querySelector("i").classList.toggle("fa-chevron-down");
        this.$.menu_btn.querySelector("i").classList.toggle("fa-chevron-up")
    }
    closeMenu(){
        this.$.options_menu.classList.add("hidden");
        this.$.options.classList.add("border");
        this.$.menu_btn.querySelector("i").classList.add("fa-chevron-down");
        this.$.menu_btn.querySelector("i").classList.remove("fa-chevron-up");
    }
    handleplayermove(square,player){    
        const icon = document.createElement("i");
        icon.classList.add("fa-solid", player.iconClass, player.colorClass);
        square.replaceChildren(icon);
        
        
        
    }
    setTurnindicator(player,text){
        const icon = document.createElement("i");
        const label = document.createElement("p");
        icon.classList.add("fa-solid",player.colorClass,player.iconClass);
        label.classList.add(player.colorClass);
        label.innerText = `${text}`;
        this.$.turns.replaceChildren(icon,label);
    }
    initializeMoves(target,player,otherplayer,text){
  
        this.handleplayermove(target,player);
        this.setTurnindicator(otherplayer,text);
            
        
    }
    clearMoves(){
        this.$$.squares.forEach(function(element){
            element.replaceChildren();
        });
    }
    openModal(message){
        this.$.pop_up.classList.remove("hidden");
        this.$.pop_up.querySelector("p").innerText = message;
    }
    closeModal(){
        this.$.pop_up.classList.add("hidden");
    }
    closeall(){
        this.closeMenu();
        this.closeModal();
        this.clearMoves();
    }
    updateScores(p1wins,tie,p2wins){
        this.$.p1_wins.innerText = `${p1wins} wins`;
        this.$.tie.innerText = `${tie} ties`;
        this.$.p2_wins.innerText = `${p2wins} wins`;
    }

}
