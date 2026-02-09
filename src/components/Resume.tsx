import { resumeData } from '@/data/resume';
import { Mail, Phone, MapPin, Globe, ExternalLink, Calendar, Building2, User } from 'lucide-react';

export default function Resume() {
    // Helper to render text with bold markers (**text**) and links ([text](url))
    const renderWithBold = (text: string) => {
        // Split by bold (**...**) OR links ([...](...))
        const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
                const match = part.match(/\[(.*?)\]\((.*?)\)/);
                if (match) {
                    return (
                        <a
                            key={index}
                            href={match[2]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline font-medium"
                        >
                            {match[1]}
                        </a>
                    );
                }
            }
            return part;
        });
    };

    return (
        <div className="w-[210mm] max-w-full mx-auto bg-white shadow-2xl md:my-10 print:shadow-none print:my-0 text-slate-800 flex flex-col md:flex-row print:flex-row overflow-hidden print:overflow-visible print:w-full" id="resume-content">

            {/* Sidebar (Left Column) */}
            <aside className="w-full md:w-[32%] print:w-[30%] bg-slate-900 text-slate-300 p-8 pt-10 print:p-4 print:pt-6 flex flex-col gap-10 print:gap-2 print:min-h-full">

                {/* Photo Container */}
                <div className="flex justify-center mb-2 print:mb-1">
                    <div className="w-32 h-32 md:w-40 md:h-40 print:w-24 print:h-24 rounded-full border-4 border-slate-700 overflow-hidden bg-slate-800 flex items-center justify-center shadow-xl relative group">
                        <img
                            src="/mon.jpg"
                            alt="Reimond Mark Avendano"
                            className="w-full h-full object-cover object-[center_20%]"
                        />
                    </div>
                </div>

                {/* Contact Info (In Sidebar for Modern Look) */}
                <div className='space-y-6 print:space-y-2'>
                    <div className='border-b border-slate-700 pb-2 mb-4 print:mb-2'>
                        <h3 className="text-white font-bold uppercase tracking-widest text-sm">Contact</h3>
                    </div>

                    <ul className="space-y-4 print:space-y-1 text-sm">
                        <li className="flex items-start gap-3 group">
                            <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                            <div>
                                <span className="block text-xs uppercase text-slate-500 font-bold mb-1">Email</span>
                                <a href={`mailto:${resumeData.personalInfo.email}`} className="text-white hover:text-blue-400 transition-colors break-all">
                                    {resumeData.personalInfo.email}
                                </a>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 group">
                            <Phone className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                            <div>
                                <span className="block text-xs uppercase text-slate-500 font-bold mb-1">Phone</span>
                                <span className="text-white">{resumeData.personalInfo.mobile}</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                            <div>
                                <span className="block text-xs uppercase text-slate-500 font-bold mb-1">Location</span>
                                <span className="text-white">{resumeData.personalInfo.address}</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 group">
                            <Globe className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                            <div>
                                <span className="block text-xs uppercase text-slate-500 font-bold mb-1">Portfolio</span>
                                <a href={resumeData.personalInfo.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors break-all">
                                    {resumeData.personalInfo.portfolio}
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Skills (In Sidebar) */}
                <div className='space-y-8 print:space-y-2 break-inside-avoid'>
                    <div className='border-b border-slate-700 pb-2 print:pb-1'>
                        <h3 className="text-white font-bold uppercase tracking-widest text-sm">Skills</h3>
                    </div>

                    <div className="space-y-4 print:space-y-1">
                        {resumeData.skills.softSkills && (
                            <div>
                                <h4 className="text-blue-400 font-bold text-xs uppercase mb-1">Soft Skills & Core Knowledge</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {resumeData.skills.softSkills.map((skill) => (
                                        <span key={skill} className="text-[10px] bg-slate-800 text-slate-200 px-1.5 py-0.5 rounded border border-slate-700">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div>
                            <h4 className="text-blue-400 font-bold text-xs uppercase mb-1">Frontend</h4>
                            <div className="flex flex-wrap gap-1.5">
                                {resumeData.skills.frontend.map((skill) => (
                                    <span key={skill} className="text-[10px] bg-slate-800 text-slate-200 px-1.5 py-0.5 rounded border border-slate-700">{skill}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-blue-400 font-bold text-xs uppercase mb-1">Backend</h4>
                            <div className="flex flex-wrap gap-1.5">
                                {resumeData.skills.backend.map((skill) => (
                                    <span key={skill} className="text-[10px] bg-slate-800 text-slate-200 px-1.5 py-0.5 rounded border border-slate-700">{skill}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-blue-400 font-bold text-xs uppercase mb-1">Database</h4>
                            <div className="flex flex-wrap gap-1.5">
                                {resumeData.skills.database.map((skill) => (
                                    <span key={skill} className="text-[10px] bg-slate-800 text-slate-200 px-1.5 py-0.5 rounded border border-slate-700">{skill}</span>
                                ))}
                            </div>
                        </div>
                        {resumeData.skills.mobile && (
                            <div>
                                <h4 className="text-blue-400 font-bold text-xs uppercase mb-1">Mobile</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {resumeData.skills.mobile.map((skill) => (
                                        <span key={skill} className="text-[10px] bg-slate-800 text-slate-200 px-1.5 py-0.5 rounded border border-slate-700">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {resumeData.skills.devops && (
                            <div>
                                <h4 className="text-blue-400 font-bold text-xs uppercase mb-1">DevOps & Infrastructure</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {resumeData.skills.devops.map((skill) => (
                                        <span key={skill} className="text-[10px] bg-slate-800 text-slate-200 px-1.5 py-0.5 rounded border border-slate-700">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div>
                            <h4 className="text-blue-400 font-bold text-xs uppercase mb-1">Tools</h4>
                            <div className="flex flex-wrap gap-1.5">
                                {resumeData.skills.tools.map((skill) => (
                                    <span key={skill} className="text-[10px] bg-slate-800 text-slate-200 px-1.5 py-0.5 rounded border border-slate-700">{skill}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* References (In Sidebar or bottom main? Sidebar fits well for 2-page balance) */}
                <div className="print:break-before-page print:pt-4">
                    <div className='border-b border-slate-700 pb-2 mb-4 print:mb-2 break-inside-avoid'>
                        <h3 className="text-white font-bold uppercase tracking-widest text-sm">References</h3>
                    </div>
                    <div className="flex flex-col gap-6 print:gap-4">
                        {resumeData.references.map((ref, idx) => (
                            <div key={idx} className="text-sm">
                                <div className="font-bold text-white mb-0.5">{ref.name}</div>
                                <div className="text-slate-400 text-xs mb-2 opacity-80">{ref.company}</div>
                                <div className="flex flex-col gap-1 text-xs">
                                    <span className="text-slate-400 flex items-center gap-2"><Phone className="w-3 h-3" /> {ref.contact}</span>
                                    <a href={`mailto:${ref.email}`} className="text-slate-400 hover:text-white flex items-center gap-2 truncate"><Mail className="w-3 h-3" /> {ref.email}</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </aside>

            {/* Main Content (Right Column) */}
            <main className="flex-1 p-8 pt-12 md:p-12 print:p-5 print:pt-6 flex flex-col gap-10 print:gap-4 bg-white">

                {/* Header Area */}
                <header className="border-l-4 border-blue-600 pl-6 relative">
                    <h1 className="text-4xl md:text-5xl print:text-3xl font-black text-slate-900 tracking-tight uppercase leading-none mb-3 print:mb-1">
                        {resumeData.personalInfo.name.split(' ').map((n, i) => (
                            <span key={i} className="block">{n}</span>
                        ))}
                    </h1>
                    <p className="text-lg md:text-xl text-blue-600 font-medium tracking-widest uppercase">{resumeData.personalInfo.title}</p>

                    {/* Decorative Shape */}
                    <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-slate-50 rounded-full blur-2xl opacity-50 z-0 pointer-events-none print:hidden"></div>
                </header>

                {/* Professional Summary */}
                <section className="relative z-10">
                    <h2 className="flex items-center gap-4 text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 print:mb-3 group">
                        <span className="w-8 h-1 bg-blue-600 rounded-full group-hover:w-12 transition-all"></span>
                        Professional Summary
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed text-justify">{resumeData.summary}</p>
                </section>

                {/* Experience */}
                <section className="flex-1">
                    <h2 className="flex items-center gap-4 text-sm font-bold text-slate-900 uppercase tracking-widest mb-8 print:mb-4 group">
                        <span className="w-8 h-1 bg-blue-600 rounded-full group-hover:w-12 transition-all"></span>
                        Professional Experience
                    </h2>

                    <div className="flex flex-col gap-8 print:gap-3 relative pb-4">

                        {resumeData.experience.map((exp, index) => (
                            <div key={index} className={`relative ${exp.role === 'Scrum Master' ? 'print:break-before-page print:pt-6' : ''}`}>

                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2 print:mb-1 break-inside-avoid">
                                    <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                                    <span className="text-sm font-bold text-blue-600/80 bg-blue-50 px-3 py-1 rounded-full mt-1 sm:mt-0 print:bg-transparent print:p-0 print:text-slate-500 whitespace-nowrap">
                                        <Calendar className="w-3 h-3 inline mr-1.5 -mt-0.5" />
                                        {exp.period}
                                    </span>
                                </div>

                                <div className="text-slate-500 font-semibold mb-4 print:mb-1 flex items-center gap-2">
                                    <Building2 className="w-4 h-4" />
                                    {exp.company}
                                </div>

                                {exp.description && <p className="text-slate-600 mb-4 print:mb-1 leading-relaxed text-sm">{renderWithBold(exp.description)}</p>}

                                {exp.achievements && (
                                    <ul className="space-y-1.5 print:space-y-0.5 mb-4 print:mb-1">
                                        {exp.achievements.map((ach, idx) => (
                                            <li key={idx} className="text-slate-600 text-sm flex items-start gap-2.5">
                                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 shrink-0"></span>
                                                <span>{renderWithBold(ach)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {exp.projects && (
                                    <div className="grid grid-cols-1 print:grid-cols-2 gap-3 mt-4 print:mt-2">
                                        {exp.projects.map((proj, idx) => (
                                            <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-100 print:bg-transparent print:border-slate-200 print:p-1 print:pl-0 break-inside-avoid">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <ExternalLink className="w-3 h-3 text-blue-500" />
                                                    <div className="font-bold text-slate-900 text-sm">{proj.name}</div>
                                                </div>
                                                <div className="text-slate-500 text-xs leading-relaxed pl-5">{renderWithBold(proj.desc)}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {exp.stack && (
                                    <div className="mt-2 print:mt-1 text-xs text-slate-400 font-mono pl-1 border-t border-slate-100 pt-2 print:pt-1 break-inside-avoid">
                                        <strong className="text-slate-500">Tech Stack:</strong> {exp.stack}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
}
