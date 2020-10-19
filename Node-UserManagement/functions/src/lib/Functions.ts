exports.getSubstrings = async(s:any) => {
    //if string passed is null or undefined or empty string
    if(!s)   return []; 

    const substrings:any[] = [];

    for(let length = 1 ; length <= s.length; length++){
        for(let  i = 0 ; (i + length) <= s.length ; i++){
            substrings.push(s.substr(i, length));
        }
    }
    // var sub:string[]= substrings.filter(function(value:any){ return value !== " ";})
    
    // console.log(typeof substrings,substrings,"functions")
    
    return substrings;
}
