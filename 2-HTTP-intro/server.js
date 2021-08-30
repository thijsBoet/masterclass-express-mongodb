const http = require("http");

const todos = [{
        id: 1,
        text: "Watch new episode Colbert"
    },
    {
        id: 2,
        text: "Watch new episode Loki"
    },
    {
        id: 3,
        text: "Watch new episode Daily Show"
    }
]


const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-type": "application/json",
        "X-Powered-By": "Node.js"
    })

    let body = []

    req.on("data", chunk => {
        body.push(chunk)
    }).on("end", () => {
        body = Buffer.concat(body).toString()
        console.log(body)
    })

    res.end(JSON.stringify({
        success: true,
        data: todos
    }))
})

const PORT = 5000

server.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`))