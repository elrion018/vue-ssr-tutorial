const server =require('express')()
const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
})

const context = {
    title: 'hello',
    meta: `
        <meta ...>
        <meta ...>

    `
}

server.get('*', (request, response) => {
    const app = new Vue({
        data: {
            url: request.url
        },

        template:`<div>The visited URL is: {{ url }}</div>`

    })

    renderer.renderToString(app, context,(error, html) => {
        if (error) {
            response.status(500).end('Internal Server Error')
            return
        }

        response.end(html)
    } )
})


server.listen(8000,() => {
    console.log('receive!')
})