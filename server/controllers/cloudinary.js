const {cloudinary} = require('../utils/cloudinary');

const uploadImage = async (req, res)=>{
    try {
        const filestr = req.body.data;
        const uploadedResponse = await cloudinary.uploader.upload(filestr, {
            upload_preset: 'project-zero'
        })
        console.log(uploadedResponse);
        res.json(uploadedResponse.public_id)
    } catch (error) {
        console.log(error);
        res.status(500).json({err: 'something went wrong'})
    }
}

const getImageId = async (req, res)=>{
    const { resources } = await cloudinary.search
    .expression('folder:project-zero')
    .sort_by('public_id', 'desc')
    .max_results(30)
    .execute();

const publicIds = resources.map((file) => file.public_id);
res.send({publicIds});

}

module.exports = {uploadImage, getImageId}