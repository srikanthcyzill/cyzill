import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../config';
import { Button, Input } from '@nextui-org/react';
import { SearchIcon } from '@nextui-org/shared-icons';
import AgentCard from './AgentCard';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const FindAgents = () => {
    const [agents, setAgents] = useState([]);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [agentRequest, setAgentRequest] = useState({
        name: '',
        email: '',
        phoneNumber: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${BASE_URL}/api/admin/agent`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setAgents(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (!agents.length) {
            fetchData();
        }
    }, [agents]);

    const handleInputChange = (e) => {
        setAgentRequest({
            ...agentRequest,
            [e.target.name]: e.target.value
        });
    };

    const handleAgentRequest = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BASE_URL}/api/admin/agent-request`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(agentRequest)
            });
            if (!response.ok) {
                throw new Error('Request failed');
            }
            alert('Request sent successfully');
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    return (
        <div className='mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8'>
            <h1 className="text-2xl font-bold mb-4 text-center">These are the Agents Currently Available</h1>
            <div className="flex justify-between p-2">
                <Button color="primary" auto size="small" className="ml-2" onClick={() => setIsModalOpen(true)}>
                    Become an Agent?
                </Button>
                <Input
                    classNames={{
                        base: 'max-w-full sm:max-w-[15rem] h-10',
                        mainWrapper: 'h-full',
                        input: 'text-small',
                        inputWrapper: 'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
                    }}
                    placeholder='Enter Agent name or Area or Agency'
                    size='sm'
                    startContent={<SearchIcon size={18} />}
                    type='search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-2">
                {agents
                    .filter(agent =>
                        agent.status === 'active' &&
                        ((agent.agentName && agent.agentName.toLowerCase().includes(search.toLowerCase())) ||
                            (agent.agencyName && agent.agencyName.toLowerCase().includes(search.toLowerCase())) ||
                            (agent.serviceArea && agent.serviceArea.toLowerCase().includes(search.toLowerCase())))
                    )
                    .map((agent) => (
                        <div className="agent-card" key={agent.id}>
                            <AgentCard className="w-full" agent={agent} />
                        </div>
                    ))}
            </div>
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <DialogTitle>Become an Agent</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleAgentRequest}>
                        <TextField name="name" label="Name" required value={agentRequest.name} onChange={handleInputChange} />
                        <TextField name="email" label="Email" required value={agentRequest.email} onChange={handleInputChange} />
                        <TextField name="phoneNumber" label="Phone Number" required value={agentRequest.phoneNumber} onChange={handleInputChange} />
                        <DialogActions>
                            <Button type="submit">Submit Request</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FindAgents;
