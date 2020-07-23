const mongoose = require('mongoose');

const mongoDB = 'mongodb://localhost/datarelation3';
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Could not connect to MongoDB Server : ', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]

  //if you want to set is as required, then use this
  // author: {
  //   type: authorSchema,
  //   required: true
  // }
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

createCourse('Node Course', [
  new Author({ name: 'Cool Author1', bio: 'cool author', website: 'any website' }),
  new Author({ name: 'Cool Author2', bio: 'cool author', website: 'any website' }),
  new Author({ name: 'Cool Author3', bio: 'cool author', website: 'any website' }),
  new Author({ name: 'Cool Author4', bio: 'cool author', website: 'any website' }),
  new Author({ name: 'Cool Author5', bio: 'cool author', website: 'any website' })
]);

//you can also add new author to the author array in a course document
// async function addAuthor(courseId, author){
//   const course = await Course.findById(courseId);
//   course.authors.push(author); //push or add data to the authors array inside course document
//   course.save(); //then after that save it
// }

//addAuthor('5f1900739acddb0a5c5c8647', new Author( { name: 'Cool Jimmy', bio: 'cool author', website: 'any website' } ));

//you can also remve an author
// async function removeAuthor(courseId, authorId){
//   const course = await Course.findById(courseId);
//   const author = course.authors.id(authorId);
//   author.remove();
//   course.save();
// }

// removeAuthor('5f1900739acddb0a5c5c8647', '5f1900ba852fe2108cc1f989');