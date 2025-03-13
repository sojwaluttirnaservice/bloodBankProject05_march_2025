import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Modal,
    TextField,
    MenuItem,
    Select,
    InputLabel,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import SearchIcon from '@mui/icons-material/Search';
import { states } from '../../dummyData/statesDistricts';
import { instance } from '../../axiosInstance/axiosInstance';

const SearchPage = () => {
    // State for filters
    const [bloodType, setBloodType] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [bloodBanks, setBloodBanks] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedBloodType, setSelectedBloodType] = useState();

    // Order request modal state
    const [selectedBank, setSelectedBank] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // User authentication state
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')); // Assume user data is stored in localStorage
        if (user && user.id) {
            setIsLoggedIn(true);
            setUserId(user.id);
        }
    }, []);

    // Get districts based on selected state
    const districtsList = states.find((s) => s.state === state)?.districts || [];

    // Handle Search Request
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data: resData } = await instance.post('/search', {
                bloodType,
                state,
                district,
            });
            setBloodBanks(resData?.data?.bloodBanks || []);
        } catch (err) {
            console.error('Error fetching blood banks:', err);
        } finally {
            setLoading(false);
        }
    };

    // Handle Open Request Modal
    const handleOpenModal = (bank) => {
        setSelectedBank(bank);
        setOpenModal(true);
    };

    // Handle Close Modal
    const handleCloseModal = () => {
        setOpenModal(false);
        setQuantity(1);
    };

    // Handle Order Submission
    const handleSubmitRequest = async () => {
        if (!selectedBank || !userId) return;

        const orderData = {
            user_id_fk: userId,
            blood_bank_id_fk: selectedBank.id,
            blood_type: bloodType,
            quantity,
            price_at_purchase: selectedBank.price_per_unit || 0,
            urgency_level: 'NORMAL',
            delivery_method: 'PICKUP',
        };

        try {
            await instance.post('/orders', orderData);
            alert('Blood request submitted successfully!');
            handleCloseModal();
        } catch (error) {
            console.error('Error submitting request:', error);
            alert('Failed to submit request.');
        }
    };

    return (
        <Box sx={{ px: 4, py: 6 }}>
            <Typography variant="h4" fontWeight="bold" color="error" textAlign="center" mb={4}>
                Find Blood Near You
            </Typography>

            <form onSubmit={handleSearch}>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: 2,
                        maxWidth: '900px',
                        mx: 'auto',
                        mb: 4,
                    }}>
                    <select
                        id="blood-type"
                        value={bloodType}
                        onChange={(e) => setBloodType(e.target.value)}
                        style={{ width: '200px', padding: '12px', borderRadius: '8px' }}>
                        <option value="">Select Blood Type</option>
                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>

                    <select
                        id="state"
                        value={state}
                        onChange={(e) => {
                            setState(e.target.value);
                            setDistrict('');
                        }}
                        style={{ width: '200px', padding: '12px', borderRadius: '8px' }}>
                        <option value="">Select State</option>
                        {states.map((s) => (
                            <option key={s.state} value={s.state}>
                                {s.state}
                            </option>
                        ))}
                    </select>

                    <select
                        id="district"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        disabled={!state}
                        style={{ width: '200px', padding: '12px', borderRadius: '8px' }}>
                        <option value="">Select District</option>
                        {districtsList.map((d) => (
                            <option key={d} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>

                    <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SearchIcon />}
                        sx={{
                            backgroundColor: '#D32F2F',
                            '&:hover': { backgroundColor: '#B71C1C' },
                            minWidth: 150,
                        }}>
                        Search
                    </Button>
                </Box>
            </form>

            <Box>
                {loading ? (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <CircularProgress color="error" />
                    </Box>
                ) : bloodBanks.length > 0 ? (
                    bloodBanks.map((bank) => (
                        <Card
                            key={bank.id}
                            sx={{ maxWidth: '800px', mx: 'auto', mb: 3, p: 3, boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="h5" fontWeight="bold" color="error">
                                    {bank.name}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    <LocationOnIcon fontSize="small" />{' '}
                                    {`${bank.address_lines}, ${bank.district}, ${bank.state}`}
                                </Typography>
                                <Typography variant="body1" mt={1}>
                                    <BloodtypeIcon fontSize="small" sx={{ mr: 1 }} /> Available
                                    Blood Types: {bank.available_blood_types.join(', ')}
                                </Typography>

                                {isLoggedIn ? (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleOpenModal(bank)}
                                        sx={{ mt: 2 }}>
                                        Put Request
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => (window.location.href = '/auth/user')}
                                        sx={{ mt: 2 }}>
                                        Login to Put a Request
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography variant="h6" textAlign="center" color="textSecondary" mt={3}>
                        No blood banks found. Try changing the search filters.
                    </Typography>
                )}
            </Box>

            {/* Order Request Modal */}
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        p: 4,
                        bgcolor: 'white',
                        boxShadow: 24,
                        borderRadius: 2,
                    }}>
                    <Typography variant="h6">Confirm Your Blood Request</Typography>
                    <TextField
                        type="number"
                        label="Quantity"
                        fullWidth
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        sx={{ my: 2 }}
                    />

                    <InputLabel>Blood Type</InputLabel>
                    <Select
                        value={selectedBloodType}
                        onChange={(e) => setSelectedBloodType(e.target.value)}>
                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((type) => (
                            <MenuItem key={type} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </Select>

                    <Button variant="contained" color="primary" onClick={handleSubmitRequest}>
                        Put Request
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default SearchPage;
