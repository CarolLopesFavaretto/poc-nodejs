const express = require('express');
const { v4: uuid4 } = require('uuid');

const app = express();
app.use(express.json())

const projects = [];

app.get('/projects', function (request, response) {
    return response.json(projects)
});

// GET http://localhost:8080/projects?title=Node&owner=Carol&page=1

app.get('/projects', function (request, response) {
    const { title, owner, page } = request.query
    return response.json(projects)
});

app.post('/projects', function (request, response) {
    const { name, owner } = request.body;

    const project = {
        id: uuid4,
        name,
        owner
    };

    projects.push(project);

    return response.status(201).json(project);
})

app.put('/projects/:id', function (request, response) {
    const { id } = request.params
    const { name, owner } = request.body;

    const projectIndex = projects.findIndex(p => p.id == id)

    if (projectIndex < 0) {
        return response.status(404).json({ error: 'Project nao encontrado' })
    }

    if (!name || !owner) {
        return response.status(404).json({ error: 'Title e Owner sao requiridos' })
    }

    const project = {
        id,
        name,
        owner
    };

    projects[projectIndex] = project

    return response.status(200).json(project)
});

app.delete('/projects/:id', function (request, response) {
    const { id } = request.params

    const projectIndex = projects.findIndex(p => p.id == id);

    if (projectIndex < 0) {
        return response.status(404).json({ error: 'Project nao encontrado' })
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send;

})
app.listen(8080, () => {
    console.log('Server started on port 8080!')
});

