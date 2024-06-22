// Create connection
const { createClient } = supabase;
const supabase_url = "https://kqdawhewimlyakfhzzso.supabase.co";
const supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxZGF3aGV3aW1seWFrZmh6enNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNjQxNzAsImV4cCI6MjAyODc0MDE3MH0.wPzVjebaiUroccRtWKPgGLeGJ0l-00e2ajH3L7T74is";
const connection = createClient(supabase_url, supabase_key);

// Login function
async function get() {
    const Email = document.getElementById('Email').value;
    const Password = document.getElementById('Password').value;
    const { data, error } = await connection.from('users_t').select('*').eq('email', Email).eq('password', Password);

    if (data.length > 0) {
        let user = data[0];
        console.log("User ID from database:", user.userid); // Debugging line

        localStorage.setItem("ID", user.userid);
        console.log("Stored User ID in localStorage:", localStorage.getItem("ID")); // Debugging line

        alert('success');
        location.href = "plstr.html";
    } else {
        alert('skibidi sigma');
    }
}

// Add user function
async function signup() {
    var name = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
    var purok = document.getElementById('purok').value;
    var address = document.getElementById('address').value;
    var contact = document.getElementById('contact').value;

    const { data, error } = await connection.from('users_t').select('email').eq('email', email);
    console.log(name);
    if (data.length > 0) {
        alert('existing');
        console.log(data,error);
    } else {
        const { data: ACCdata, error: ACCerror } = await connection.from('users_t').insert({
            name: name,
            password: password,
            email: email,
            address: address,
            purokassignment: purok,
            contact: contact
        });

        if (ACCerror) {
            console.error('Error inserting data:', ACCerror);
            alert('Error signing up. Please try again.');
        } else {
            console.log('Inserted data:', ACCdata);
            alert('Signup successful. Please login.');
        }
    }
}

// Load function
    document.addEventListener('DOMContentLoaded', (event) => {
        let userID = localStorage.getItem("ID");
        console.log("Retrieved User ID from localStorage:", userID); // Debugging line

        if (userID === null) {
            console.error("User ID not found in localStorage.");
        } else {
            console.log("User ID:", userID);
        }
    });

// Logout function
function logout() {
    localStorage.clear();
    location.href = "index.html";
}

// ADD ITEM FUNCTION

async function addItem(){

    var Item_name =document.getElementById('item-name').value;
    var Price = document.getElementById('price').value;
    var Type =  document.querySelector('input[name="itemType"]:checked').value;
    console.log("Item Name:", Item_name);
    console.log("Price:", Price);
    console.log("Type:", Type);
    var itemCost = parseFloat(Price);
    const { data:dataitem, error:erritem } = await connection.from('item_t').insert({
        item_name:Item_name, 
        category:Type,
        item_cost:itemCost
        });
    
    if(erritem){
        console.log('failed');
        console.log(erritem);
    } else{
        console.log('added');
    }
        
}

async function addB(){

    var Bname =document.getElementById('Bname').value;
    var contact = document.getElementById('contact').value;
    var Baddress =  document.getElementById('Baddress').value;
    console.log( Bname);
    console.log(contact);
    console.log(Baddress);
    
    const { data:datab, error:errb } = await connection.from('borrower_t').insert({
        name:Bname, 
        contact:contact,
        address:Baddress
        });

        
       
    if(errb){
        console.log('failed');
        console.log(errb);
    } else{
        console.log('added');
    }
        
}

async function getbinfo(){

    
    let { data: borrowinfo, error } = await connection
    .from('borrowinfo_t')
    .select(`borrowid,borrower_t (name), item_t(item_name)`).eq('borrowerid',1);
     
    if(error){
        console.log('fail');
    }else{
        console.log(borrowinfo[0].borrower_t.name);
        console.log(borrowinfo[0].item_t.item_name);
    }
}