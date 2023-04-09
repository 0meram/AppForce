import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import PropTypes from "prop-types";
import styled from 'styled-components'

const Image = styled.img`
    border-radius: 50px;
    max-width: 70px;
    margin-left: 30px ;
`

const EditUserForm = ({ user, open, onClose, onSaveEdit }) => {
    const [editedUser, setEditedUser] = useState(user);
    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const keys = name.split('.'); // Split the keys by dot (.) character
        setEditedUser((prevUser) => {
            let updatedUser = { ...prevUser };
            let nestedObj = updatedUser;
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                if (i === keys.length - 1) {
                    // If it's the last key, set the value
                    nestedObj[key] = value;
                } else {
                    // If it's not the last key, access the nested object
                    if (!nestedObj[key]) {
                        nestedObj[key] = {};
                    }
                    nestedObj = nestedObj[key];
                }
            }
            return { ...updatedUser };
        });
    };

    const validateEmail = (email) => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const isValid = emailPattern.test(email);
        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formErrors = validateForm(editedUser);
        if (Object.keys(formErrors).length === 0) {
            onSaveEdit(editedUser);
            onClose(true)
        } else {
            setErrors(formErrors);
        }
    };

    // Validate form inputs
    const validateForm = (userData) => {
        const errors = {};
        if (!userData.name || userData.name.first.length < 3) {
            errors.first = "First name must be at least 3 characters";
        }
        if (!userData.name || userData.name.last.length < 3) {
            errors.last = "Last name must be at least 3 characters";
        }
        if (!userData.email || !validateEmail(userData.email)) {
            errors.email = "Please enter a valid email address";
        }
        if (!userData.location.country || !userData.location.city || !userData.location.street.name) {
            errors.location = "Please enter a valid location";
        }
        const duplicateEmail = user.login.uuid !== userData.login.uuid && user.email === userData.email;
        if (duplicateEmail) {
            errors.email = "Email must be unique";
        }
        return errors;
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit User</DialogTitle>
            <Image
                src={user.picture.medium}
                alt={`${user.name.first} ${user.name.last}`}
            />
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        margin="dense"
                        label="First Name"
                        name="name.first"
                        defaultValue={editedUser.name.first}
                        onChange={handleInputChange}
                        error={errors.first && errors.first.length > 0}
                        helperText={errors.first}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Last Name"
                        name="name.last"
                        defaultValue={editedUser.name.last}
                        onChange={handleInputChange}
                        error={errors.last && errors.last.length > 0}
                        helperText={errors.last}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        name="email"
                        defaultValue={editedUser.email}
                        onChange={handleInputChange}
                        error={errors.email && errors.email.length > 0}
                        helperText={errors.email}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Country"
                        name="location.country"
                        defaultValue={editedUser.location.country}
                        onChange={handleInputChange}
                        helperText={errors.location}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="City"
                        name="location.city"
                        defaultValue={editedUser.location.city}
                        onChange={handleInputChange}
                        helperText={errors.location}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Street"
                        name="location.street.name"
                        defaultValue={editedUser.location.street.name}
                        onChange={handleInputChange}
                        helperText={errors.location}
                        fullWidth
                    />
                    <DialogActions>
                        <Button onClick={onClose} color="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

EditUserForm.propTypes = {
    user: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};

export default EditUserForm;