'use strict'

async function loadJSON(url, options) {
    try {
        const response = await fetch(url, options)
        const jsonBody = await response.json()
        if (!response.ok) {
            const error = Error(jsonBody.message)
            error.status = response.status
            throw error
        }
        return jsonBody
    } catch (error) {
        console.log(error)
    }
}

async function getRoom(id) {
    try {
        const result = await loadJSON(`${location.origin}/api/v1/rooms/${id}`)
        return result.data.room
    } catch (error) {
        console.log(error)
    }
}

async function getScreening(id) {
    try {
        const result = await loadJSON(
            `${location.origin}/api/v1/screenings/${id}`
        )
        return result.data.screening
    } catch (error) {
        console.log(error)
    }
}

async function postReservation(screeningID, tickets) {
    try {
        const result = await loadJSON(
            `${location.origin}/api/v1/bookings/reservation`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ screeningID, tickets }),
            }
        )
        return result.data.newReservation
    } catch (error) {
        return error
    }
}

async function createCheckout(id) {
    try {
        const session = await loadJSON(
            `${location.origin}/api/v1/bookings/checkout/bookings/${id}`,
            {
                method: 'POST',
            }
        )
        return session.session
    } catch (error) {
        console.log(error)
        return error
    }
}

async function deleteMe() {
    try {
        const result = await loadJSON(
            `${location.origin}/api/v1/users/deleteMe`,
            {
                method: 'DELETE',
            }
        )
        return result
    } catch (error) {
        return error
    }
}

async function getResource(id, resource) {
    const result = await loadJSON(`${location.origin}/api/v1/${resource}/${id}`)
    return result.data[resource.substring(0, resource.length - 1)]
}

async function submitResource(data, resource) {
    if (data.id) {
        const id = data.id
        delete data.id
        return await loadJSON(`${location.origin}/api/v1/${resource}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    }
    return await loadJSON(`${location.origin}/api/v1/${resource}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

async function deleteResource(id, resource) {
    return await loadJSON(`${location.origin}/api/v1/${resource}/${id}`, {
        method: 'DELETE',
    })
}

export {
    loadJSON,
    getRoom,
    getScreening,
    postReservation,
    createCheckout,
    deleteMe,
    getResource,
    submitResource,
    deleteResource,
}
