import React, { useEffect, useState } from "react";
import "./PropertyPricing.css"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../config";

function PlanCard({ plan }) {
    const [properties, setProperties] = useState([]);
    const currentUser = useSelector(state => state.user.currentUser);
    const username = currentUser?.username;
    const cardClass = `card pricing-box ${plan.color} ${plan.name === 'Gold' ? 'gold-card' : ''}`;
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${BASE_URL}/api/property/properties/user/${username}`);
            const data = await response.json();
            console.log(data);
            setProperties(data);
        };

        fetchData();
    }, [username]);
    return (
        <div className="col-md-4">
            <div className={cardClass}>
                <div className="card-block">
                    <h4 className="card-title">{plan.name}</h4>
                    <h6 className="card-text">
                        <span className="amount">{plan.price}</span>
                    </h6>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item text-center d-inline-block">Hosting Days: {plan.days}</li>
                    <li className="list-group-item text-center d-inline-block">Support: {plan.support}</li>
                    <li className="list-group-item text-center d-inline-block">Property Listing: {plan.listing}</li>
                    <li className="list-group-item text-center d-inline-block">Email Support: {plan.emailSupport ? '✓' : 'X'}</li>
                    <li className="list-group-item text-center d-inline-block">Buyer Inquiry: {plan.inquiry}</li>
                </ul>
                <div className="card-block">
                    <Link href="#" className="btn btn-outline-start" title="Get Started">Get Started</Link>
                </div>
            </div>
        </div>
    );
}

export default function MembershipPlans() {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        const fetchPlans = async () => {
            const response = await fetch(`${BASE_URL}/api/admin/plans`);
            const data = await response.json();
            setPlans(data);
        };

        fetchPlans();
    }, []);

    return (
        <section className="pricing-plans text-center">
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-sm-12 col-md-8 col-md-offset-2">
                        <h1 className="section-title">Pricing Plans</h1>
                    </div>
                </div>
                <div className="pricing-box-container">
                    {plans.map((plan, index) => (
                        <PlanCard key={index} plan={plan} />
                    ))}
                </div>
            </div>
        </section>
    );
}
