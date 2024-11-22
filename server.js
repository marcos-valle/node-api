// import { createServer } from 'node:http'

// const server = createServer ((req, res) =>{
//     res.write('hello')

//     return res.end()
// })

// server.listen(3333)

/*
    CRUD: Create, Read, Update, Delete
    POST: Criar uma informação
    GET: Ler uma informação
    PUT: Alterar uma informação
    DELETE: Deletar uma informação
    PATCH: Alterar uma informação específica
    PUSH: Adicionar uma informação
*/

import {fastify} from 'fastify'
// import {databaseMemory} from './database-memory.js'
import { databasePostgres } from './database-postgres.js'

const server = fastify()
// const database = new databaseMemory()
const database = new databasePostgres()

server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body

    await database.createVideo({
        title,
        description,
        duration
    })

    return reply.status(201).send()
})

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body

    await database.updateVideo(videoId, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
})

server.get('/videos', async (request) => {
    const search = request.query.search
    console.log(search)
    
    const videos = await database.listVideos(search)
    console.log(videos)
    
    return videos
})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    
    await database.deleteVideo(videoId)
    
    return reply.status(204).send()
})

server.listen({
    port: 3333
})