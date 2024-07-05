document.addEventListener('DOMContentLoaded', (event) => {
    const fruits = document.querySelectorAll('.fruit');

    fruits.forEach(fruit => {
        fruit.addEventListener('dragstart', handleDragStart);
        fruit.addEventListener('dragover', handleDragOver);
        fruit.addEventListener('drop', handleDrop);
    });
});

let draggedElement = null;

function handleDragStart(event) {
    draggedElement = event.target;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', event.target.dataset.fruit);
}

function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}

function handleDrop(event) {
    event.preventDefault();
    const draggedFruit = event.dataTransfer.getData('text/plain');
    const targetFruit = event.target.dataset.fruit;

    if (draggedElement !== event.target && draggedFruit === targetFruit) {
        event.target.textContent = getNextFruit(draggedFruit);
        event.target.dataset.fruit = getNextFruit(draggedFruit);
        draggedElement.remove();
    }
}

function getNextFruit(fruit) {
    const fruits = ['🍎', '🍊', '🍋', '🍇', '🍉'];
    const currentIndex = fruits.indexOf(fruit);
    return fruits[(currentIndex + 1) % fruits.length];
}
