module.exports.DEFAULT = {
  uploadSingle: async (req, res) => {
      try {
        if (!req.file) {
          next(new Error('No file uploaded!'));
          return;
        }
       
        res.json({ secure_url: req.file.path });
      } catch (err) {
          console.log(err, 'err')
          return res.json(err);
      }
  },

}