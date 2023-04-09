import React, { useState } from 'react'
import PropTypes from 'prop-types'
import EditUserForm from './EditUserForm'
import styled from 'styled-components'
import {
    Button,
    CardActions,
    Typography,
    CardContent,
    Card,
} from '@mui/material'

const Image = styled.img`
    border-radius: 50px;
    max-width: 50px;
`

const UserCard = ({ user, onDelete, onSaveEdit }) => {
    const [openEditUserForm, setOpenEditUserForm] = useState(false)

    const handleOpenEditUserForm = () => {
        setOpenEditUserForm(true)
    }

    const handleCloseEditUserForm = () => {
        setOpenEditUserForm(false)
    }

    return (
        <Card>
            <CardContent>
                <Image
                    src={user.picture.medium}
                    alt={`${user.name.first} ${user.name.last}`}
                />
                <Typography variant="h5" component="h2">
                    {user.name.first} {user.name.last}
                </Typography>
                <Typography color="textSecondary">{user.email}</Typography>
                <Typography color="textSecondary">
                    {user.location.city}, {user.location.country}
                </Typography>
                <Typography color="textSecondary">
                    {user.location.street.name} {user.location.street.number}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleOpenEditUserForm}>
                    Edit
                </Button>
                <Button
                    size="small"
                    color="secondary"
                    onClick={() => onDelete(user.login.uuid)}
                >
                    Delete
                </Button>
            </CardActions>
            <EditUserForm
                open={openEditUserForm}
                onClose={handleCloseEditUserForm}
                user={user}
                onSaveEdit={onSaveEdit}
            />
        </Card>
    )
}

UserCard.propTypes = {
    user: PropTypes.object.isRequired,
    onEditUser: PropTypes.func.isRequired,
    onDeleteUser: PropTypes.func.isRequired,
}

export default UserCard
