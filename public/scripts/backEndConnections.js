async function loadJSON(url, options) {
    const response = await fetch(url, options)
    const jsonBody = await response.json()
    if (!response.ok) {
        const error = Error(jsonBody.message)
        error.status = response.status
        throw error
    }
    return jsonBody
}

const rootAPIUrl = window.location.origin.concat('/api/v1')

async function loadCinemas() {
    return loadJSON(`${rootAPIUrl}/cinemas`)
}

export { loadCinemas }
