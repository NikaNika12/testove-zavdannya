import React, { useEffect, useState } from 'react';
import { getAlbums } from '../../api';
import { Loader } from '../Loader';
import { Album } from '../../types/Album';
import { TodoModalAlbum } from '../TodoModalAlbum/TodoModalAlbum';

type Props = {
  selectedUserId: number,
};

export const AlbumsList: React.FC<Props> = ({
  selectedUserId,
}) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadAlbums = async (userId: number) => {
      try {
        const loadedAlbums = await getAlbums(userId);

        setAlbums(loadedAlbums);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadAlbums(selectedUserId);
  }, [selectedUserId]);

  const showModal = (postId: number) => {
    setModalIsOpen(true);
    const searchedAlbum = albums.find(album => postId === album.id);

    if (searchedAlbum) {
      setSelectedAlbum(searchedAlbum);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedAlbum(null);
  };

  return (
    <div>
      <p className="title">Albums:</p>

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

          {albums.map(album => (
            <tr key={album.id}>
              <td>{album.id}</td>

              <td data-cy="PostTitle">
                {album.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  className="button"
                  type="button"
                  onClick={() => showModal(album.id)}
                >
                  {selectedAlbum?.id === album.id ? (
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

      {modalIsOpen && selectedAlbum
          && <TodoModalAlbum album={selectedAlbum} clickModal={closeModal} />}
    </div>
  );
};
