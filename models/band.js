const { v4: uuidv4 } = require('uuid');

class Band {
    constructor(id, name = 'no-name', jrv){
        this.id = id;
        this.name = name;
        this.votes = 0;
        this.M = 0;
        this.F = 0;
        this.dep = [];
    }
}

module.exports = Band;