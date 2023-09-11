import React from 'react';
import { Post } from '../../types/Post';

type Props = {
  post: Post,
  clickModal: () => void
};

export const TodoModal: React.FC<Props> = ({ post, clickModal }) => {
  const {
    id,
    title,
    body,
  } = post;

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
          >
            {`Post #${id}`}
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

          <p className="block">
            {`Message: ${body}`}
          </p>
        </div>
      </div>
    </div>
  );
};
