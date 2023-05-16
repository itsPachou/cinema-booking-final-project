import { showAlert } from './alerts.js'
import { getResource, deleteResource } from './backEndConnections.js'

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

const openEditResourceModal = async (itemId, resource) => {
    try {
        const resourceData = await getResource(itemId, resource)
        delete resourceData._id
        delete resourceData.__v
        if (resourceData.slug) delete resourceData.slug
        console.log(resourceData)
        const editDialog = document.getElementById('create-edit-dialog')
        const resourceFormItemID = document.querySelector('.resource-form-id')
        resourceFormItemID.innerText = `ID: ${itemId}`
        for (const prop in resourceData) {
            const formInput = document.getElementById(`${resource}-${prop}`)
            if (formInput.tagName === 'SELECT') {
                document.querySelector(
                    `option[value="${resourceData[prop]}"]`
                ).selected = true
            } else if (formInput.type === 'date') {
                const dateObj = new Date(resourceData['releaseDate'])
                formInput.value = resourceData[prop].substring(
                    0,
                    dateObj.toISOString().indexOf('T')
                )
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

export {
    filterResourceList,
    openNewResourceModal,
    openEditResourceModal,
    handleDeleteResource,
}
