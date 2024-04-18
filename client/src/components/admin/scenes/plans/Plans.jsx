import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button, Alert } from '@mui/material';
import { useGetPlansQuery, useUpdatePlanMutation } from '../../state/api';

const Plans = () => {
    const { data: initialPlanDetails, isLoading: plansLoading, isError: plansError } = useGetPlansQuery();
    const [updatePlan, { isLoading: updateLoading, isError: updateError }] = useUpdatePlanMutation();
    const [planDetails, setPlanDetails] = useState([]);
    const [updateStatus, setUpdateStatus] = useState(null);

    useEffect(() => {
        if (initialPlanDetails) {
            setPlanDetails(initialPlanDetails);
        }
    }, [initialPlanDetails]);

    const handlePlanChange = (index, field, value) => {
        const updatedPlans = [...planDetails];
        updatedPlans[index] = { ...updatedPlans[index], [field]: value };
        setPlanDetails(updatedPlans);
    };

    const handleSaveChanges = async (plan) => {
        try {
            await updatePlan({ id: plan._id, updatedPlan: plan }).unwrap();
            console.log("Plan updated successfully!");
            setUpdateStatus({ message: "Plans updated successfully!", severity: "success" });
        } catch (error) {
            console.error("Error updating plan:", error);
            setUpdateStatus({ message: "Error updating plans", severity: "error" });
        }
    };

    if (plansLoading) return <div>Loading...</div>;
    if (plansError) return <div>Error fetching plans: {plansError.message}</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                {planDetails.map((plan, index) => (
                    <Card key={index} style={{ width: 250, marginBottom: 20 }}>
                        <CardContent>
                            <Typography variant="h5" color="textSecondary" gutterBottom>
                                {plan.name}
                            </Typography>
                            <TextField
                                label="Days"
                                value={plan.days}
                                onChange={(e) => handlePlanChange(index, 'days', e.target.value)}
                                fullWidth
                                style={{ marginBottom: '10px' }}
                            />
                            <TextField
                                label="Support"
                                value={plan.support}
                                onChange={(e) => handlePlanChange(index, 'support', e.target.value)}
                                fullWidth
                                style={{ marginBottom: '10px' }}
                            />
                            <TextField
                                label="Listing"
                                value={plan.listing}
                                onChange={(e) => handlePlanChange(index, 'listing', e.target.value)}
                                fullWidth
                                style={{ marginBottom: '10px' }}
                            />
                            <TextField
                                label="Price"
                                value={plan.price}
                                onChange={(e) => handlePlanChange(index, 'price', e.target.value)}
                                fullWidth
                                style={{ marginBottom: '10px' }}
                            />
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                {updateStatus && (
                    <Alert severity={updateStatus.severity}>
                        {updateStatus.message}
                    </Alert>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setUpdateStatus(null);
                        planDetails.forEach(plan => handleSaveChanges(plan));
                    }}
                >
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

export default Plans;
