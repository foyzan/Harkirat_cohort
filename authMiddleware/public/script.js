

async function signup() {

    const signupUsername = document.querySelector('#signup-username').value 
    const signupPass = document.querySelector('#signup-pass').value
    const data = {
        username: signupUsername,
        pass: signupPass
    }

    try {
        const response = await fetch("http://localhost:3000/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        })



        if (!response.ok) {
            // If the response status is not in the 200-299 range, throw an error
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const result = await response.json();
        console.log('Success:', result);


    }
    catch (error) {
        console.log(error)
    }
}

async function signin() {

    const signupUsername = document.querySelector('#signin-username').value 
    const signupPass = document.querySelector('#signin-pass').value
    const data = {
        username: signupUsername,
        pass: signupPass
    }

    try {
        const response = await fetch("http://localhost:3000/signin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        })



        if (!response.ok) {
            // If the response status is not in the 200-299 range, throw an error
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const result = await response.json();
        localStorage.setItem('token', result.token); // Store the token in localStorage
        console.log('Success:', result);


    }
    catch (error) {
        console.log(error)
    }
}

function getMe() {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    if (!token) {
        console.log('No token found');
        return;
    }

    fetch("http://localhost:3000/me", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token // Include the token in the request headers
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('User data:', data);
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
    });
}

getMe(); // Call this function to fetch user data on page load



function logOut(){
   if( localStorage.getItem('token')){
    localStorage.removeItem('token');
    alert('Logged out successfully'); // Remove the token from localStorage
   }else{
    alert('No user is logged in');
    return;
   }
    
    // Optionally, you can redirect the user to a different page or show a message
}