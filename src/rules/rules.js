
function valeurCase(data, width, index){
    //const index = (y*width + x);
    const N = Number(width);
    const offsets =[-N-1, -N, -N+1,
    -1 , +1,
    N-1, N, N+1]

    const somme = offsets.reduce( (a,b) => {
        if (index+b >=0 && index+b < data.length)
            return a + data[index+b];
        else 
            return a; }
        ,0);
        
    return somme;
}

export function tour(data, width, min, max){
    let newData = data.map( (valeur, index)=> {
        const val = valeurCase(data, width, index)
        return (val<=max && val>=min)?1:0;
    });

    return newData;
} 

export default tour;