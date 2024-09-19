const {
  getUserProfile,
  updateUsersProfile,
  getUserById,
  getUsers,
  deleteUser,
  updateUser
} = require('../../controllers/userController');
const { protect, admin } = require('../../middleware/authMiddleware');

const router = require('express').Router();

router.route('/').get(protect, admin, getUsers);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUsersProfile);

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

module.exports = router;
