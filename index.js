const proxy = require('node-tcp-proxy')
const prompt = require('prompt-sync')({sigint: true})

const connection = {
    host: null,
    port: null,
    localPort: null
}

const validHostnameRegex = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/
const validPortRegex = /^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/

let hasHost = false
let hasPort = false
let hasLocalPort = false

while (!hasHost) {
    let host = prompt('Host: ')

    if (validHostnameRegex.test(host)) {
        hasHost = true
        connection.host = host
    } else {
        console.error("Invalid host entered, please try again!")
    }
}

while (!hasPort) {
    let port = prompt('Port: ')

    if (validPortRegex.test(port)) {
        hasPort = true
        connection.port = port
    } else {
        console.error("Invalid port entered, please try again!")
    }
}

while (!hasLocalPort) {
    let localPort = prompt('Local Port: ')

    if (validPortRegex.test(localPort)) {
        hasLocalPort = true
        connection.localPort = localPort
    } else {
        console.error("Invalid port entered, please try again!")
    }
}

console.info(`Creating proxy for ${connection.host}:${connection.port}...`)

proxy.createProxy(connection.localPort, connection.host, connection.port)

console.info(`Running... (Ctrl + c to exit)`)