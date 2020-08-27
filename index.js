const proxy = require('node-tcp-proxy')
const prompt = require('prompt-sync')({sigint: true})

const connection = {
    host: null,
    port: null,
    localPort: null
}

const validHostnameRegex = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/
const validPortRegex = /^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/

let validHost = false
let validPort = false
let validLocalPort = false

while (!validHost) {
    let inputHost = prompt('Host (Multiple hosts split with ","): ')

    let hosts = inputHost.split(',')

    validHost = true

    hosts.forEach(function (host) {
        if (!validHostnameRegex.test(host)) {
            validHost = false
            console.error("Invalid host entered, please try again!")
        }
    })

    if (validHost) {
        connection.host = hosts
    }
}

while (!validPort) {
    let inputPort = prompt('Port (Multiple ports split with ","): ')

    let ports = inputPort.split(',')

    validPort = true

    ports.forEach(function (port) {
        if (!validPortRegex.test(port)) {
            validPort = false
            console.error("Invalid port entered, please try again!")
        }
    })

    if (validPort) {
        connection.port = ports
    }
}

while (!validLocalPort) {
    let inputLocalPort = prompt('Local Port (Multiple ports split with ","): ')

    let localPorts = inputLocalPort.split(',')

    validLocalPort = true

    localPorts.forEach(function (localPort) {
        if (!validPortRegex.test(localPort)) {
            validLocalPort = false
            console.error("Invalid port entered, please try again!")
        }
    })

    if (validLocalPort) {
        connection.localPort = localPorts
    }
}

console.info(`Creating proxies...`)

connection.localPort.forEach((port, index) => {
    proxy.createProxy(port, connection.host[index], connection.port[index])
    console.info(`Forwarding localhost:${port} ➡ ${connection.host[index]}:${connection.port[index]}`)
})

console.info(`Running... (Ctrl + C to exit)`)