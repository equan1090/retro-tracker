


const allButtons = document.querySelectorAll('#addGameBtn');
for (let button of allButtons) {
    button.addEventListener('click', async (event) => {
        const gameId = event.target.parentElement.parentElement.id;
        console.log(gameId)
        const selectCurrentVal = document.querySelector(`.select-${gameId}`);
        const collectionId = selectCurrentVal.options[selectCurrentVal.selectedIndex].value;
        const value = await fetch(`/api/collections/${collectionId}`, {method:'POST', body: JSON.stringify({gameId}), headers: {'Content-Type': 'application/json'}})
        alert("Game has been added!")
        console.log(value.body);
    })
}
