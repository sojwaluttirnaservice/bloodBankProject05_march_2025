import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Footer = () => {
    return (
        <footer>
            <Box
                sx={{
                    backgroundColor: '#D32F2F',
                    color: '#fff',
                    py: 4,
                    px: 4,
                    textAlign: 'center',
                }}>
                {/* Quick Links */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 3,
                        flexWrap: 'wrap',
                        mb: 2,
                    }}>
                    {['Home', 'Find Blood', 'Donate', 'About', 'Contact'].map((link, index) => (
                        <Link
                            key={index}
                            href={`/${link.toLowerCase().replace(' ', '-')}`}
                            underline="none"
                            sx={{
                                color: '#fff',
                                fontWeight: 'bold',
                                '&:hover': { textDecoration: 'underline' },
                            }}>
                            {link}
                        </Link>
                    ))}
                </Box>

                {/* Contact Information */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 2,
                        mb: 2,
                    }}>
                    <EmailIcon />
                    <Typography variant="body2">support@bloodbank.com</Typography>
                    <PhoneIcon />
                    <Typography variant="body2">+91 98765 43210</Typography>
                </Box>

                {/* Social Media Links */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                    <IconButton href="https://facebook.com" target="_blank" color="inherit">
                        <FacebookIcon />
                    </IconButton>
                    <IconButton href="https://twitter.com" target="_blank" color="inherit">
                        <TwitterIcon />
                    </IconButton>
                    <IconButton href="https://instagram.com" target="_blank" color="inherit">
                        <InstagramIcon />
                    </IconButton>
                </Box>

                {/* Copyright */}
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    © {new Date().getFullYear()} Blood Bank Project. All rights reserved.
                </Typography>
            </Box>
        </footer>
    );
};

export default Footer;
