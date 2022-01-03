const Photo = require('../models/Photo');
const fs = require('fs');

exports.getAllPhotos = async (req, res) => {
  //   res.sendFile(path.resolve((__dirname, 'temp/index.html')));
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index', {
    photos,
  });
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({
    _id: req.params.id,
  });
  const deletePathImage = __dirname + '/../public' + photo.image;
  fs.unlinkSync(deletePathImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
};

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({
    _id: req.params.id,
  });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  res.redirect(`/photos/${req.params.id}`);
};

exports.createPhoto = (req, res) => {
  const folderDir = 'public/uploads';
  if (!fs.existsSync(folderDir)) {
    fs.mkdirSync(folderDir);
  }
  const uploadImageFile = req.files.image;
  const imageFilePath =
    __dirname + '/../public/uploads/' + uploadImageFile.name;
  uploadImageFile.mv(imageFilePath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadImageFile.name,
    });
  });
  res.redirect('/');
};
exports.getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
};
