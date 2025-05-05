import React, { useEffect, useState } from 'react';
import api from '../../../config/api';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Avatar,
    CircularProgress,
    Grid,
    Divider,
} from '@mui/material';
import dayjs from 'dayjs';

const CustProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api
            .get('/api/users/profile')
            .then((res) => {
                setProfile(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch profile:', err);
                setLoading(false);
            });
    }, []);

    if (loading)
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );

    if (!profile)
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography color="error">Profile not found</Typography>
            </Box>
        );

    return (
        <Box
            minHeight="100vh"
            bgcolor="black"
            display="flex"
            justifyContent="center"
            alignItems="center"
            px={2}
            sx={{
                py: { xs: 5, sm: 0 },
            }}
        >
            <Card sx={{ maxWidth: 600, width: '100%', borderRadius: 4, border: '2px solid #fff' }}>
                <Box bgcolor="black" color="white" p={4} display="flex" alignItems="center" gap={3}>
                    <Avatar
                        sx={{
                            bgcolor: 'black',
                            color: 'white !important',
                            border: '3px solid white',
                            width: 80,
                            height: 80,
                            fontSize: 32,
                            fontWeight: 'bold',
                        }}
                    >
                        {profile.firstName?.[0]?.toUpperCase()} {profile.lastName?.[0]?.toUpperCase()}
                    </Avatar>
                    <Box>
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            sx={{
                                color: 'white !important',
                                fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }, // Responsive font sizes
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {profile.firstName.toUpperCase()} {profile.lastName.toUpperCase()}
                        </Typography>

                        <Typography variant="body2" color="gray">
                            {profile.role?.toLowerCase()}
                        </Typography>
                    </Box>
                </Box>

                <Divider />

                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" gutterBottom>
                                First Name
                            </Typography>
                            <Typography variant="body1" bgcolor="#f4f4f4" p={1.5} borderRadius={1}>
                                {profile.firstName}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" gutterBottom>
                                Last Name
                            </Typography>
                            <Typography variant="body1" bgcolor="#f4f4f4" p={1.5} borderRadius={1}>
                                {profile.lastName}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" gutterBottom>
                                Email
                            </Typography>
                            <Typography variant="body1" bgcolor="#f4f4f4" p={1.5} borderRadius={1}>
                                {profile.email}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" gutterBottom>
                                Member Since
                            </Typography>
                            <Typography variant="body1" bgcolor="#f4f4f4" p={1.5} borderRadius={1}>
                                {dayjs(profile.createdAt).format('DD MMM YYYY')}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default CustProfile;
