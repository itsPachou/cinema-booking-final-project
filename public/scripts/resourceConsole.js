import { showAlert } from './alerts.js'
import { getResource, deleteResource, getRoom } from './backEndConnections.js'

const resourceListItems = document.querySelectorAll('.resource-list-item')

const rowChars = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
]

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

const clearResourceForm = () => {
    const allInputs = document.querySelectorAll('.form-input')
    allInputs.forEach((inputEl) => {
        if (inputEl.tagName === 'SELECT') {
            document.querySelector('option[value=""]').selected = true
        } else if (inputEl.type === 'number' && inputEl.min) {
            inputEl.value = inputEl.min
        } else {
            inputEl.value = ''
        }
    })
}

const openNewResourceModal = () => {
    clearResourceForm()
    const createDialog = document.getElementById('create-edit-dialog')
    createDialog.showModal()
}

const openEditResourceModal = async (itemId, resource) => {
    try {
        clearResourceForm()
        const resourceData = await getResource(itemId, resource)
        delete resourceData._id
        delete resourceData.__v
        delete resourceData.bookedSeats
        delete resourceData.id
        delete resourceData.slug
        const editDialog = document.getElementById('create-edit-dialog')
        const resourceFormItemID = document.querySelector('.resource-form-id')
        resourceFormItemID.innerText = `ID: ${itemId}`
        console.log(resourceData)
        if (resourceData.dimensions) {
            for (const prop in resourceData.dimensions) {
                const formInput = document.getElementById(
                    `${resource}-dimensions-${prop}`
                )
                formInput.value = resourceData.dimensions[prop]
            }
            delete resourceData.dimensions
        }
        for (const prop in resourceData) {
            console.log(prop)
            const formInput = document.getElementById(`${resource}-${prop}`)
            if (prop === 'seatPositions') {
                populateRoomLayoutAdmin(itemId, formInput)
            } else if (formInput.tagName === 'SELECT') {
                document.querySelector(
                    `option[value="${resourceData[prop]}"]`
                ).selected = true
            } else if (formInput.type === 'date') {
                const dateObj = new Date(resourceData['releaseDate'])
                formInput.value = resourceData[prop].substring(
                    0,
                    dateObj.toISOString().indexOf('T')
                )
            } else if (formInput.type === 'datetime-local') {
                const dateObj = new Date(resourceData['date'])
                const tzoffset = new Date().getTimezoneOffset() * 60000 //offset in milliseconds
                const localISOTime = new Date(dateObj - tzoffset)
                    .toISOString()
                    .slice(0, -1)
                formInput.value = localISOTime
            } else {
                formInput.value = !Array.isArray(resourceData[prop])
                    ? resourceData[prop]
                    : resourceData[prop].join(', ')
            }
        }
        editDialog.showModal()
    } catch (error) {
        showAlert('error', error.message)
    }
}

const handleDeleteResource = async (itemId, resource) => {
    try {
        if (
            window.confirm(
                `Are you sure you want to delete this ${resource.substring(
                    0,
                    resource.length - 1
                )}?`
            )
        ) {
            await deleteResource(itemId, resource)
            showAlert('success', 'Successfully deleted resource.')
            window.setTimeout(() => {
                location.reload()
            }, 1500)
        }
    } catch (error) {
        showAlert('error', error.message)
    }
}

const selectSeatAdmin = (target) => {
    target.classList.toggle('seat')
}

const populateRoomLayoutAdmin = async (roomId, seatSelectionDiv) => {
    let room
    if (roomId) {
        room = await getRoom(roomId)
    } else {
        room = {
            dimensions: {
                length:
                    document.getElementById('rooms-dimensions-length').value *
                    1,
                width:
                    document.getElementById('rooms-dimensions-width').value * 1,
            },
        }
    }
    if (document.querySelector('.row-char-column'))
        document.querySelector('.row-char-column').remove()
    while (seatSelectionDiv.firstChild) {
        seatSelectionDiv.removeChild(seatSelectionDiv.firstChild)
    }
    const rowNameColumn = document.createElement('div')
    rowNameColumn.classList.add('row-char-column')
    for (let r = 0; r < room.dimensions.length; r++) {
        const rowDiv = document.createElement('div')
        rowDiv.classList.add('seats-row')
        const rowName = document.createElement('div')
        rowName.innerText = rowChars.at(r)
        rowNameColumn.appendChild(rowName)
        for (let c = 0; c < room.dimensions.width; c++) {
            const seatPos = document.createElement('div')
            seatPos.classList.add('seat-position', 'seat-outline')
            seatPos.addEventListener('click', (e) => {
                selectSeatAdmin(e.target)
            })
            seatPos.dataset.col = c
            seatPos.dataset.row = r
            rowDiv.appendChild(seatPos)
        }
        seatSelectionDiv.appendChild(rowDiv)
    }
    seatSelectionDiv.insertAdjacentElement('beforebegin', rowNameColumn)
    if (roomId) {
        console.log('i have a room id')
        room.seatPositions.forEach((pos) => {
            const seatEl = document.querySelector(
                `[data-row="${pos.row}"][data-col="${pos.col}"]`
            )
            seatEl.classList.add('seat')
        })
    } else {
        console.log('i dont have a room id')

        const allSeatPos = document.querySelectorAll('.seat-position')
        allSeatPos.forEach((pos) => {
            pos.classList.add('seat')
        })
    }
}

export {
    filterResourceList,
    openNewResourceModal,
    openEditResourceModal,
    handleDeleteResource,
    populateRoomLayoutAdmin,
}
