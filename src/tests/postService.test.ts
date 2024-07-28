import PostService from '../../src/services/post.service';
import Post from '../../src/models/post.model';
import User from '../../src/models/user.model';
import Category from '../../src/models/category.model';
import Comment from '../../src/models/comment.model';
import PostCategory from '../../src/models/postCategory.model';

jest.mock('../../src/models/post.model', () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };
});

jest.mock('../../src/models/user.model');
jest.mock('../../src/models/category.model');
jest.mock('../../src/models/comment.model');
jest.mock('../../src/models/postCategory.model');

describe('PostService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new post', async () => {
    const post = {
      id: 1,
      title: 'Test Post',
      content: 'This is a test post',
      userId: 1,
    };

    (Post.create as jest.Mock).mockResolvedValue(post);

    const result = await PostService.createPost(post, 1);
    expect(result).toEqual(post);
  });

  it('should get all posts', async () => {
    const posts = [
      {
        id: 1,
        title: 'Test Post',
        content: 'This is a test post',
        userId: 1,
      },
    ];

    (Post.findAll as jest.Mock).mockResolvedValue(posts);

    const result = await PostService.getPosts();
    expect(result).toEqual(posts);
  });

  it('should get a post by id', async () => {
    const post = {
      id: 1,
      title: 'Test Post',
      content: 'This is a test post',
      userId: 1,
    };

    (Post.findByPk as jest.Mock).mockResolvedValue(post);

    const result = await PostService.getPostById(1);
    expect(result).toEqual(post);
  });

  it('should update a post', async () => {
    const post = {
      id: 1,
      title: 'Test Post',
      content: 'This is a test post',
      userId: 1,
    };

    const updatedPost = {
      ...post,
      title: 'Updated Post',
    };

    (Post.update as jest.Mock).mockResolvedValue([1, [updatedPost]]);

    const result = await PostService.updatePost(1, { title: 'Updated Post' });
    expect(result).toEqual([1, [updatedPost]]);
  });

  it('should delete a post', async () => {
    (Post.destroy as jest.Mock).mockResolvedValue(1);

    const result = await PostService.deletePost(1);
    expect(result).toEqual(1);
  });
});
