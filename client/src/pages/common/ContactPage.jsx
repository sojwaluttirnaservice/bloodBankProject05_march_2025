import React from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, IconButton } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const ContactPage = () => {
    return (
        <Box sx={{ px: 4, py: 6, textAlign: 'center' }}>
            {/* Header Section */}
            <Typography variant="h3" fontWeight="bold" color="error" mb={3}>
                Get in Touch With Us
            </Typography>
            <Typography variant="h6" color="textSecondary" maxWidth="800px" mx="auto" mb={4}>
                Need assistance? Reach out to us via phone, email, or visit us at our office. We are
                here to help 24/7!
            </Typography>

            {/* Contact Information Section */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 3,
                    maxWidth: '1100px',
                    mx: 'auto',
                }}>
                {[
                    {
                        icon: <PhoneIcon fontSize="large" />,
                        title: 'Emergency Helpline',
                        value: '+91 98765 43210',
                    },
                    {
                        icon: <EmailIcon fontSize="large" />,
                        title: 'Support Email',
                        value: 'support@bloodbank.com',
                    },
                    {
                        icon: <LocationOnIcon fontSize="large" />,
                        title: 'Our Location',
                        value: '123 Health St, Mumbai, India',
                    },
                ].map((contact, index) => (
                    <Card
                        key={index}
                        sx={{
                            textAlign: 'center',
                            py: 4,
                            px: 3,
                            boxShadow: 3,
                            transition: '0.3s',
                            '&:hover': { boxShadow: 6, transform: 'scale(1.05)' },
                            borderRadius: 3,
                            width: { xs: '100%', sm: '48%', md: '30%' },
                        }}>
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    color: 'error.main',
                                    mb: 2,
                                }}>
                                {contact.icon}
                            </Box>
                            <Typography variant="h5" fontWeight="bold">
                                {contact.title}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {contact.value}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* Contact Form */}
            <Box sx={{ maxWidth: '700px', mx: 'auto', mt: 6, textAlign: 'left' }}>
                <Typography variant="h5" fontWeight="bold" color="error" mb={2}>
                    Send Us a Message
                </Typography>

                <TextField fullWidth label="Your Name" variant="outlined" sx={{ mb: 2 }} />
                <TextField fullWidth label="Your Email" variant="outlined" sx={{ mb: 2 }} />
                <TextField
                    fullWidth
                    label="Your Message"
                    variant="outlined"
                    multiline
                    rows={4}
                    sx={{ mb: 2 }}
                />

                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#D32F2F', '&:hover': { backgroundColor: '#B71C1C' } }}>
                    Submit Message
                </Button>
            </Box>

            {/* Social Media Links */}
            <Box mt={6}>
                <Typography variant="h5" fontWeight="bold" color="error" mb={2}>
                    Follow Us
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <IconButton href="https://facebook.com" target="_blank" color="primary">
                        <FacebookIcon />
                    </IconButton>
                    <IconButton href="https://twitter.com" target="_blank" color="primary">
                        <TwitterIcon />
                    </IconButton>
                    <IconButton href="https://instagram.com" target="_blank" color="secondary">
                        <InstagramIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default ContactPage;
