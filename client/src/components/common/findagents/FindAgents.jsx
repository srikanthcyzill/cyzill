import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../config';
import { Input } from '@nextui-org/react';
import { SearchIcon } from '@nextui-org/shared-icons';
import AgentCard from './AgentCard';

const FindAgents = () => {
    const [agents, setAgents] = useState([]);
    const [search, setSearch] = useState('');

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

    return (
        <div className='mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8' >
            <h1 className="text-2xl font-bold mb-4 text-center">These are the Agents Currently Available</h1>
            <div className="flex justify-end p-2">
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
        </div>
    );
};

export default FindAgents;
