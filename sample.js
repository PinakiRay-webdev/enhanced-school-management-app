const marks = {
    0 : {
        mark : '12',
        term : 'term 1'
    } , 
    1 : {
        mark : '56',
        term : 'term 2'
    }
}

let sum = 0;

for(let i in marks){
    sum += parseInt(marks[i].mark)    
}

console.log(marks.length());


