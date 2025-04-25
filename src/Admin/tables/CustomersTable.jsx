// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { Avatar, CardHeader } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../../config/api'
import { deepPurple } from '@mui/material/colors'



const CustomersTable = () => {

  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  useEffect(() => {
    api.get('api/users')
      .then((response) => {
        setUsers(response.data.users || response.data)
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error)
      })
  }, [])

  const filteredUsers = users
    .slice() // create a shallow copy so we don't mutate the original array
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // newest first


  return (
    <Card>
      <CardHeader
        title='New Customers'
        sx={{ pt: 2, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
        action={<Typography onClick={() => navigate("/admin/customers")} variant='caption' sx={{ color: deepPurple[500], cursor: "pointer", paddingRight: ".8rem" }}>View All</Typography>}
        titleTypographyProps={{
          variant: 'h5',
          sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
        }}
      />
      <TableContainer>
        <Table sx={{ minWidth: 390 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
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
                  <TableCell>{user.firstName + " " + user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default CustomersTable
