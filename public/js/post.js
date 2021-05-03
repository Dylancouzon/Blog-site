newPost = async () => {

    const text = $("#postTxt").val();
    const title = $("#postTitle").val();
    if (text && title) {
        const response = await fetch('/api/user/newpost', {
            method: 'POST',
            body: JSON.stringify({ title, text }),
            headers: { 'Content-Type': 'application/json' },
        });
        const res = await response.json();
        if (response.ok) {
            document.location.replace('/api/user');

        }
    } else {
        $("#postErr").html("Please enter a Title and some content.");
    }
}


$("#newPost").click(function (event) {
    event.preventDefault();
    newPost()
});
