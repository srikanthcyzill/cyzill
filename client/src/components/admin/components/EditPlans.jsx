import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BASE_URL } from '../../../config';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(3),
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));


const EditPlans = () => {
    const classes = useStyles();
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        const fetchPlans = async () => {
            const response = await fetch(`${BASE_URL}/api/admin/plans`);
            const data = await response.json();
            setPlans(data);
        };

        fetchPlans();
    }, []);

    const handleInputChange = (index, event) => {
        const newPlans = [...plans];
        newPlans[index][event.target.name] = event.target.value;
        setPlans(newPlans);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        for (const plan of plans) {
            await fetch(`${BASE_URL}/api/admin/plans/${plan._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(plan),
            });
        }

        alert('Plans updated!');
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Edit Plans</Typography>
            <form onSubmit={handleSubmit}>
                {plans.map((plan, index) => (
                    <Paper key={index} className={classes.paper}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h5">{plan.name}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    color="secondary"
                                    fullWidth
                                    label="Price"
                                    name="price"
                                    value={plan.price}
                                    onChange={event => handleInputChange(index, event)}
                                />
                            </Grid>
                            <TextField
                                color="secondary"
                                fullWidth
                                label="Days"
                                name="days"
                                value={plan.days}
                                onChange={event => handleInputChange(index, event)}
                            />
                        </Grid>
                    </Paper>
                ))}
                <Button variant="contained" color="primary" type="submit" className={classes.button}>
                    Update Plans
                </Button>
            </form>
        </Container>
    );
}


export default EditPlans