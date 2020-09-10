/* eslint-disable no-underscore-dangle */
import i18n from 'i18n';
import { Admin, NotificationSystem } from '../../models';
import { ObjectId } from '../../utils/mongoose';
import Comment from './model';

const create = async (body) => {
  const { notificationSystem, userId } = body;
  const notificationSystemData = await NotificationSystem.findById(ObjectId(notificationSystem));

  if (!notificationSystemData) {
    throw new Error(i18n.__('notificationSystem.notFound'));
  }

  const data = {
    ...body,
    user: userId,
  };

  const comment = await Comment.create(data);
  const [detailComment, notify] = await Promise.all([
    Comment.findById(comment._id).populate('user', {
      _id: 1,
      defaultAvatar: 1,
      nickname: 1,
    }),
    NotificationSystem.findOneAndUpdate(
      {
        _id: ObjectId(notificationSystem),
      },
      { $inc: { totalComment: 1 } },
      { new: true },
    ),
  ]);
  console.log(notify);

  return detailComment;
};

const show = async (id) => {
  return Comment.findById(id);
};

const incrementColumn = async (id) => {
  return Comment.findOneAndUpdate(
    {
      _id: new ObjectId(id),
    },
    { $inc: { totalLike: 1 } },
    { new: true },
  );
};

const destroy = async (req) => {
  const { user, commentData } = req;
  const { _id: userId } = user;
  const { id } = req.params;

  const admin = await Admin.findById(userId);
  if (!admin) {
    // Check user permission
    if (!commentData.user.equals(userId)) {
      throw new Error(i18n.__('auth.tokenInvalid'));
    }
  }

  return Comment.findOne({
    _id: id,
    user: userId,
  }).remove();
};

export default {
  create,
  show,
  incrementColumn,
  destroy,
};
