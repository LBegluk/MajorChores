var db = require("../Model/chores-db.js");
var a = require("../mongodb.js");

var getAllMembers = function() {
    return new Promise(resolve => {// resolve => means function(resolve)
        a.FindinUser(function(items){
            console.log("In callback get AllMembers");
            console.log(items);
            resolve(items);
        });
    }) 
}

var getAllChores = function() {
    return new Promise((resolve, rejection) => {
        if (!resolve) {
            rejection('Did not connect to database');
          }
        
        a.GetChores(function(items){
            console.log("In callback get AllChores");
            console.log(items);
            resolve(items);
        })

    })
}

var shuffleChores = function(arr,size) {
    sortArr = [];
    for(i in arr)
        {
            var c = Math.floor((Math.random() * (size+1)));
            var temp = arr[c];
            arr[c]= arr[(c+1)%size];
            arr[(c+1)%size]= temp;
        }
    for(i in arr)
        {
            sortArr.push(arr[i]);
        }
    return sortArr;
}

var assigneChoresToMember = async function(){ // this is a async function
    var chores = await getAllChores();
    var member = await getAllMembers();

    console.log("My members:" + member);
    console.log("My chores:" + chores);
    
    var choresTable = [];
    var n = chores.length-1;

    chores = shuffleChores(chores,n);

    for(j in member){
        choresTable[j] = [];
        choresTable[j].push(member[j]);
    }

    var k =0;
    while(k < chores.length)
    {  
        var leastChores = choresTable[0].length;
        var index = Math.floor(Math.random()*(member.length-1));
        for(j in member){
            var c = choresTable[j].length;
            if(c<leastChores){
                leastChores=c;    
                index = j;
            }  
        }
        choresTable[index].push(chores[k]);
        k=k+1;
    }

    for(i in choresTable){
      //  console.log(choresTable[i]);
    }
    console.log(choresTable);
    return choresTable;
}

module.exports = {
    assigneChoresToMember,
    getAllChores,
    getAllMembers
}



