export const winner = ({ player, ai }: { player: string; ai: string }) => {
    if((player=="Stone"&&ai=="Scissor")||(player=="Paper"&&ai=="Stone")||(player=="Scissor"&&ai=="Paper")){
        return "Player";
    }else{
        return "AI";
    }
};
