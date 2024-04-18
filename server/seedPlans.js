import mongoose from 'mongoose';
import Plan from './api/models/PlanModel.js';
import dotenv from 'dotenv';

dotenv.config();

const seedPlans = async () => {
    const initialPlanDetails = [
        {
            name: "Bronze",
            days: "29 days",
            support: "Business hours only",
            listing: "Instantly",
            emailSupport: true,
            inquiry: "Unlimited",
            price: "₹ 49",
        },
        {
            name: "Silver",
            days: "89 days",
            support: "Business hours only",
            listing: "Instantly",
            emailSupport: true,
            inquiry: "Unlimited",
            price: "₹ 129",
        },
        {
            name: "Gold",
            days: "186 days",
            support: "Business hours only",
            listing: "Instantly",
            emailSupport: true,
            inquiry: "Unlimited",
            price: "₹ 309",
        },
        {
            name: "Platinum",
            days: "365 days",
            support: "Business hours only",
            listing: "Instantly",
            emailSupport: true,
            inquiry: "Unlimited",
            price: "₹ 369",
        },
    ];

    try {
        await mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });

        // Clear existing data
        await Plan.deleteMany();

        // Seed initial plans data
        await Plan.insertMany(initialPlanDetails);
        console.log('Plans seeded successfully');
    } catch (error) {
        console.error('Error seeding plans:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedPlans();
