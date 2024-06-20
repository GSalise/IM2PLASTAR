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

// Call load function on page loa