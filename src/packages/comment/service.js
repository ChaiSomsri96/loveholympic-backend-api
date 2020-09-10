/* eslint-disable no-underscore-dangle */
import i18n from 'i18n';
import { Comment, NotificationSystem, UserLike } from '../../models';
import { ObjectId } from '../../utils/mongoose';
import repo from './repository';

const create = async (body) => {
  return repo.create(body);
};

const show = async (id) => {
  return repo.show(id);
};

const destroy = async ({ id, userId }) => {
  const comment = await Comment.findById(ObjectId(id));

  if (!comment) {
    throw new Error(JSON.stringify({
      message: i18n.__('comment.notFound'),
    }));
  }

  if (userId.toString() !== comment.user.toString()) {
    throw new Error(JSON.stringify({
      message: i18n.__('comment.auth.invalid'),
    }));
  }

  await Comment.remove({ _id: ObjectId(id) });
  await Promise.all([
    Comment.remove({ _id: ObjectId(id) }),
    NotificationSystem.findOneAndUpdate(
      {
        _id: ObjectId(comment._id),
      },
      { $inc: { totalComment: -1 } },
    ),
  ]);

  return null;
};

const likeAndUnlikeComment = async ({ id, userId }) => {
  let userLike = await UserLike.findOne({
    comment: ObjectId(id),
    user: ObjectId(userId),
  }).populate({
    path: 'comment',
    ref: 'Comment',
  });

  if (userLike) {
    const { isLike } = userLike;
    userLike.isLike = !isLike;
    await userLike.save();
  } else {
    userLike = await UserLike.create({
      comment: ObjectId(id),
      user: ObjectId(userId),
      isLike: true,
    });
  }

  const comment = await Comment.findByIdAndUpdate(
    { _id: ObjectId(id) },
    { $inc: { totalLike: userLike.isLike ? 1 : -1 } },
    { new: true },
  ).populate({
    path: 'user',
    ref: 'User',
    select: {
      _id: 1,
      nickname: 1,
      defaultAvatar: 1,
    },
  });

  const listUserLike = comment.userLikes || [];

  if (userLike.isLike) {
    if (!listUserLike.includes(ObjectId(userId))) {
      listUserLike.push(userId);
    }
  } else {
    const index = listUserLike.indexOf(userId);
    if (index > -1) {
      listUserLike.splice(index, 1);
    }
  }

  comment.userLikes = listUserLike;
  await comment.save();

  return comment;
};

export default {
  create,
  show,
  destroy,
  likeAndUnlikeComment,
};
