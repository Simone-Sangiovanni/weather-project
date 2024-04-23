function select(id) {
    let oldSelected = document.getElementsByClassName('selected');
    oldSelected[0].setAttribute('onclick', 'select(this.id)');
    oldSelected[0].children[1].children[1].classList.add('hidden');
    oldSelected[0].classList.remove("selected");

    let newSelected = document.getElementById(id);
    newSelected.classList.add("selected");
    newSelected.children[1].children[1].classList.remove('hidden');

    let oldActiveTable = document.getElementsByClassName('activeTable')
    oldActiveTable[0].classList.add('hidden');
    oldActiveTable[0].classList.remove('activeTable');

    let newActiveTable = document.getElementById(`table${id}`);
    newActiveTable.classList.add('activeTable');
    newActiveTable.classList.remove('hidden');
}