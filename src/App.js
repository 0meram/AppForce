import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import UserCard from './components/UserCard'
import SearchFilter from './components/SearchFilter'
import AddUserForm from './components/AddUserForm'
import PropTypes from 'prop-types';

const App = () => {
  const [users, setUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [openAddUserForm, setOpenAddUserForm] = useState(false)

  // Fetch users data from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'https://randomuser.me/api/?results=10',
        )
        setUsers(response.data.results)
      } catch (error) {
        console.error('Error fetching users data:', error)
      }
    }
    fetchUsers()
  }, [])

  // Handle adding a new user
  const handleAddUser = (newUser) => {
    setUsers([...users, newUser])
    setOpenAddUserForm(false)
  }

  // Handle saving edited user
  const handleSaveEditUser = (updatedUser) => {
    const updatedUsers = users.map((user) => {
      if (user.login.uuid === updatedUser.login.uuid) {
        return updatedUser
      }
      return user
    })
    setUsers(updatedUsers)
  }

  // Handle deleting user
  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.login.uuid !== userId)
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(updatedUsers)
    }
  }

  // Handle searching users
  const handleSearchUsers = (query) => {
    setSearchQuery(query)
  }

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.last.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.location.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.login.uuid.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Container maxWidth="lg" sx={{ marginTop: '32px', background: 'rgb(241 245 249)' }}>
      <Grid container spacing={2}>
        <h1>User Library App</h1>
        <AddUserForm
          open={openAddUserForm}
          onClose={() => setOpenAddUserForm(false)}
          onAddUser={handleAddUser}
        />
        <Grid item xs={12}>
          <SearchFilter handleSearch={handleSearchUsers} />
          <Button onClick={() => setOpenAddUserForm(true)}>Add User</Button>
        </Grid>
        {filteredUsers.map((user) => (
          <Grid key={user.login.uuid} item xs={12} sm={6} md={4} lg={3}>
            <UserCard
              user={user}
              onDelete={handleDeleteUser}
              onSaveEdit={handleSaveEditUser}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

App.propTypes = {
  users: PropTypes.array.isRequired,
  searchQuery: PropTypes.string.isRequired,
  openAddUserForm: PropTypes.bool.isRequired,
  handleAddUser: PropTypes.func.isRequired,
  handleSaveEditUser: PropTypes.func.isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
  handleSearchUsers: PropTypes.func.isRequired,
  filteredUsers: PropTypes.array.isRequired,
};

export default App;
