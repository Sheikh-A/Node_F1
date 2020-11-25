//import express from 'express'; //ES6 modules
const express = require('express'); //Common JS module same as above
const shortid = require('shortid');
const server = express();

server.use(express.json()); //read JSON from req.body

let clients = [
    {
        id: shortid.generate(),
        name: 'SpinCo',
        shipmentId: 1,
        cohort: 'SMB'
    },
    {
        id:shortid.generate(),
        name: 'BLUECO',
        shipmentId: 2,
        cohort: 'Emerging'
    },{
        id:shortid.generate(),
        name: 'GreenCo',
        shipmentId: 3,
        cohort: 'Enterprise'
    },{
        id:shortid.generate(),
        name: 'RedCo',
        shipmentId: 4,
        cohort: 'Mid-Market'
    },
]


let shipments = [
    {

        id: 1,
        name: 'SpinCo Widgets',


    },
    {
        id: 2,
        name: 'BLUECO Widgets',

    },{
        id: 3,
        name: 'GreenCo Widgets',

    },{
        id:4,
        name: 'RedCo',

    },
]

server.get('/', (req, res) => {
    res.status(200).send(('<h1>Hello Flexporters!</h1>'))
})

server.get('/api/clients', (req,res) => {
    res.status(200).json(clients);
})

server.get('/api/shipments', (req,res) => {
    res.status(200).json(shipments);
})

server.post('/api/clients', (req, res) => {
    const newClient = req.body; //needs expresss middleware

    newClient.id = shortid.generate();

    clients.push(newClient);
    res.status(201).json(newClient);

})

server.post('/api/shipments', (req, res) => {
    const newShipment = req.body; //needs expresss middleware


    shipments.push(newShipment);
    res.status(201).json(newShipment);

})

server.delete('/api/clients/:clientid', (req, res) => {
        const id = req.params.clientid;

        const deleted = clients.find(c => c.id === id);

        clients = clients.filter(c => c.id !==id);
        res.status(200).json(deleted);
});

server.put("/api/clients/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;


    let found = clients.find(c => c.id === id);

    if(found) {
        //found
        Object.assign(found, changes);
        res.status(200).json(found);
    } else {
        //did not find hub
        res.status(404).json({message: "Client not found"});
    }


})


const PORT = 3000;

server.listen(PORT, () => console.log(`Flexport server running...${PORT}`));
