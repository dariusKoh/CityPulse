import { BarChart, Users, MessageSquare } from 'lucide-react';

export default function AdminDashboard() {
    // Mock Data
    const submissions = [
        { id: 1, user: "UrbanNinja", proposal: "Build more sheltered walkways near MRT.", date: "2 mins ago" },
        { id: 2, user: "GreenThumb", proposal: "We need a community garden on the roof.", date: "5 mins ago" },
        { id: 3, user: "CityPlanner2025", proposal: "Less malls, more libraries!", date: "10 mins ago" },
    ];

    return (
        <div className="screen" style={{ background: '#0f172a', padding: '2rem' }}>
            <div className="animate-fade-in w-full max-w-4xl mx-auto">

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.8rem', color: 'white' }}>CityPulse Admin</h1>
                        <p style={{ color: '#94a3b8' }}>Engagement Dashboard</p>
                    </div>
                    <div style={{ background: '#334155', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
                        Live Status: Active
                    </div>
                </div>

                {/* Analytics Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '12px' }}>
                        <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem', color: '#94a3b8' }}>
                            <Users size={18} />
                            <span>Total Players</span>
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 700 }}>1,248</div>
                    </div>
                    <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '12px' }}>
                        <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem', color: '#94a3b8' }}>
                            <BarChart size={18} />
                            <span>Avg Happiness</span>
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)' }}>68%</div>
                    </div>
                    <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '12px' }}>
                        <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem', color: '#94a3b8' }}>
                            <MessageSquare size={18} />
                            <span>Proposals</span>
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-accent)' }}>856</div>
                    </div>
                </div>

                {/* Proposals Table */}
                <div style={{ background: '#1e293b', borderRadius: '16px', overflow: 'hidden' }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid #334155' }}>
                        <h2 style={{ fontSize: '1.2rem' }}>Latest Press Conference Submissions</h2>
                    </div>
                    <div>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ background: '#0f172a', color: '#94a3b8', fontSize: '0.9rem' }}>
                                    <th style={{ padding: '1rem' }}>User</th>
                                    <th style={{ padding: '1rem' }}>Suggestion</th>
                                    <th style={{ padding: '1rem' }}>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.map((item, i) => (
                                    <tr key={item.id} style={{ borderBottom: '1px solid #334155' }}>
                                        <td style={{ padding: '1rem', fontWeight: 600 }}>{item.user}</td>
                                        <td style={{ padding: '1rem', color: '#cbd5e1' }}>{item.proposal}</td>
                                        <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.9rem' }}>{item.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
