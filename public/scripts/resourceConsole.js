const resourceListItems = document.querySelectorAll('.resource-list-item')

const filterResourceList = (target) => {
    const searchTerm = target.value.trim().toLowerCase()
    for (const item of resourceListItems) {
        if (
            item.lastChild.firstChild.firstChild.innerText
                .trim()
                .toLowerCase()
                .includes(searchTerm)
        ) {
            item.classList.remove('resource-not-matched')
        } else {
            item.classList.add('resource-not-matched')
        }
    }
}

const openNewResourceModal = () => {
    const createDialog = document.getElementById('create-edit-dialog')
    createDialog.showModal()
}

export { filterResourceList, openNewResourceModal }
