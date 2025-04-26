import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Avatar, CircularProgress, Grid } from '@mui/material';
import api from '../../../config/api'; // adjust path if needed
import { deepPurple } from '@mui/material/colors';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/users/profile')
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch profile:', err);
        setLoading(false);
      });
  }, []);

  // Loading State
  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;

  // Error State
  if (!profile) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Typography color="error">Profile not found</Typography></Box>;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Card sx={{ width: 400, boxShadow: 3, borderRadius: 2 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          {/* Avatar with Initials */}
          <Avatar
            sx={{
              bgcolor: deepPurple[500],
              width: 100,
              height: 100,
              mx: 'auto',
              mb: 2,
              fontSize: 40,
              fontWeight: 'bold',
            }}
          >
            {profile.firstName?.[0]?.toUpperCase()}{profile.lastName?.[0]?.toUpperCase()}
          </Avatar>

          {/* User Name */}
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#fff' }}>
            {profile.firstName} {profile.lastName}
          </Typography>
          
          {/* User Email */}
          <Typography variant="subtitle1" color="white" sx={{ mt: 1 }}>
            {profile.email}
          </Typography>

          {/* Role */}
          <Typography variant="body2" sx={{ mt: 2, color: '#555' }}>
            <strong>Role:</strong> {profile.role}
          </Typography>

          {/* Join Date */}
          <Typography variant="body2" sx={{ mt: 1, color: '#555' }}>
            <strong>Joined on:</strong> {new Date(profile.createdAt).toLocaleDateString()}
          </Typography>

          {/* Additional Section */}
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ color: '#777' }}>
                <strong>Location:</strong> {profile.location || 'Not available'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ color: '#777' }}>
                <strong>Phone:</strong> {profile.phone || 'Not available'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfile;
