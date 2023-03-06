const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controllers');

// /api/thought
router.route('/').get(getThoughts).post(createThought);

// /api/thought/:id
router
    .route('/:id')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);


// /api/thought/:id/reactions
router.route('/:id/reactions').post(addReaction)

// /api/thought/:id/reactions/:reactionId
router.route('/:id/reactions/:reactionId').delete(deleteReaction);

module.exports = router;