import { useState } from 'react';
import './App.css';
import UserList from './components/userList/UserList';

function App() {
  const [refreshing, setRefreshing] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('username');
  const handleRefresh = () => {
    setRefreshing(true);
  };

  return (
    <div className="App">
      <input
        className="search-input"
        placeholder="Search user..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <select className='select' value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="username">Username</option>
        <option value="name">Name</option>
      </select>
      <button className="refresh-button" onClick={handleRefresh}>
        Refresh
      </button>

      <UserList
        refreshing={refreshing}
        search={search}
        sortBy={sortBy}
        onRefreshComplete={() => setRefreshing(false)}
      />
    </div>
  );
}

export default App;
