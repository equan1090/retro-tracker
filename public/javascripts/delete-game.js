
// const allButtons = document.querySelectorAll('.addGameBtn');
// for (let button of allButtons) {
//     button.addEventListener('click', async (event) => {
//         const gameId = event.target.parentElement.parentElement.id;
//         const selectCurrentVal = document.querySelector(`.select-${gameId}`);
//         const collectionId = selectCurrentVal.options[selectCurrentVal.selectedIndex].value;
//         const value = await fetch(`/api/collections/${collectionId}`, { method: 'POST', body: JSON.stringify({ gameId }), headers: { 'Content-Type': 'application/json' } })
//         alert("Game has been added!")
//         console.log(value.body);
//     })
// }

const allButtons = document.querySelectorAll('.removeGame');
if (allButtons) {
    for (let button of allButtons) {
        button.addEventListener('click', async (event) => {
            const gameId = event.target.parentElement.id;
            const collectionId = document.querySelector(".collectionName").id;
            const value = await fetch(`/api/collections/${collectionId}/games`, { method: 'DELETE', body: JSON.stringify({ gameId }), headers: { 'Content-Type': 'application/json' } });
            const row = document.getElementById(gameId);
            row.remove();
            alert("Game has been deleted!");
        })
    }
}
