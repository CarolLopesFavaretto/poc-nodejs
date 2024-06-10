const express = require('express');
const app = express();
app.use(express.json())

app.get('/projects', function(request, response){
    return response.json({
        message: 'Óla Dev'
    })
});

// GET http://localhost:8080/projects?title=Node&owner=Carol&page=1

app.get('/projects', function(request, response){
    const { title, owner, page } = request.query
    console.log(title, owner, page)

    return response.json([
        'Projeto 1',
        'projeto 2'
    ])
});

app.put('/projects/:id', function(request, response){
    const { id } = request.params
    console.log(id)

    return response.json([
        'Projeto 1',
        'projeto 2',
        'projeto 3',
    ])
});

app.listen(8080, () => {
    console.log('Server started on port 8080!')
});

