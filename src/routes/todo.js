let todos = require('../Todo')

const Todo = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        name: {
            type: 'string'
        },
        description: {
            type: 'string'
        }
    }
}

const getTodosOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                todos: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string'
                        }, 
                        name: {
                            type: 'string'
                        },
                        description: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    }
}

const getTodoOpts = {
    schema: {
        response: {
            200: {
                properties: {
                    id: {
                        type: 'string'
                    },
                    name: {
                        type: 'string'
                    },
                    description: {
                        type: 'string'
                    }
                }
            }
        }
    }
}

const postTodoOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name', 'description'],
            properties: {
                name: { type: 'string' },
                description: { type: 'string' }
            }
        },
            response: {
            201: Todo
        }
    }
}

const updateTodoOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name', 'description'],
            properties: {
                name: {
                    type: 'string'
                },
                description: {
                    type: 'string'
                }
            }
        },
        response: {
            200: Todo
        }
    }
}

const deleteTodoOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: {type: 'string'},
                }
            }
        }
    }
}


const todoRoute = (fastify, options, done) => {
    fastify.get('/', getTodosOpts, function(request, reply) {
        reply.send(todos)
    })

    fastify.get('/:id', getTodoOpts, function(request, reply) {
        const {id} = request.params
        const todo = todos.find((todo) => todo.id === id)

        reply.send(todo)
    })

    fastify.post('/',postTodoOpts, function(request, reply) {
        const {name, description} = request.body
        const todo = {id: String(todos.length + 1), name, description}
        todos.push(todo)
        reply.code(201).send(todo)

    })

    fastify.put('/:id', updateTodoOpts, function(request, reply) {
        const{id} = request.params
        const{name, description} = request.body
        const todo = todos.find((todo) => todo.id === id)
        todo.name = name
        todo.description = description
        reply.send(todo)

    })

    fastify.delete('/:id', deleteTodoOpts, function(request, reply) {
        const {id} = request.params
        todos = todos.filter((todo) => todo.id !== id)
        reply.send(`Item with ${id} got deleted!`)
    })

    done()
}

module.exports = {todoRoute}