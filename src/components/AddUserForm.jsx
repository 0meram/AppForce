import React from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import PropTypes from 'prop-types'

const AddUserForm = ({ open, onAddUser, onClose }) => {
    const avaterUrl =
        'data:image/jpeg;base64,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'
    const [values, setValues] = React.useState({
        name: { first: '', last: '' },
        email: '',
        location: { country: '', city: '', street: { name: '', number: '' } },
        login: { uuid: Date.now.toString() },
        picture: {
            medium: avaterUrl,
        },
    })
    const [errors, setErrors] = React.useState({})

    const handleChange = (event) => {
        const { name, value } = event.target
        const nestedNames = name.split('.')
        let updatedValues = { ...values }

        // Update nested values
        if (nestedNames.length > 1) {
            let currentNestedValue = updatedValues
            for (let i = 0; i < nestedNames.length - 1; i++) {
                const nestedName = nestedNames[i]
                if (!currentNestedValue[nestedName]) {
                    currentNestedValue[nestedName] = {}
                }
                currentNestedValue = currentNestedValue[nestedName]
            }
            currentNestedValue[nestedNames[nestedNames.length - 1]] = value
        } else {
            updatedValues[name] = value
        }
        setValues(updatedValues)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const formErrors = validateForm(values)
        if (Object.keys(formErrors).length === 0) {
            onAddUser(values)
            resetForm()
        } else {
            setErrors(formErrors)
        }
    }

    const validateForm = (values) => {
        let errors = {}
        if (!values.name) {
            errors.name = 'Name is required'
        }
        if (!values.email) {
            errors.email = 'Email is required'
        } else if (!isValidEmail(values.email)) {
            errors.email = 'Invalid email address'
        }
        if (!values.location.country) {
            errors.country = 'Country is required'
        }
        if (!values.location.city) {
            errors.city = 'City is required'
        }
        if (!values.location.street.name) {
            errors.street = 'street is required'
        }
        return errors
    }

    const resetForm = () => {
        setValues({
            name: { first: '', last: '' },
            email: '',
            location: { country: '', city: '', street: { name: '', number: '' } },
            login: { uuid: '' },
            picture: {
                medium: avaterUrl,
            },
        })
        setErrors({})
        onClose()
    }

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email)
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{ p: 2, m: 'auto', width: 300, background: 'white', mt: '20px' }}
            >
                <Typography variant="h6" align="center" gutterBottom>
                    Add User
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        name="name.first"
                        label="First name"
                        value={values.name.first}
                        onChange={handleChange}
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="name.last"
                        label="Last name"
                        value={values.name.last}
                        onChange={handleChange}
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="email"
                        label="Email"
                        value={values.email}
                        onChange={handleChange}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="location.country"
                        label="Country"
                        defaultValue={values.location.country}
                        onChange={handleChange}
                        error={Boolean(errors.country)}
                        helperText={errors.country}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="location.city"
                        label="City"
                        defaultValue={values.location.city}
                        onChange={handleChange}
                        error={Boolean(errors.city)}
                        helperText={errors.city}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="location.street.name"
                        label="Street"
                        defaultValue={values.location.street.name}
                        onChange={handleChange}
                        error={Boolean(errors.street)}
                        helperText={errors.street}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type="submit" variant="contained" color="primary">
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={resetForm}
                            style={{ marginLeft: '8px' }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}

AddUserForm.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onAddUser: PropTypes.func.isRequired,
}

export default AddUserForm
