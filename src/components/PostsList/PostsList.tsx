import React, { useEffect, useState } from 'react';
import { TodoModal } from '../TodoModal';
import { getPosts } from '../../api';
import { Post } from '../../types/Post';
import { Loader } from '../Loader';

type Props = {
  selectedUserId: number,
};

export const PostsList: React.FC<Props> = ({
  selectedUserId,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadPosts = async (userId: number) => {
      try {
        const loadedPosts = await getPosts(userId);

        setPosts(loadedPosts);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts(selectedUserId);
  }, [selectedUserId]);

  const showModal = (postId: number) => {
    setModalIsOpen(true);
    const searchedPost = posts.find(post => postId === post.id);

    if (searchedPost) {
      setSelectedPost(searchedPost);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPost(null);
  };

  return (
    <div>
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {isLoading && <Loader />}

          {isError && (
            <div className="notification is-danger">
              Something went wrong
            </div>
          )}

          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>

              <td>
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  className="button"
                  type="button"
                  onClick={() => showModal(post.id)}
                >
                  {selectedPost?.id === post.id ? (
                    <span className="icon">
                      <i className="far fa-eye-slash" />
                    </span>
                  ) : (
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalIsOpen && selectedPost
        && <TodoModal post={selectedPost} clickModal={closeModal} />}
    </div>
  );
};
