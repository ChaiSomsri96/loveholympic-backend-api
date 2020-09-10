/* eslint-disable no-underscore-dangle */
import i18n from 'i18n';
import { Comment, NotificationSystem } from '../../models';
import { ObjectId } from '../../utils/mongoose';
import { initialOptions } from '../../utils/pagination';

/**
 *
 * @param {*} query
 * @returns
 */
const list = async (query) => {
  const options = initialOptions(query);
  const { limit, skip, sort, page } = options;
  const match = {
    notificationSystem: ObjectId(query.notificationId),
    user: { $ne: null },
  };
  const [comments, total] = await Promise.all([
    Comment.find(match)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate([
        {
          path: 'user',
          ref: 'User',
          select: {
            _id: 1,
            nickname: 1,
            defaultAvatar: 1,
          },
        },
        {
          path: 'replies',
          ref: 'Comment',
        },
      ]),
    Comment.countDocuments(match),
  ]);

  return {
    results: comments,
    total,
    page,
    limit,
  };
};

/**
 *
 * @param {*} id
 * @returns
 */
const destroy = async (id) => {
  const comment = await Comment.findOne({
    _id: ObjectId(id),
  });

  if (!comment) {
    throw new Error(JSON.stringify({
      message: i18n.__('comment.notFound'),
    }));
  }
  await NotificationSystem.findOneAndUpdate(
    {
      _id: ObjectId(comment.notificationSystem),
    },
    {
      $inc: { totalComment: -1 },
    },
    { new: true },
  );

  return Comment.deleteOne({
    _id: ObjectId(id),
  });
};

/**
 *
 * @param {*} id
 * @returns
 */
const deleteReply = async (id, idParent) => {
  const comment = await Comment.findOne({
    _id: ObjectId(id),
  });

  if (!comment) {
    throw new Error(JSON.stringify({
      message: i18n.__('comment.notFound'),
    }));
  }
  await NotificationSystem.findOneAndUpdate(
    {
      _id: ObjectId(comment.notificationSystem),
    },
    { new: true },
  );

  await Comment.findByIdAndUpdate(
    { _id: comment._id },
    { replies: comment.replies.slice([comment.replies.indexOf(idParent), 1]) },
    { new: true },
  );

  return Comment.deleteOne({
    _id: ObjectId(id),
  });
};

/**
 *
 * @param {*} param0
 * @returns
 */
const replyComment = async ({ commentId, content, notificationId }) => {
  const [comment, notificationSystem] = await Promise.all([
    Comment.findById(ObjectId(commentId)),
    NotificationSystem.findById(ObjectId(notificationId)),
  ]);

  if (!comment) {
    throw new Error(JSON.stringify({
      message: i18n.__('comment.notFound'),
    }));
  }

  if (!notificationSystem) {
    throw new Error(JSON.stringify({
      message: i18n.__('notificationSystem.notFound'),
    }));
  }

  const newComment = await Comment.create({
    user: null,
    notificationSystem: ObjectId(notificationId),
    content,
  });

  const updateComment = await Comment.findByIdAndUpdate(
    { _id: comment._id },
    { replies: comment.replies.concat([newComment._id]) },
    { new: true },
  );

  return updateComment;
};

export default {
  destroy,
  list,
  replyComment,
  deleteReply,
};
