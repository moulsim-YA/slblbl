export default class Storage{
    winning_patterns = [
        [1, 2, 3],
        [1, 5, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 5, 7],
        [3, 6, 9],
        [4, 5, 6],
        [7, 8, 9],
    ]
    played = [0,0,0,0,0,0,0,0,0];
    save_moves(key,player){
        window.localStorage.setItem(key,player);
    }
    retrieve_moves(key){
        const item = window.localStorage.getItem(String(key));
        return item;
    }
    check_winner(parse,pressed){
        console.log(pressed);
        const len = this.winning_patterns.length;
        var key =[];
        let count = 0;
        for(let k =0 ;k<localStorage.length;k++){
            key[k] = localStorage.key(k);
        }
        for(let i=0;i<len;i++){
            var record = [0,0]
            if (parse === true){
                for(let j = 0; j<3;j++){
                    for(let item in key){
                        if(key[item] == this.winning_patterns[i][j]){
                            if(window.localStorage.getItem(String(key[item])) ==="x"){
                                record[0] += 1;
                            }
                            if(window.localStorage.getItem(String(key[item])) ==="o"){
                                record[1] += 1;
                            } 
                            
                            if(record[0] === 3){
                                record = [0,0];
                                parse = false
                                return "x won!";
                            }
                            if(record[1] === 3){
                                record = [0,0];
                                parse = false
                                return "o won!";
                            }
                            
                        }
                    }
                }
            }
        
            
            
        }
        if(record[0] !== 3 && record[1] !== 3){
            for(let i= 0; i<9;i++){
                if(pressed[i] === 1){
                    count += 1;
                }
            }
            if(count === 9){
                return "Tie";
            }
            
        }
    }
}
