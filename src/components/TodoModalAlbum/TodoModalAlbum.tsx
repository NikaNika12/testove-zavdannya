import React from 'react';
import { Album } from '../../types/Album';

type Props = {
  album: Album,
  clickModal: () => void
};

export const TodoModalAlbum: React.FC<Props> = ({ album, clickModal }) => {
  const {
    id,
    title,
  } = album;

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
          >
            {`Album #${id}`}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            onClick={clickModal}
          />
        </header>

        <div className="modal-card-body">
          <p className="block">
            {`Title: ${title}`}
          </p>
        </div>
      </div>
    </div>
  );
};
