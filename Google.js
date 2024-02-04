const request = require('request')

async function latLong(address) {
    return new Promise((resolve) => {
        try {
            request.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=AIzaSyBUdnRFDvnIE2TKUMH9xIU1ti40mG4jJl0`, (error, response, body) => {
                if (!error) {
                    if (response.statusCode === 200) {
                        const { location } = JSON.parse(body)['results'][0]['geometry']
                        resolve({ message: location, code: response.statusCode })
                    } else {
                        resolve({ message: "Not possible resolve request", code: response.statusCode })
                    }
                } else {
                    resolve({ message: error, code: response.statusCode })
                }
            })

        } catch (Exception) {
            resolve({ message: Exception, code: 404 })
        }
    })
}

module.exports = {
  latLong
}