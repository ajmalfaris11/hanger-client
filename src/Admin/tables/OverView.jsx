// ** MUI Imports
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import CurrencyInr from 'mdi-material-ui/CurrencyInr' // Indian Rupee Icon

// ** API
import api from '../../config/api'

const OverView = () => {
  const [salesCount, setSalesCount] = useState(0)
  const [customerCount, setCustomerCount] = useState(0)
  const [productCount, setProductCount] = useState(0)
  const [revenue, setRevenue] = useState(0)

  useEffect(() => {
    // Get total orders (sales)
    api.get('/api/admin/orders').then((res) => {
      const orders = res.data.users || res.data
      setSalesCount(orders.length)

      // Calculate revenue 
      const totalPrice = orders.reduce((sum, order) => sum + (order.totalDiscountedPrice || 0), 0)
      setRevenue(totalPrice)
    })

    // Get total customers
    api.get('/api/users').then((res) => {
      setCustomerCount((res.data.users || res.data).length)
    })

    // Get total products
    api.get('/api/products').then((res) => {
      console.log(res)
      setProductCount(res.data.totalProducts)
    })
  }, [])

  const salesData = [
    {
      stats: `${salesCount}`,
      title: 'Sales',
      color: 'primary',
      icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: `${customerCount}`,
      title: 'Customers',
      color: 'success',
      icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: `${productCount}`,
      title: 'Products',
      color: 'warning',
      icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: `₹${Math.round(revenue).toLocaleString()}`,
      color: 'info',
      title: 'Revenue',
      icon: <CurrencyInr sx={{ fontSize: '1.75rem' }} />
    }
  ]

  const renderStats = () =>
    salesData.map((item, index) => (
      <Grid item xs={12} sm={3} key={index}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: `${item.color}.main`
            }}
          >
            {item.icon}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>{item.title}</Typography>
            <Typography variant='h6'>{item.stats}</Typography>
          </Box>
        </Box>
      </Grid>
    ))

  return (
    <Card>
      <CardHeader
        title='Overview'
        action={
          <IconButton size='small' aria-label='settings' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
            Live business stats based on 
            </Box>{' '}
            store activity 📊
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default OverView
