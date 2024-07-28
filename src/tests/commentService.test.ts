import CommentService from '../../src/services/comment.service';
import Comment from '../../src/models/comment.model';
import User from '../../src/models/user.model';

jest.mock('../../src/models/comment.model', () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };
});

jest.mock('../../src/models/user.model');

describe('CommentService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new comment', async () => {
    const comment = {
      id: 1,
      content: 'This is a comment',
      userId: 1,
      postId: 1,
    };

    (Comment.create as jest.Mock).mockResolvedValue(comment);

    const result = await CommentService.createComment(comment, 1);
    expect(result).toEqual(comment);
  });

  it('should get all comments', async () => {
    const comments = [
      {
        id: 1,
        content: 'This is a comment',
        userId: 1,
        postId: 1,
      },
    ];

    (Comment.findAll as jest.Mock).mockResolvedValue(comments);

    const result = await CommentService.getComments();
    expect(result).toEqual(comments);
  });

  it('should get a comment by id', async () => {
    const comment = {
      id: 1,
      content: 'This is a comment',
      userId: 1,
      postId: 1,
    };

    (Comment.findByPk as jest.Mock).mockResolvedValue(comment);

    const result = await CommentService.getCommentById(1);
    expect(result).toEqual(comment);
  });

  it('should update a comment', async () => {
    const comment = {
      id: 1,
      content: 'This is a comment',
      userId: 1,
      postId: 1,
    };

    const updatedComment = {
      ...comment,
      content: 'Updated comment',
    };

    (Comment.update as jest.Mock).mockResolvedValue([1, [updatedComment]]);

    const result = await CommentService.updateComment(1, { content: 'Updated comment' });
    expect(result).toEqual([1, [updatedComment]]);
  });

  it('should delete a comment', async () => {
    (Comment.destroy as jest.Mock).mockResolvedValue(1);

    const result = await CommentService.deleteComment(1);
    expect(result).toEqual(1);
  });
});
