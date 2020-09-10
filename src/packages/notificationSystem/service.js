/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import i18n from 'i18n';
import { NotificationSystem, UserLike, Comment, Admin } from '../../models';
import { ObjectId } from '../../utils/mongoose';
import { initialOptions } from '../../utils/pagination';
import repo from './repository';

const index = async (query) => {
  return repo.index(query);
};

const show = async (id) => {
  return repo.incrementColumn(id, 'totalView');
};

const updateLike = async (id) => {
  return repo.incrementColumn(id, 'totalLike');
};

const detail = async ({ id, userId }) => {
  const notify = await NotificationSystem.findOneAndUpdate(
    {
      _id: ObjectId(id),
    },
    { $inc: { totalView: 1 } },
    { new: true }
  ).lean();

  if (!notify) {
    throw new Error(JSON.stringify({
      message: i18n.__('notificationSystem.notFound'),
    }));
  }

  const userLike = await UserLike.findOne({
    user: ObjectId(userId),
    notificationSystem: ObjectId(notify._id),
    isLike: true,
  });

  return {
    ...notify,
    isLiked: !!userLike,
  };
};

const likeAndUnlikeNotification = async ({ id, userId }) => {
  let userLike = await UserLike.findOne({
    user: ObjectId(userId),
    notificationSystem: ObjectId(id),
    // isLike: true,
  });

  if (userLike) {
    const { isLike } = userLike;
    userLike.isLike = !isLike;
    userLike.save();
  } else {
    userLike = await UserLike.create({
      user: ObjectId(userId),
      notificationSystem: ObjectId(id),
      isLike: true,
    });
  }

  const notify = await NotificationSystem.findByIdAndUpdate(
    {
      _id: ObjectId(id),
    },
    { $inc: { totalLike: userLike.isLike ? 1 : -1 } },
    { new: true }
  ).lean();

  return {
    ...notify,
    isLiked: userLike.isLike,
  };
};

const listComment = async (query) => {
  const { id } = query;
  const options = initialOptions(query);
  const { limit, skip, sort, page, sortBy, sortType } = options;
  const match = {
    notificationSystem: ObjectId(id),
    user: { $ne: null }
  };
  const [comments, total, admin] = await Promise.all([
    Comment.find(match)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'user',
        ref: 'User',
        select: {
          _id: 1,
          nickname: 1,
          defaultAvatar: 1,
        },
      }).populate({
        path: 'replies',
        ref: 'Comment',
      })
      .lean(),
    Comment.countDocuments(match),
    Admin.findOne(),
  ]);

  const results = [];
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    const { replies } = comment;
    const customReplies = [];

    for (let j = 0; j < replies.length; j++) {
      let reply = replies[j];
      if (!reply.user) {
        reply = {
          ...reply,
          user: {
            _id: admin._id,
            nickname: 'Admin',
            defaultAvatar: admin.avatar,
          },
        };
      }

      customReplies.push(reply);
    }

    comment.replies = customReplies;
    results.push(comment);
  }

  return {
    results,
    total,
    page,
    limit,
    sortBy,
    sortType,
  };
};

export default {
  index,
  show,
  updateLike,
  detail,
  likeAndUnlikeNotification,
  listComment,
};
