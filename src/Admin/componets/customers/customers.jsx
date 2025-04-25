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

const Customers = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

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
  const filteredUsers = users.filter(user =>
    user._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Box>
      <Card>
        <CardHeader
          title='All Customers'
          sx={{ pt: 2, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
        />

        {/* Search bar */}
        <Box className="px-6 pt-2 pb-4">
          <TextField
            fullWidth
            label="Search by User ID or Name"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .filter(user => user.role === 'CUSTOMER') 
                .map((user, index) => (
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
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  )
}

export default Customers
