const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PhotoSchema = new Schema({
  title: String,
  description: String
})
const Photo = mongoose.model("Photo", PhotoSchema);
Photo.create({
  title: "Photo 1",
  description: "Photo 1 description"
})
Photo.find({},(err,data)=>{
  console.log(data);
})
const id = '61988fa777544c9fb22c480c';
// Photo.findByIdAndUpdate(id, {
//     title: "Photo 3",
//     description: "Photo description 3"
//   }, {
//     new: true
//   },
//   (err, data) => {
//     console.log(data);
//   })
Photo.findByIdAndDelete(id,(err,data)=>{
  console.log("DOCUMENT DELETED");
})