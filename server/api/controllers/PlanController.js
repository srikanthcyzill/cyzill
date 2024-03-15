import Plan from '../models/PlanModel.js';

export const getPlans = async (req, res) => {
    try {
        const plans = await Plan.find();
        res.json(plans);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createPlan = async (req, res) => {
    try {
        const newPlan = new Plan(req.body);
        const savedPlan = await newPlan.save();
        res.json(savedPlan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updatePlan = async (req, res) => {
    try {
        const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPlan) {
            return res.status(404).json({ message: 'Plan not found' });
        }
        res.json(updatedPlan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deletePlan = async (req, res) => {
    try {
        const deletedPlan = await Plan.findByIdAndDelete(req.params.id);
        if (!deletedPlan) {
            return res.status(404).json({ message: 'Plan not found' });
        }
        res.json(deletedPlan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};