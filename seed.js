const List = require("./models/List")


const list = [
    {
        listitem: "4 litre paani"
    },
    {
        listitem: "English Homework"
    },
    {
        listitem: "spoken class"
    }
]

async function seedDb(){
 await List.insertMany(list)
 console.log("seeded");
}
module.exports=seedDb