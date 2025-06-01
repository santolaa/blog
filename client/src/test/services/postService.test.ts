import {
  createPost,
  deletePost,
  fetchPost,
  fetchPosts,
  updatePost
} from '../../services/postService';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

jest.mock('../../constants', () => ({
  API_URL: 'http://your-test-api-url',
}));

describe('Post API Service', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('fetches all posts', async () => {
    const mockData = [{ id: 1, title: 'Post 1', body: 'Body 1' }];
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const result = await fetchPosts();

    expect(result).toEqual(mockData);
  });

  it('fetches a single post by ID', async () => {
    const mockData = { id: 1, title: 'Post 1', body: 'Body 1' };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const result = await fetchPost(mockData.id);

    expect(result).toEqual(mockData);
  });

  it('creates a new post', async () => {
    const mockData = { title: 'New Post', body: 'New Body' };
    fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 201 });

    const result = await createPost(mockData);

    expect(result).toEqual(mockData);
  });

  it('updates an existing post', async () => {
    const mockData = { id: 1, title: 'Updated Post', body: 'Updated Body' };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const result = await updatePost(mockData.id, mockData);

    expect(result).toEqual(mockData);
  });

  it('deletes a post by ID', async () => {
    fetchMock.mockResponseOnce('', { status: 204 });

    const result = await deletePost(1);

    expect(result).toEqual(null);
  });

  it('throws an error when fetch fails', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 500 });

    await expect(fetchPosts()).rejects.toThrow();
  });

  it('throws an error when fetching a single post fails', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 404 });

    await expect(fetchPost(1)).rejects.toThrow();
  });

  it('throws an error when creating a post fails', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 400 });

    await expect(createPost({ title: 'Test', body: 'Test' })).rejects.toThrow();
  });

  it('throws an error when updating a post fails', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 400 });

    await expect(updatePost(1, { title: 'Test', body: 'Test' })).rejects.toThrow();
  });

  it('throws an error when deleting a post fails', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 404 });

    await expect(deletePost(1)).rejects.toThrow();
  });

  it('throws an error when the delete response is not ok and not 204', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 500 });

    await expect(deletePost(1)).rejects.toThrow();
  });
});
