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
