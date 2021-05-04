const server =require('express')()
const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (request, response) => {
    const app = new Vue({
        data: {
            url: request.url
        },

        template:`<div>The visited URL is: {{ url }}</div>`

    })

    renderer.renderToString(app, (error, html) => {
        if (error) {
            throw error
        }

        response.end(`
        <!DOCTYPE html>
        <html>
            <head><title>Hello</title></head>
            <body>${html}</body>
        </html>`)
    } )
})


server.listen(8000)