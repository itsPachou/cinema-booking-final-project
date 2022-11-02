

function getAllCinemas(req, res) {
    res
        .status(200)
        .json({ message: "This is the cinemas endpoint." })
}

module.exports = {
    getAllCinemas
}