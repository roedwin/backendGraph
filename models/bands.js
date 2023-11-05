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

    voteBand(id = '', genero){
        this.bands = this.bands.map( band => {

            if ( band.id === id ) {
                band.votes++;
                if (genero === 'M') {
                    band.M++;
                }else{
                    band.F++;
                }
                return band;
            } else {
                return band;
            }

        });
    }
}


module.exports = Bands;