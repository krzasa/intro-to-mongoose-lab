const prompt = require('prompt-sync')();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const customerDB = require('./models/customerDB.js');

// const username = prompt('What is your name? ');
let question = ""
let newName = ""
let newAge = ""
let newName2 = ""
let newAge2 = ""
let id = ''
let id2 = ''


const promp = async () => {
    console.log('What would you like to do?');
    console.log(' 1. Create a customer');
    console.log(' 2. View all customers');
    console.log(' 3. Update a customer');
    console.log(' 4. Delete a customer');
    console.log(' 5. quit');
    
}

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    while (true) {
        promp();
        question = prompt('Insert Number of action to run: ');
        switch (question) {
            case "1":
                newName = prompt('What is the customers name?');
                newAge = prompt('How old is the customer?');
                await createCust()
            case "2":
                await allCust()
                break;
            case "3":
                console.log("Below is a list of customers");
                let list = await customerDB.find({})
                list.forEach(element => {
                    console.log("Id: "+element._id+' -- Name: '+element.Name+' Age: '+element.Age);
            
                });
                id = prompt('Copy and paste the id of the customer you would like to update here: ')
                newName2 = prompt('What is the customers new name?')
                newAge2 = parseInt(Math.floor(prompt('What is the customers new age?')))
                await updateCust()
                break;
            case "4":
                id2  = prompt('Copy and paste the id of the customer you would like to delete here: ')
                await deleteCust()
                break;
            case "5":
                console.log("Exiting, thanks for stopping by! ");
                await mongoose.disconnect();
                process.exit();
            default:
                console.log("Invalid choice. Please try again.");
        }
        
    }
    
};

const createCust = async () =>{
    const custData ={
        Name: newName,
        Age: newAge,
      }
    const cust = await customerDB.create(custData)
    console.log("New customer", cust);
}
const allCust = async () => {
    const cust = await customerDB.find({})
    console.log("All customers:", cust);
}
const updateCust = async () => {
    
    const cust = await customerDB.findByIdAndUpdate(id, {Name: newName2}, {new: newName2})    //(id, {the prop we want to change}, new values after update ) = 'objectID'
    const cust2 = await customerDB.findByIdAndUpdate(id, {Age: newAge2}, {new: true}) 
    // console.log('The updated customer:', cust);

}
const deleteCust = async () => {
    const cust2 = await customerDB.findByIdAndDelete(id2)    //(id) = 'objectID'
    console.log('The deleted customer:', cust2);

}





  connect()


// console.log(`Your name is ${username}`);



// await mongoose.disconnect();
    