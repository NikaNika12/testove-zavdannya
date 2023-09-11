import React, { SetStateAction } from 'react';
import classNames from 'classnames';
import { User } from '../../types/User';
import { Entity } from '../../types/Entity';

type Props = {
  selectedUserId: number | undefined,
  setSelectedUser: (user: User | null) => void,
  visibleEntity: Entity,
  setVisibleEntity: React.Dispatch<SetStateAction<Entity>>
  users: User[],
};
export const UsersList: React.FC<Props> = ({
  selectedUserId, setSelectedUser,
  visibleEntity, setVisibleEntity, users,
}) => (
  <table className="table is-narrow is-fullwidth">
    <thead>
      <tr>
        <th>#</th>
        <th>User</th>
        <th>Phone</th>
        <th>Email</th>
        <th> </th>
        <th> </th>
      </tr>
    </thead>

    <tbody>
      {users.map(user => (
        <tr
          data-cy="todo"
          className={classNames({
            'has-background-info-light': selectedUserId === user.id,
          })}
          key={user.id}
        >
          <td className="is-vcentered">{user.id}</td>
          <td className="is-vcentered is-expanded">
            <p>
              {user.name}
            </p>
          </td>
          <td className="is-vcentered is-expanded">
            <p>
              {user.phone}
            </p>
          </td>
          <td className="is-vcentered is-expanded">
            <p>
              {user.email}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className={classNames(
                'button is-link',
                {
                  'is-light':
                  user?.id !== selectedUserId || visibleEntity !== Entity.POSTS,
                },
              )}
              onClick={() => {
                if (user.id === selectedUserId
                  && visibleEntity === Entity.POSTS) {
                  setSelectedUser(null);
                  setVisibleEntity(Entity.NULL);

                  return;
                }

                setSelectedUser(user);
                setVisibleEntity(Entity.POSTS);
              }}
            >
              { user.id === selectedUserId && visibleEntity === 'posts'
                ? 'Close Posts' : 'Open Posts' }
            </button>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className={classNames(
                'button is-link',
                {
                  'is-light':
                  user?.id !== selectedUserId
                    || visibleEntity !== Entity.ALBUMS,
                },
              )}
              onClick={() => {
                if (user.id === selectedUserId
                  && visibleEntity === Entity.ALBUMS) {
                  setSelectedUser(null);
                  setVisibleEntity(Entity.NULL);

                  return;
                }

                setSelectedUser(user);
                setVisibleEntity(Entity.ALBUMS);
              }}
            >
              { user.id === selectedUserId && visibleEntity === 'albums'
                ? 'Close Albums' : 'Open Albums' }
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
