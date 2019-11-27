const express = require('express');

const server = express();

server.use(express.json());

server.use((req, res, next) => {
    
    console.log(`Requisição nº: ${counter++}`)

    next();
})

function checkProjectInArray(req, res, next){
    const project = getProjectById(req.params.id);

    if(!project){
        return res.status(400).json({error: "Project does not exists"})
    }

    req.project = project;

    return next();
}

function getProjectById(id){
    return projects.find(x => x.id == id)
}

const projects = []
var counter = 0

server.post('/projects', (req, res) => {
    const {id} = req.body;
    const {title} = req.body;

    projects.push({id: id, title: title, tasks: []})

    return res.json(projects)
})

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.put('/projects/:id', checkProjectInArray, (req, res) => {
    const {id} = req.params;
    const {title} = req.body;

    var project = getProjectById(id)
    project.title = title

    return res.json(project)
})

server.delete('/projects/:id', checkProjectInArray, (req, res) => {
    const {id} = req.params;
    const index = projects.map(function(item){ return item.id }).indexOf(id);

    projects.splice(index, 1)

    return res.send()
})

server.post('/projects/:id/tasks', checkProjectInArray, (req, res) => {
    const {id} = req.params;
    const {title} = req.body;

    const index = projects.map(function(item){ return item.id }).indexOf(id);

    projects[index].tasks.push({title: title})

    return res.json(projects)
})

server.listen(3000);