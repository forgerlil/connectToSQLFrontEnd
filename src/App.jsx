import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    age: '',
  });

  useEffect(() => {
    fetch('http://localhost:8000/users')
      .then((res) => res.json())
      .then((final) => setUsers(final));
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((final) => console.log(final));
  };

  return (
    <>
      {users && users.map((user) => <div key={user.id}>{user.first_name}</div>)}
      <br />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          id='first_name'
          name='first_name'
          placeholder='First Name'
          value={form.first_name}
          onChange={handleChange}
        />
        <label htmlFor='first_name'>FirstName</label>
        <br />
        <input
          type='text'
          id='last_name'
          name='last_name'
          placeholder='Last Name'
          value={form.last_name}
          onChange={handleChange}
        />
        <label htmlFor='last_name'>Last Name</label>
        <br />
        <input
          type='text'
          id='age'
          name='age'
          placeholder='Age'
          value={form.age}
          onChange={handleChange}
        />
        <label htmlFor='age'>Age</label>
        <br />
        <button>Submit details</button>
      </form>
    </>
  );
}

export default App;
