import React, { useState } from 'react';
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
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const SearchPage = () => {
    const navigate = useNavigate();

    // State for filters
    const [bloodType, setBloodType] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [bloodBanks, setBloodBanks] = useState([]);
    const [loading, setLoading] = useState(false);

    // This one comes from the modal thing

    // Order request modal state
    const [selectedBank, setSelectedBank] = useState(null);
    const [selectedBloodType, setSelectedBloodType] = useState();
    const [quantity, setQuantity] = useState(1);
    const [urgencyLevel, setUrgencyLevel] = useState('NORMAL');
    const [openModal, setOpenModal] = useState(false);

    // User authentication state

    const user = useSelector((state) => state.user);

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
        if (!selectedBank || !user?.id) return;

        const orderData = {
            user_id_fk: user?.id,
            blood_bank_id_fk: selectedBank.id,
            blood_type: bloodType,
            quantity,
            price_at_purchase: selectedBank.price_per_unit || 0,
            urgency_level: 'NORMAL',
            delivery_method: 'PICKUP',
        };

        try {
            const { data: resData } = await instance.post('/orders', orderData);
            const { success, message } = resData;

            if (success) {
                toast.success(message || 'Blood request put successfully');
            }
            handleCloseModal();
            navigate('/requests');
        } catch (err) {
            console.error('Error submitting request:', err);
            toast.error(err?.response?.data?.message || 'Error submitting the request');
        }
    };

    return (
        <Box sx={{ px: 4, py: 6 }}>
            <Typography variant="h4" fontWeight="bold" color="error" textAlign="center" mb={4}>
                Find Blood Near You
            </Typography>

            <form onSubmit={handleSearch}>
                <Box className="flex flex-wrap justify-center gap-2 max-w-[900px] mx-auto mb-4">
                    {/* Blood Type Select */}
                    <select
                        id="blood-type"
                        value={bloodType}
                        onChange={(e) => setBloodType(e.target.value)}
                        className="w-[200px] p-3 rounded-lg border border-gray-300 text-lg bg-white cursor-pointer outline-none">
                        <option value="">Select Blood Type</option>
                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>

                    {/* State Select */}
                    <select
                        id="state"
                        value={state}
                        onChange={(e) => {
                            setState(e.target.value);
                            setDistrict('');
                        }}
                        className="w-[200px] p-3 rounded-lg border border-gray-300 text-lg bg-white cursor-pointer outline-none">
                        <option value="">Select State</option>
                        {states.map((s) => (
                            <option key={s.state} value={s.state}>
                                {s.state}
                            </option>
                        ))}
                    </select>

                    {/* District Select */}
                    <select
                        id="district"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        disabled={!state}
                        className={`w-[200px] p-3 rounded-lg border border-gray-300 text-lg outline-none
                                ${
                                    state
                                        ? 'bg-white cursor-pointer'
                                        : 'bg-gray-200 cursor-not-allowed'
                                }`}>
                        <option value="">Select District</option>
                        {districtsList.map((d) => (
                            <option key={d} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>

                    {/* Search Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SearchIcon />}
                        className="bg-red-700 hover:bg-red-900 min-w-[150px] text-white py-3 px-6 rounded-lg">
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

                                {user?.isAuthenticated ? (
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
                                        onClick={() => (window.location.href = '/auth')}
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
                        value={selectedBloodType || bloodType}
                        fullWidth
                        sx={{ my: 2 }}
                        onChange={(e) => setSelectedBloodType(e.target.value || bloodType)}>
                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((type) => (
                            <MenuItem key={type} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </Select>

                    <InputLabel>Urgency Level</InputLabel>

                    <Select
                        value={urgencyLevel}
                        fullWidth
                        sx={{ my: 2 }}
                        onChange={(e) => setUrgencyLevel(e.target.value)}>
                        {['NORMAL', 'URGENT'].map((type) => (
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
