//Create a post API call
newPost = async () => {
    const id = $("#editId").val();
    const text = $("#postTxt").val();
    const title = $("#postTitle").val();
    if (!id) {
        if (text && title) {
            const response = await fetch('/api/user/newpost', {
                method: 'POST',
                body: JSON.stringify({ title, text }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard');

            }
        } else {
            $("#postErr").html("Please enter a Title and some content.");
        }
    }else{
        if (text && title) {
            const response = await fetch('/edit', {
                method: 'PUT',
                body: JSON.stringify({ id, title, text }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard');

            }
        } else {
            $("#postErr").html("Please enter a Title and some content.");
        }
    }
}

//Create a comment API call
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
            document.location.replace('/comment/' + res.post_id);

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

//Edit a post function
function edit(post) {
    let edit = post.split('~');
    $("#title").html("Edit an Article");
    $("#postTxt").html(edit[2]);
    $("#postTitle").val(edit[1]);
    $("#newPost").html("Edit");
    $("#postForm").append(`<input type="hidden" id="editId" name="editId" value=${edit[0]}>`)
}