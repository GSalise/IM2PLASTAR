
// create connection
const{createClient} = supabase;
        const supabase_url = "https://kqdawhewimlyakfhzzso.supabase.co"
        const supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxZGF3aGV3aW1seWFrZmh6enNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNjQxNzAsImV4cCI6MjAyODc0MDE3MH0.wPzVjebaiUroccRtWKPgGLeGJ0l-00e2ajH3L7T74is"
        const connection = createClient(supabase_url, supabase_key)
        


        //login funct()
        async function get() {
            const Email = document.getElementById('Email').value;
            const Password = document.getElementById('Password').value;
            const { data, error } = await connection.from('users_t').select('*').eq('email', Email).eq('password', Password);

            if (data.length > 0) {
                let user = data[0];
                console.log("User ID from database:", user.userid); // Debugging line

                localStorage.setItem("ID", user.userid);
                console.log(localStorage.getItem("ID")); // Debugging line

                alert('success');
                location.href = "plstr.html";
            } else {
                alert('skibidi sigma');
            }
        }
    
        ///add usr()
        async function signup(){
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            var email = document.getElementById('email').value;
            var purok = document.getElementById('purok').value;
            var address = document.getElementById('address').value;
            var contact = document.getElementById('contact').value;
            
            const { data, error } = await connection.from('contact').select('email').eq('email', email);
            console.log(username);
            if (data.length > 0) {
                alert('existing')
            }else{
                const {data: ACCdata, error: ACCerror} = await connection.from('login').insert({
                username:username,
                password:password,
                email:email,
                address:address,
                purok:purok,
                contact:contact
                })
            }
            }
           
            function load(){
                ('DOMContentLoaded', (event) => {
                    let userID = localStorage.getItem("ID");
                    console.log(userID);
                });
            }

        function logout(){
            localStorage.clear;
            location.href ="index.html"
                }



