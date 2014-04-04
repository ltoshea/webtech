var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

module.exports = function() {
    
	var kittySchema = new Schema({
    name: String
    })
    
    //Need to convert scheme to a model I can work with.
    var Kitten = mongoose.model("kitten", kittySchema);

    
    //Single Document (Instance)
    var silence = new Kitten({ name: 'Silence' })
	console.log(silence.name) // 'Silence'

	// NOTE: methods must be added to the schema before compiling it with mongoose.model()
	kittySchema.methods.speak = function () {
  	var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name"
  	console.log(greeting);
}

};

var fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak() // "Meow name is fluffy"

fluffy.save(function (err, fluffy) {
  if (err) return console.error(err);
  fluffy.speak();
});

Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens)
})

Kitten.find({ name: /^Fluff/ }, callback)