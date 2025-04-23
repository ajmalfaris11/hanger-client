// ** MUI Imports
import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import api from '../../config/api'
import { useNavigate } from 'react-router-dom'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

const Achivement = () => {
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()

  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  useEffect(() => {
    api.get('/api/admin/orders')
      .then((response) => {
        const data = response.data.users || response.data
        setOrders(data)
      })
      .catch((error) => {
        console.error("Failed to fetch orders:", error)
      })
  }, [])

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6' sx={{ letterSpacing: '0.25px' }}>
          Shop With Hanger
        </Typography>
        <Typography variant='body2'>Congratulations 🥳</Typography>

        {/* 👇 Total number of orders */}
        <Typography variant='h5' sx={{ my: 3.1, color: 'primary.main' }}>
          {orders.length} Sales
        </Typography>

        <Button size='small' variant='contained' onClick={() => navigate('/admin/orders')}>
          View Sales
        </Button>

        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        <TrophyImg alt='trophy' src='/images/misc/trophy.png' />
      </CardContent>
    </Card>
  )
}

export default Achivement
