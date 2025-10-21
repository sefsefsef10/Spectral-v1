import React, { useContext } from 'react';
import { AuditLogContext } from '../context/AuditLogContext';

const AuditLog: React.FC = () => {
    const { logs } = useContext(AuditLogContext);

    if (logs.length === 0) {
        return <p className="text-center text-slate-500 py-8">No actions have been recorded yet.</p>;
    }

    return (
        <div className="flow-root">
            <ul role="list" className="-mb-8">
                {logs.map((log, logIdx) => (
                    <li key={log.id}>
                        <div className="relative pb-8">
                            {logIdx !== logs.length - 1 ? (
                                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true" />
                            ) : null}
                            <div className="relative flex space-x-3">
                                <div>
                                    <span className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center ring-8 ring-white">
                                        <svg className="h-5 w-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                    <div>
                                        <p className="text-sm text-slate-500">
                                            <span className="font-medium text-slate-900">{log.user}</span> {log.action.toLowerCase()}
                                        </p>
                                        <p className="text-sm text-slate-500 mt-1">{log.details}</p>
                                    </div>
                                    <div className="text-right text-sm whitespace-nowrap text-slate-500">
                                        <time dateTime={log.timestamp}>{new Date(log.timestamp).toLocaleString()}</time>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuditLog;
