import { Avatar, Box, Card, CardHeader, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../config/api'
import { deepPurple } from '@mui/material/colors'



const RecentOrders = () => {


  const [orders, setOrders] = useState([])


  useEffect(() => {
    api.get('/api/admin/orders')
      .then((response) => {
        setOrders(response.data)
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error)
      })
  }, [])

  console.log(orders)
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader
        title='Recent Orders'
        sx={{ pt: 2, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
        action={<Typography onClick={() => navigate("/admin/customers")} variant='caption' sx={{ color: deepPurple[500], cursor: "pointer", paddingRight: ".8rem" }}>View All</Typography>}
        titleTypographyProps={{
          variant: 'h5',
          sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
        }}
      />
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.slice(0, 5).map((order, index) => (
              <TableRow hover key={order.orderItems[0].product._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell> <Avatar alt="item image" src={order.orderItems[0].product.imageUrl} /> </TableCell>

                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{order.orderItems[0].product.title}</Typography>
                    <Typography variant='caption'>{order.orderItems[0].product.brand}</Typography>
                  </Box>
                </TableCell>

                <TableCell>{order.totalDiscountedPrice}</TableCell>
                <TableCell><Chip sx={{ color: "white" }} label={order.orderStatus} size='small' className='text-white' /></TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default RecentOrders