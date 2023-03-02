const router = require('express').Router();
const {
    getUser,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controllers');

// /api/user
router.route('/').get(getUser).post(createUser);

// /api/user/:id
router
    .route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// /api/user/:id/friends/:friendId
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;
