const cloudinary = require('cloudinary');
const errorHandler = require('./errorHandler');

const deleteimages = async (public_ids) => {
    try {
        await Promise.all(
            public_ids.map((public_id) => {
                cloudinary.v2.uploader.destroy(public_id, { invalidate: true })
            })
        )
    } catch (err) {
        throw new errorHandler('something went wrong !', 404);
    }
}


module.exports = deleteimages;

