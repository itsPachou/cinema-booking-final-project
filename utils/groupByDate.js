export default function (xs) {
    return xs.reduce((rv, x) => {
        const fulldate = new Date(x.date).toISOString()
        const key = fulldate.substring(0, fulldate.indexOf('T'))
        ;(rv[key] = rv[key] || []).push(x)
        return rv
    }, {})
}
