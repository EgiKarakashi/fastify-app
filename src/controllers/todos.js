let todos = require('../Todo')

const getTodos = (request, reply) => {
    reply.send(todos)
}

const getTodo = (request, reply) => {
    const {id} = request.params
    const todo = todos.find((todo) => todo.id === id)
    reply.send(todo)
}

const postTodo = (request, reply) => {
    const {name, description} = request.body
    const todo = {
        id: String(todos.length + 1), 
        name,
        description
    }
    todos.push(todo)
    reply.code(201).send(todo)
}

const updatedTodo = (request, reply) => {
    const {id} = request.params
    const {name, description} = request.body
    const todo = todos.find((todo) => todo.id === id)
    todo.name = name
    todo.description = description
    reply.send(todo)
}

const deleteTodo = (request, reply) => {
    const {id} = request.params
    todos = todos.filter((todo) => todo.id !== id)
    reply.send(`Item with ${id} got deleted!`)
}

module.exports = {
    getTodos,
    getTodo,
    postTodo,
    updatedTodo,
    deleteTodo
}