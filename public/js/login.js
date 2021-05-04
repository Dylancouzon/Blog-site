//Login API Call
login = async () => {

    const username = $("#username").val();
    const password = $("#password").val();
    if (username && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        const res = await response.json();
        if (response.ok) {
            document.location.replace('/dashboard');

        } else {
            $("#loginTxt").html(res.message);

        }
    } else {
        $("#loginTxt").html(res.message);
    }
}

//Sign Up API call
signup = async () => {

    const username = $("#username").val();
    const password = $("#password").val();

    if (username && password) {
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            $("#loginTxt").html(res.message);

        }
    } else {
        $("#loginTxt").html(res.message);
    }
}

$("#login").click(function (event) {
    event.preventDefault();
    login()
});

$("#signup").click(function (event) {
    event.preventDefault();
    signup()
});

// Auto Log out after 10min
setTimeout(function(){ $("#loginTxt").html("Auto Log-out in 1min."); }, 540000);
setTimeout(function(){ document.location.replace('/logout'); }, 600000);