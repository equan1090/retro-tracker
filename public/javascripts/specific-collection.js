
// const reviewDelete = document.querySelector(".reviewDelete")
// reviewDelete.addEventListener("click", async (event) => {
//     await fetch(`/api/reviews/${event.target.id}`, {method: 'DELETE'});
//     event.target.parentElement.parentElement.remove()
// })


const allButtons = document.querySelectorAll('.addGameBtn');
for (let button of allButtons) {
    button.addEventListener('click', async (event) => {
        const gameId = event.target.parentElement.parentElement.id;
        const selectCurrentVal = document.querySelector(`.select-${gameId}`);
        const collectionId = selectCurrentVal.options[selectCurrentVal.selectedIndex].value;
        const value = await fetch(`/api/collections/${collectionId}`, {method:'POST', body: JSON.stringify({gameId}), headers: {'Content-Type': 'application/json'}})
        alert("Game has been added!")
        console.log(value.body);
    })
}
