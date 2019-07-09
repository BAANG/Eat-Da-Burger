$(function(){
    $(".change-status").on("click", function(event) {
        var id = $(this).data("id");
        var newIsGood = $(this).data("newisgood");
        console.log(newIsGood, " is newIsGood")

        var updateStatus = {
            isGoodBoy: newIsGood
        };

        $.ajax("/api/dogs/" + id, {
            type: "PUT",
            data: updateStatus
        }).then(
            function() {
                console.log("changed isGoodBoy to", newIsGood);

                location.reload();
            }
        )
    })
});

$(".create-form").on("submit", function(event) {
    event.preventDefault();

    var newDog = {
        name: $("#dog").val().trim(),
        isGoodBoy: $("[name=isGoodBoy]:checked").val().trim()
    };

    $.ajax("/api/dogs/", {
        type: "POST",
        data: newDog
    }).then(
        function() {
            console.log("Created a new dog");
            location.reload();
        }
    )
})

$(document).on("click", ".delete-dog", function() {
    var id = $(this).data("id")

    var queryUrl = "/api/dogs/" + id;
    console.log(queryUrl);

    $.ajax(
        queryUrl,
        {
            type: "DELETE",
        }
    ).then(
        function() {
            console.log("deleted a dog");
            location.reload();
        }
    )
})