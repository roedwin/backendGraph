const Band = require('./band');

class Bands {
    constructor(){
        this.bands = [];
    }

    addBand(band = new Band()) {
        const partidoExiste = this.bands.some(existingBand => existingBand.id == band.id);
        if (!partidoExiste) {
            this.bands.push(band);            
        } else {
            console.log(`El partido politico con el ID ${band.id} ya existe`);
        }
    }

    getBands(){
        return this.bands;
    }

    deleteBand( id = '' ){
        this.bands = this.bands.filter(b => b.id !== id);
        return this.bands;
    }

    voteBand(id = '', voto_general, voto_masculino, voto_femenino, departamentos){
        this.bands = this.bands.map( band => {
            if ( band.id === id ) {
                band.votes = voto_general;
                band.M = voto_masculino;
                band.F = voto_femenino;
                band.dep = departamentos;
                return band;
            } else {
                return band;
            }

        });
    }
}


module.exports = Bands;