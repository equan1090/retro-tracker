document.getElementById('reviews-link').remove()

const reviewDelete = document.querySelectorAll(".reviewDelete")
for (let button of reviewDelete) {
    button.addEventListener("click", async (event) => {
        await fetch(`/api/reviews/${event.target.id}`, {method: 'DELETE'});
        event.target.parentElement.parentElement.remove()
    })
}
