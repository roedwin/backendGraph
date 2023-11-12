const Band = require('./band');

class Bands {
    constructor(){
        this.bands = [];
    }

    addBand(band = new Band()) {
        this.bands.push(band);
    }

    getBands(){
        return this.bands;
    }

    deleteBand( id = '' ){
        this.bands = this.bands.filter(b => b.id !== id);
        return this.bands;
    }

    voteBand(id = '', voto_general, voto_masculino, voto_femenino, jrv){
        this.bands = this.bands.map( band => {
            if ( band.id === id ) {
                band.votes = voto_general;
                band.M = voto_masculino;
                band.F = voto_femenino;
                if(jrv !== undefined){
                    let keyJrv = Object.keys(jrv)[0];
                    band.jrv[keyJrv] = jrv[keyJrv];
                    console.log(band.jrv)
                }
                return band;
            } else {
                return band;
            }

        });
    }
}


module.exports = Bands;