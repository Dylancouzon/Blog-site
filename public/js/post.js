newPost = async () => {
    console.log('test');
    const text = $("#postTxt").val();
    const title = $("#postTitle").val();
    if (text && title) {
        const response = await fetch('/api/user/newpost', {
            method: 'POST',
            body: JSON.stringify({ title, text }),
            headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
            document.location.replace('/api/user');

        }
    } else {
        $("#postErr").html("Please enter a Title and some content.");
    }
}

newComment = async () => {

    const text = $("#commentTxt").val();
    const post_id = $("#postId").val();
    if (text) {
        const response = await fetch('/api/user/newcomment', {
            method: 'POST',
            body: JSON.stringify({ text, post_id }),
            headers: { 'Content-Type': 'application/json' },
        });
        let res = await response.json();
        if (response.ok) {
            document.location.replace('/comment/'+ res.post_id);

        }
    } else {
        $("#commentErr").html("Please write a comment.");
    }
}

$("#newPost").click(function (event) {
    event.preventDefault();
    newPost()
});

$("#newComment").click(function (event) {
    event.preventDefault();
    newComment()
});
