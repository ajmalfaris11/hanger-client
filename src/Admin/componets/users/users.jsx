import { useEffect, useState } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { Avatar, CardHeader, Pagination, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { deepPurple } from '@mui/material/colors'
import api from '../../../config/api'
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material'


const Users = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedRole, setSelectedRole] = useState("ALL")


    useEffect(() => {
        api.get('api/users')
            .then((response) => {
                setUsers(response.data.users || response.data)
            })
            .catch((error) => {
                console.error("Failed to fetch users:", error)
            })
    }, [])

    // Filtered users based on search term
    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRole = selectedRole === "ALL" || user.role === selectedRole;

        return matchesSearch && matchesRole;
    });




    return (
        <Box>
            <Card>
                <CardHeader
                    title='All Customers'
                    sx={{ pt: 2, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
                />
                <Box className="flex flex-wrap gap-4 px-6 pt-2 pb-4">
                    <FormControl sx={{ minWidth: 300 }} size="medium">
                        <InputLabel id="role-select-label">Filter by Role</InputLabel>
                        <Select
                            labelId="role-select-label"
                            value={selectedRole}
                            label="Filter by Role"
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            <MenuItem value="ALL">All</MenuItem>
                            <MenuItem value="CUSTOMER">Customer</MenuItem>
                            <MenuItem value="ADMIN">Admin</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Search by User ID or Name"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ flex: 1, minWidth: 250 }}
                    />
                </Box>


                <TableContainer>
                    <Table sx={{ minWidth: 390 }} aria-label='table in dashboard'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>User Id</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.map((user, index) => (
                                <TableRow hover key={user._id || index} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>

                                    <TableCell>
                                        <Avatar
                                            alt={user?.firstName + ' ' + user?.lastName}
                                            sx={{ bgcolor: deepPurple[500], color: "white", cursor: "pointer", mr: 1 }}
                                        >
                                            {user?.firstName && user?.lastName
                                                ? `${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`
                                                : 'O'}
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{user._id}</TableCell>
                                    <TableCell>{user.firstName + " " + user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    )
}

export default Users
