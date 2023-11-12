const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const WebSocket = require('ws');


const bands = new Bands();

// bands.addBand(new Band(1,'FMLN'));
// bands.addBand(new Band(2,'Nuevas Ideas'));
// bands.addBand(new Band(3,'Arena'));
// bands.addBand(new Band(4,'PCN'));

// const serverUrl = 'ws://34.224.60.108:3000/';
// const my_socket = new WebSocket(serverUrl);

// my_socket.on('active-bands', (payload) => {
//     console.log('Conexión establecida.');
//   });

//mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands())

    client.on('disconnect', ()=>{
        console.log('Cliente desconectado')
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload.nombre);

        io.emit('mensaje', {admin: 'Nuevo mensaje'})
    });

    client.on('vote-band', (payload)=> {
        //console.log(payload.id)
        bands.voteBand(payload.id, payload.voto_general, payload.voto_masculino, payload.voto_femenino, payload.jrv);
        io.emit('active-bands', bands.getBands());
    });

    client.on('votes-bands', (payload) => {
        payload.forEach(element => {
            const { id_partido, _count, genero, departamento } = element;
            bands.voteBand(id_partido, _count, genero.masculino, genero.femenino, departamento);            
        });
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) =>{
        console.log(payload);
        bands.addBand(new Band(payload.id,payload.name));
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-bands', (payload) =>{
        console.log(payload);
        const elementos = payload.partidos_politicos;
        elementos.forEach(element => {
            const { id_partido_politico, siglas } = element;
            bands.addBand(new Band(id_partido_politico, siglas));           
        });
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) =>{
        
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    // client.on('emitir-mensaje', (payload) => {
    //     console.log(payload);
    //     io.emit('nuevo-mensaje', payload);
    // });
});
