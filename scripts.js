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
}

function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}

function handleDrop(event) {
    event.preventDefault();
    if (event.target.className === 'fruit' && draggedElement !== event.target) {
        const draggedEmoji = draggedElement.textContent;
        const targetEmoji = event.target.textContent;
        if (draggedEmoji === targetEmoji) {
            event.target.textContent = getNextFruit(draggedEmoji);
            draggedElement.remove();
        }
    }
}

function getNextFruit(fruit) {
    const fruits = ['🍎', '🍊', '🍋', '🍇', '🍉'];
    const currentIndex = fruits.indexOf(fruit);
    return fruits[(currentIndex + 1) % fruits.length];
}
