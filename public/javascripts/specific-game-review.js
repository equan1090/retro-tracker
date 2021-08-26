
const reviewDelete = document.querySelector(".reviewDelete")
reviewDelete.addEventListener("click", async (event) => {
    await fetch(`/api/reviews/${event.target.id}`, {method: 'DELETE'});
    event.target.parentElement.parentElement.remove()
})
