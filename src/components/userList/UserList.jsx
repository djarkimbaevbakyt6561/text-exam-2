import React, { useEffect, useState } from 'react';
import ListItem from '../userItem/UserItem';
import './UserList.css';
import ErrorDisplay from '../ui/ErrorDisplay';
import LoadingSpinner from '../ui/LoadingSpinner';

const UserList = ({ refreshing, onRefreshComplete, search, sortBy }) => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
        if (!response.ok) {
          throw new Error(`${response.status} Something went wrong`);
        }
        const result = await response.json();
        setUserList(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
        if (refreshing) {
          onRefreshComplete();
        }
      }
    };
    if (refreshing) {
      fetchData();
    }
  }, [refreshing]);
  const filteredUsers = userList.filter((user) => {
    const lowerCaseSearch = search.toLowerCase();
    return (
      lowerCaseSearch === '' ||
      user.username.toLowerCase().includes(lowerCaseSearch) ||
      user.name.toLowerCase().includes(lowerCaseSearch) ||
      user.email.toLowerCase().includes(lowerCaseSearch)
    );
  });

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (sortBy === 'username') {
      return a.username.localeCompare(b.username);
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }
  return (
    <ul className="user_list_ul">
      {sortedUsers
        .filter((el) => {
          return search.toLowerCase() === ''
            ? el
            : el.username.toLowerCase().includes(search.toLowerCase()) ||
                el.name.toLowerCase().includes(search.toLowerCase()) ||
                el.email.toLowerCase().includes(search.toLowerCase());
        })
        .map((el) => {
          return (
            <ListItem
              email={el.email}
              name={el.name}
              address={el.address}
              phone={el.phone}
              username={el.username}
              key={el.id}
            />
          );
        })}
    </ul>
  );
};

export default UserList;
