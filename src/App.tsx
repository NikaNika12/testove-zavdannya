import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import classNames from 'classnames';
import { UserFilter } from './components/UserFilter';
import { Loader } from './components/Loader';
import { getUsers } from './api';
import { Type } from './types/Type';
import { User } from './types/User';
import { PostsList } from './components/PostsList/PostsList';
import { UsersList } from './components/UsersList/UsersList';
import { AlbumsList } from './components/AlbumsList/AlbumsList';
import { Entity } from './types/Entity';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedType, setSelectedType] = useState<Type>(Type.ASC);
  const [isError, setIsError] = useState(false);
  const [visibleEntity, setVisibleEntity] = useState<Entity>(Entity.NULL);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const loadedUsers = await getUsers();

        setUsers(loadedUsers);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  const getVisibleUsers = (sortType: Type, people: User[]) => {
    const sorted = [...people].sort((a, b) => a.name.localeCompare(b.name));

    switch (sortType) {
      case Type.ASC:
        return sorted;

      case Type.DESC:
        return sorted.reverse();

      default:
        return people;
    }
  };

  const getFilteredUsers = (filterQuery: null | string, people: User[]) => {
    return filterQuery
      ? people.filter(user => user.name.toLowerCase()
        .includes(filterQuery.toLowerCase()))
      : people;
  };

  const filteredUsers = useMemo(
    () => {
      let copy = [...users];

      if (selectedType === Type.DESC) {
        copy = getVisibleUsers(selectedType, copy);
      }

      if (query) {
        copy = getFilteredUsers(query, copy);
      }

      return copy;
    },
    [query, users, selectedType],
  );

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Users:</h1>

            <div className="block">
              <UserFilter
                inputValue={query}
                onChangeInput={setQuery}
                selectValue={selectedType}
                onChangeSelect={setSelectedType}
              />
            </div>

            {(!isLoading && users.length) ? (
              <div className="block">
                <UsersList
                  users={filteredUsers}
                  setSelectedUser={setSelectedUser}
                  selectedUserId={selectedUser?.id}
                  visibleEntity={visibleEntity}
                  setVisibleEntity={setVisibleEntity}
                />
              </div>
            ) : (
              <Loader />
            )}

            {(isError && !users.length)
              && <p>A server error occurred while uploading the data from server</p>}

            <div
              className={classNames(
                'tile',
                'is-parent',
                'Sidebar',
                { 'Sidebar--open': selectedUser },
              )}
            >
              {selectedUser && visibleEntity === Entity.POSTS && (
                <div className="tile is-child box">
                  <PostsList
                    selectedUserId={selectedUser.id}
                  />
                </div>
              )}

              {selectedUser && visibleEntity === Entity.ALBUMS && (
                <div className="tile is-child box">
                  <AlbumsList
                    selectedUserId={selectedUser.id}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
