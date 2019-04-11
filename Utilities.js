class Utilities {
    static code(id) {
        return String.fromCharCode(id);
    }
    static shuffle(array) {
        let counter = array.length;
        
         while (counter > 0) {
             let index = Math.floor(Math.random() * counter);
        
            counter--;
        
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        
        return array;
    }
    static random(array) {
        return array[Math.floor(Math.random()*array.length)];
    }
    //max is exclusive
    static randomInt(min, max) {
        return Math.random() * (max - min) + min;
    }
}

module.exports = Utilities;