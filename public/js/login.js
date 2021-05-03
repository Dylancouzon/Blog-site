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
            document.location.replace('/api/user');

        } else {
            $("#loginTxt").html(res.message);

        }
    } else {
        $("#loginTxt").html(res.message);
    }
}

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
            document.location.replace('/user');
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
