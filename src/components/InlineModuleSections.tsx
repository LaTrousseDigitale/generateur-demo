import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DemoConfig } from "./DemoGenerator";
import { 
  FileText, Download, Calendar, Ticket, Users, FolderKanban,
  UserCog, BookOpen, MessageSquare, UserPlus, PenTool, BarChart3,
  CheckCircle2, ArrowRight, Plus, Search, Filter, Clock, Star,
  Mail, Phone, AlertCircle, TrendingUp, Eye, Send
} from "lucide-react";

interface ModuleSectionProps {
  config: DemoConfig;
  themeConfig: {
    sectionBg?: string;
    sectionAlt?: string;
    cardBg: string;
    textPrimary: string;
    textSecondary: string;
  };
  isLightTheme?: boolean;
}

// Dynamic gradient background
const GradientBackground = ({ color, isLight }: { color: string; isLight?: boolean }) => {
  if (isLight) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-1/2 -right-1/4 w-full h-full rounded-full blur-[120px] opacity-25"
          style={{ backgroundColor: color }}
        />
        <div 
          className="absolute -bottom-1/4 -left-1/4 w-3/4 h-3/4 rounded-full blur-[100px] opacity-15"
          style={{ backgroundColor: color }}
        />
      </div>
    );
  }
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: color }}
      />
      <div 
        className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// CALCULATEUR PDF - Devis/Estimations
// ═══════════════════════════════════════════════════════════════
export const PDFCalculatorSection = ({ config, themeConfig, isLightTheme }: ModuleSectionProps) => {
  const [formData, setFormData] = useState({ service: '', quantity: 1 });

  return (
    <section 
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ 
        background: isLightTheme 
          ? `linear-gradient(135deg, ${config.primaryColor}08 0%, white 50%, ${config.accentColor || config.primaryColor}05 100%)`
          : themeConfig.sectionBg 
      }}
    >
      <GradientBackground color={config.primaryColor} isLight={isLightTheme} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 font-bold text-sm tracking-wide uppercase"
              style={{ backgroundColor: `${config.primaryColor}15`, color: config.primaryColor }}
            >
              <FileText className="w-4 h-4" />
              <span>Calculateur de prix</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary} mb-2`}>
              Estimez votre projet
            </h2>
            <h3 className="text-3xl md:text-4xl font-black mb-4" style={{ color: config.primaryColor }}>
              en quelques clics
            </h3>
          </div>

          <div className={`rounded-3xl p-8 ${isLightTheme ? 'bg-white shadow-xl' : 'bg-white/5 backdrop-blur-xl border border-white/10'}`}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${themeConfig.textPrimary}`}>Type de service</label>
                <select 
                  className={`w-full px-4 py-3 rounded-xl border-2 ${isLightTheme ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10 text-white'}`}
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                >
                  <option value="">Sélectionnez...</option>
                  <option value="consultation">Consultation</option>
                  <option value="installation">Installation</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="reparation">Réparation</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${themeConfig.textPrimary}`}>Quantité</label>
                <input 
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 1})}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${isLightTheme ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10 text-white'}`}
                />
              </div>
            </div>
            
            <div 
              className="p-6 rounded-2xl mb-6"
              style={{ backgroundColor: `${config.primaryColor}10` }}
            >
              <div className="flex justify-between items-center">
                <span className={`font-semibold ${themeConfig.textPrimary}`}>Estimation totale</span>
                <span className="text-3xl font-black" style={{ color: config.primaryColor }}>
                  {formData.service ? `${(formData.quantity * 150).toLocaleString('fr-CA')} $` : '— $'}
                </span>
              </div>
            </div>
            
            <Button 
              className="w-full h-14 text-lg font-bold text-white rounded-xl"
              style={{ backgroundColor: config.primaryColor }}
            >
              <Download className="w-5 h-5 mr-2" />
              Télécharger le devis PDF
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════
// GESTION DE TICKETS
// ═══════════════════════════════════════════════════════════════
export const TicketSystemSection = ({ config, themeConfig, isLightTheme }: ModuleSectionProps) => {
  const tickets = [
    { id: '#1234', subject: 'Question sur ma commande', status: 'En cours', priority: 'Normal', date: 'Il y a 2h' },
    { id: '#1233', subject: 'Problème de connexion', status: 'Résolu', priority: 'Urgent', date: 'Hier' },
    { id: '#1232', subject: 'Demande de remboursement', status: 'En attente', priority: 'Normal', date: 'Il y a 3 jours' },
  ];

  return (
    <section 
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: isLightTheme ? 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)' : themeConfig.sectionBg }}
    >
      <GradientBackground color={config.primaryColor} isLight={isLightTheme} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 font-bold text-sm tracking-wide uppercase"
              style={{ backgroundColor: `${config.primaryColor}15`, color: config.primaryColor }}
            >
              <Ticket className="w-4 h-4" />
              <span>Support client</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary} mb-2`}>
              Vos demandes
            </h2>
            <h3 className="text-3xl md:text-4xl font-black" style={{ color: config.primaryColor }}>
              suivies en temps réel
            </h3>
          </div>

          <div className={`rounded-3xl overflow-hidden ${isLightTheme ? 'bg-white shadow-xl' : 'bg-white/5 backdrop-blur-xl border border-white/10'}`}>
            {/* Header */}
            <div className="p-6 border-b" style={{ borderColor: isLightTheme ? '#e2e8f0' : 'rgba(255,255,255,0.1)' }}>
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-2">
                  <Button size="sm" style={{ backgroundColor: config.primaryColor }} className="text-white">
                    <Plus className="w-4 h-4 mr-1" /> Nouveau ticket
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className={isLightTheme ? '' : 'border-white/20 text-white'}>
                    <Filter className="w-4 h-4 mr-1" /> Filtrer
                  </Button>
                  <Button size="sm" variant="outline" className={isLightTheme ? '' : 'border-white/20 text-white'}>
                    <Search className="w-4 h-4 mr-1" /> Rechercher
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Tickets list */}
            <div className="divide-y" style={{ borderColor: isLightTheme ? '#e2e8f0' : 'rgba(255,255,255,0.1)' }}>
              {tickets.map((ticket) => (
                <div key={ticket.id} className="p-5 hover:bg-slate-50/50 transition-colors flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${config.primaryColor}15` }}
                    >
                      <Ticket className="w-5 h-5" style={{ color: config.primaryColor }} />
                    </div>
                    <div>
                      <p className={`font-bold ${themeConfig.textPrimary}`}>{ticket.subject}</p>
                      <p className={`text-sm ${themeConfig.textSecondary}`}>{ticket.id} · {ticket.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span 
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        ticket.status === 'Résolu' 
                          ? 'bg-green-100 text-green-700' 
                          : ticket.status === 'En cours' 
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {ticket.status}
                    </span>
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════
// CRM LITE
// ═══════════════════════════════════════════════════════════════
export const CRMLiteSection = ({ config, themeConfig, isLightTheme }: ModuleSectionProps) => {
  const contacts = [
    { name: 'Marie Dupont', company: 'Tech Solutions', status: 'Client', value: '15 000 $' },
    { name: 'Pierre Martin', company: 'Design Co', status: 'Prospect', value: '8 500 $' },
    { name: 'Sophie Bernard', company: 'Marketing Plus', status: 'Lead', value: '22 000 $' },
  ];

  return (
    <section 
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: isLightTheme ? `linear-gradient(180deg, white 0%, ${config.primaryColor}05 100%)` : themeConfig.sectionBg }}
    >
      <GradientBackground color={config.primaryColor} isLight={isLightTheme} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 font-bold text-sm tracking-wide uppercase"
              style={{ backgroundColor: `${config.primaryColor}15`, color: config.primaryColor }}
            >
              <Users className="w-4 h-4" />
              <span>CRM intégré</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary} mb-2`}>
              Gérez vos contacts
            </h2>
            <h3 className="text-3xl md:text-4xl font-black" style={{ color: config.primaryColor }}>
              et opportunités
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Contacts', value: '248', icon: Users },
              { label: 'Opportunités', value: '32', icon: Star },
              { label: 'Valeur pipeline', value: '185K $', icon: TrendingUp },
            ].map((stat, i) => (
              <div key={i} className={`p-6 rounded-2xl text-center ${isLightTheme ? 'bg-white shadow-lg' : 'bg-white/5 border border-white/10'}`}>
                <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${config.primaryColor}15` }}>
                  <stat.icon className="w-6 h-6" style={{ color: config.primaryColor }} />
                </div>
                <p className="text-3xl font-black" style={{ color: config.primaryColor }}>{stat.value}</p>
                <p className={`text-sm ${themeConfig.textSecondary}`}>{stat.label}</p>
              </div>
            ))}
          </div>

          <div className={`rounded-3xl overflow-hidden ${isLightTheme ? 'bg-white shadow-xl' : 'bg-white/5 backdrop-blur-xl border border-white/10'}`}>
            <div className="p-5 border-b" style={{ borderColor: isLightTheme ? '#e2e8f0' : 'rgba(255,255,255,0.1)' }}>
              <h4 className={`font-bold ${themeConfig.textPrimary}`}>Contacts récents</h4>
            </div>
            <div className="divide-y" style={{ borderColor: isLightTheme ? '#e2e8f0' : 'rgba(255,255,255,0.1)' }}>
              {contacts.map((contact, i) => (
                <div key={i} className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: config.primaryColor }}>
                      {contact.name.charAt(0)}
                    </div>
                    <div>
                      <p className={`font-bold ${themeConfig.textPrimary}`}>{contact.name}</p>
                      <p className={`text-sm ${themeConfig.textSecondary}`}>{contact.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      contact.status === 'Client' ? 'bg-green-100 text-green-700' : contact.status === 'Prospect' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>{contact.status}</span>
                    <p className={`text-sm font-semibold mt-1 ${themeConfig.textSecondary}`}>{contact.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════
// GESTION DE PROJETS LITE
// ═══════════════════════════════════════════════════════════════
export const ProjectsLiteSection = ({ config, themeConfig, isLightTheme }: ModuleSectionProps) => {
  const projects = [
    { name: 'Refonte site web', progress: 75, status: 'En cours', deadline: '15 déc.' },
    { name: 'App mobile v2', progress: 45, status: 'En cours', deadline: '20 déc.' },
    { name: 'Migration serveur', progress: 100, status: 'Terminé', deadline: '10 déc.' },
  ];

  return (
    <section 
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: isLightTheme ? 'linear-gradient(180deg, #fafafa 0%, #ffffff 100%)' : themeConfig.sectionBg }}
    >
      <GradientBackground color={config.primaryColor} isLight={isLightTheme} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 font-bold text-sm tracking-wide uppercase"
              style={{ backgroundColor: `${config.primaryColor}15`, color: config.primaryColor }}
            >
              <FolderKanban className="w-4 h-4" />
              <span>Gestion de projets</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary} mb-2`}>
              Suivez vos projets
            </h2>
            <h3 className="text-3xl md:text-4xl font-black" style={{ color: config.primaryColor }}>
              en temps réel
            </h3>
          </div>

          <div className="grid gap-6">
            {projects.map((project, i) => (
              <div key={i} className={`p-6 rounded-2xl ${isLightTheme ? 'bg-white shadow-lg' : 'bg-white/5 border border-white/10'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${config.primaryColor}15` }}>
                      <FolderKanban className="w-6 h-6" style={{ color: config.primaryColor }} />
                    </div>
                    <div>
                      <p className={`font-bold text-lg ${themeConfig.textPrimary}`}>{project.name}</p>
                      <p className={`text-sm ${themeConfig.textSecondary}`}>Échéance: {project.deadline}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    project.status === 'Terminé' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>{project.status}</span>
                </div>
                <div className="relative">
                  <div className={`h-3 rounded-full ${isLightTheme ? 'bg-slate-100' : 'bg-white/10'}`}>
                    <div 
                      className="h-3 rounded-full transition-all"
                      style={{ width: `${project.progress}%`, backgroundColor: config.primaryColor }}
                    />
                  </div>
                  <span className={`absolute right-0 -top-6 text-sm font-bold ${themeConfig.textPrimary}`}>{project.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════
// RH LITE
// ═══════════════════════════════════════════════════════════════
export const HRLiteSection = ({ config, themeConfig, isLightTheme }: ModuleSectionProps) => {
  const employees = [
    { name: 'Alice Martin', role: 'Développeuse', status: 'Présente', avatar: 'AM' },
    { name: 'Bob Tremblay', role: 'Designer', status: 'En congé', avatar: 'BT' },
    { name: 'Claire Dubois', role: 'Marketing', status: 'Présente', avatar: 'CD' },
  ];

  return (
    <section 
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: isLightTheme ? `linear-gradient(135deg, white 0%, ${config.primaryColor}05 100%)` : themeConfig.sectionBg }}
    >
      <GradientBackground color={config.primaryColor} isLight={isLightTheme} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 font-bold text-sm tracking-wide uppercase"
              style={{ backgroundColor: `${config.primaryColor}15`, color: config.primaryColor }}
            >
              <UserCog className="w-4 h-4" />
              <span>Ressources humaines</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary} mb-2`}>
              Gérez votre équipe
            </h2>
            <h3 className="text-3xl md:text-4xl font-black" style={{ color: config.primaryColor }}>
              simplement
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {employees.map((emp, i) => (
              <div key={i} className={`p-6 rounded-2xl text-center ${isLightTheme ? 'bg-white shadow-lg' : 'bg-white/5 border border-white/10'}`}>
                <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-4" style={{ backgroundColor: config.primaryColor }}>
                  {emp.avatar}
                </div>
                <p className={`font-bold text-lg ${themeConfig.textPrimary}`}>{emp.name}</p>
                <p className={`text-sm ${themeConfig.textSecondary} mb-3`}>{emp.role}</p>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  emp.status === 'Présente' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>{emp.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════
// BASE DE CONNAISSANCES
// ═══════════════════════════════════════════════════════════════
export const KnowledgeBaseSection = ({ config, themeConfig, isLightTheme }: ModuleSectionProps) => {
  const articles = [
    { title: 'Guide de démarrage rapide', category: 'Tutoriels', views: 1250 },
    { title: 'FAQ - Questions fréquentes', category: 'Support', views: 890 },
    { title: 'Bonnes pratiques', category: 'Documentation', views: 654 },
  ];

  return (
    <section 
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: isLightTheme ? 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)' : themeConfig.sectionBg }}
    >
      <GradientBackground color={config.primaryColor} isLight={isLightTheme} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 font-bold text-sm tracking-wide uppercase"
              style={{ backgroundColor: `${config.primaryColor}15`, color: config.primaryColor }}
            >
              <BookOpen className="w-4 h-4" />
              <span>Base de connaissances</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary} mb-2`}>
              Trouvez vos réponses
            </h2>
            <h3 className="text-3xl md:text-4xl font-black" style={{ color: config.primaryColor }}>
              instantanément
            </h3>
          </div>

          {/* Search */}
          <div className={`p-2 rounded-2xl flex gap-2 mb-8 ${isLightTheme ? 'bg-white shadow-lg' : 'bg-white/5 border border-white/10'}`}>
            <input 
              type="text"
              placeholder="Rechercher dans la documentation..."
              className={`flex-1 px-5 py-3 rounded-xl bg-transparent ${themeConfig.textPrimary}`}
            />
            <Button className="px-6 text-white" style={{ backgroundColor: config.primaryColor }}>
              <Search className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid gap-4">
            {articles.map((article, i) => (
              <div key={i} className={`p-5 rounded-2xl flex items-center justify-between hover:scale-[1.02] transition-transform cursor-pointer ${isLightTheme ? 'bg-white shadow-md hover:shadow-lg' : 'bg-white/5 border border-white/10'}`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${config.primaryColor}15` }}>
                    <BookOpen className="w-6 h-6" style={{ color: config.primaryColor }} />
                  </div>
                  <div>
                    <p className={`font-bold ${themeConfig.textPrimary}`}>{article.title}</p>
                    <p className={`text-sm ${themeConfig.textSecondary}`}>{article.category} · {article.views} vues</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5" style={{ color: config.primaryColor }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════
// CHAT INTERNE
// ═══════════════════════════════════════════════════════════════
export const InternalChatSection = ({ config, themeConfig, isLightTheme }: ModuleSectionProps) => {
  const messages = [
    { sender: 'Marie D.', message: 'Le rapport est prêt pour validation', time: '10:32', isMe: false },
    { sender: 'Vous', message: 'Parfait, je regarde ça tout de suite !', time: '10:35', isMe: true },
    { sender: 'Marie D.', message: 'Merci ! N\'hésite pas si tu as des questions', time: '10:36', isMe: false },
  ];

  return (
    <section 
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: isLightTheme ? `linear-gradient(180deg, white 0%, ${config.primaryColor}05 100%)` : themeConfig.sectionBg }}
    >
      <GradientBackground color={config.primaryColor} isLight={isLightTheme} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 font-bold text-sm tracking-wide uppercase"
              style={{ backgroundColor: `${config.primaryColor}15`, color: config.primaryColor }}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat d'équipe</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary} mb-2`}>
              Communiquez
            </h2>
            <h3 className="text-3xl md:text-4xl font-black" style={{ color: config.primaryColor }}>
              en temps réel
            </h3>
          </div>

          <div className={`rounded-3xl overflow-hidden ${isLightTheme ? 'bg-white shadow-xl' : 'bg-white/5 backdrop-blur-xl border border-white/10'}`}>
            <div className="p-4 border-b flex items-center gap-3" style={{ borderColor: isLightTheme ? '#e2e8f0' : 'rgba(255,255,255,0.1)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: config.primaryColor }}>
                MD
              </div>
              <div>
                <p className={`font-bold ${themeConfig.textPrimary}`}>Marie Dupont</p>
                <p className="text-xs text-green-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500" /> En ligne
                </p>
              </div>
            </div>
            
            <div className="p-5 space-y-4 min-h-[250px]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                      msg.isMe 
                        ? 'text-white rounded-br-none' 
                        : `${isLightTheme ? 'bg-slate-100' : 'bg-white/10'} rounded-bl-none`
                    }`}
                    style={msg.isMe ? { backgroundColor: config.primaryColor } : {}}
                  >
                    <p className={msg.isMe ? 'text-white' : themeConfig.textPrimary}>{msg.message}</p>
                    <p className={`text-xs mt-1 ${msg.isMe ? 'text-white/70' : themeConfig.textSecondary}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t flex gap-2" style={{ borderColor: isLightTheme ? '#e2e8f0' : 'rgba(255,255,255,0.1)' }}>
              <input 
                type="text"
                placeholder="Écrivez votre message..."
                className={`flex-1 px-4 py-3 rounded-xl bg-transparent border ${isLightTheme ? 'border-slate-200' : 'border-white/10'} ${themeConfig.textPrimary}`}
              />
              <Button className="px-6 text-white" style={{ backgroundColor: config.primaryColor }}>
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════
// KPI DASHBOARD
// ═══════════════════════════════════════════════════════════════
export const KPIDashboardSection = ({ config, themeConfig, isLightTheme }: ModuleSectionProps) => {
  const kpis = [
    { label: 'Chiffre d\'affaires', value: '125 430 $', change: '+12%', positive: true },
    { label: 'Nouveaux clients', value: '48', change: '+8%', positive: true },
    { label: 'Taux de conversion', value: '3.2%', change: '-0.5%', positive: false },
    { label: 'Satisfaction client', value: '94%', change: '+2%', positive: true },
  ];

  return (
    <section 
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: isLightTheme ? 'linear-gradient(180deg, #fafafa 0%, #ffffff 100%)' : themeConfig.sectionBg }}
    >
      <GradientBackground color={config.primaryColor} isLight={isLightTheme} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 font-bold text-sm tracking-wide uppercase"
              style={{ backgroundColor: `${config.primaryColor}15`, color: config.primaryColor }}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Tableaux de bord</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary} mb-2`}>
              Vos indicateurs clés
            </h2>
            <h3 className="text-3xl md:text-4xl font-black" style={{ color: config.primaryColor }}>
              en un coup d'œil
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, i) => (
              <div key={i} className={`p-6 rounded-2xl ${isLightTheme ? 'bg-white shadow-lg' : 'bg-white/5 border border-white/10'}`}>
                <p className={`text-sm font-semibold ${themeConfig.textSecondary} mb-2`}>{kpi.label}</p>
                <p className="text-3xl font-black mb-2" style={{ color: config.primaryColor }}>{kpi.value}</p>
                <p className={`text-sm font-bold flex items-center gap-1 ${kpi.positive ? 'text-green-500' : 'text-red-500'}`}>
                  <TrendingUp className={`w-4 h-4 ${!kpi.positive && 'rotate-180'}`} />
                  {kpi.change} ce mois
                </p>
              </div>
            ))}
          </div>

          {/* Simple chart placeholder */}
          <div className={`mt-8 p-8 rounded-3xl ${isLightTheme ? 'bg-white shadow-xl' : 'bg-white/5 border border-white/10'}`}>
            <h4 className={`font-bold text-lg mb-6 ${themeConfig.textPrimary}`}>Évolution mensuelle</h4>
            <div className="flex items-end justify-between gap-4 h-48">
              {[65, 45, 80, 55, 90, 70, 85, 95, 75, 88, 92, 100].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full rounded-t-lg transition-all hover:opacity-80"
                    style={{ height: `${height}%`, backgroundColor: config.primaryColor }}
                  />
                  <span className={`text-xs ${themeConfig.textSecondary}`}>
                    {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════
// SIGNATURES ÉLECTRONIQUES
// ═══════════════════════════════════════════════════════════════
export const SignaturesSection = ({ config, themeConfig, isLightTheme }: ModuleSectionProps) => {
  return (
    <section 
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: isLightTheme ? `linear-gradient(135deg, white 0%, ${config.primaryColor}05 100%)` : themeConfig.sectionBg }}
    >
      <GradientBackground color={config.primaryColor} isLight={isLightTheme} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 font-bold text-sm tracking-wide uppercase"
              style={{ backgroundColor: `${config.primaryColor}15`, color: config.primaryColor }}
            >
              <PenTool className="w-4 h-4" />
              <span>Signature électronique</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary} mb-2`}>
              Signez vos documents
            </h2>
            <h3 className="text-3xl md:text-4xl font-black" style={{ color: config.primaryColor }}>
              en toute sécurité
            </h3>
          </div>

          <div className={`rounded-3xl p-8 ${isLightTheme ? 'bg-white shadow-xl' : 'bg-white/5 backdrop-blur-xl border border-white/10'}`}>
            <div className="flex items-center justify-between mb-6 p-4 rounded-xl" style={{ backgroundColor: `${config.primaryColor}10` }}>
              <div className="flex items-center gap-4">
                <FileText className="w-10 h-10" style={{ color: config.primaryColor }} />
                <div>
                  <p className={`font-bold ${themeConfig.textPrimary}`}>Contrat_Service_2024.pdf</p>
                  <p className={`text-sm ${themeConfig.textSecondary}`}>En attente de signature</p>
                </div>
              </div>
              <AlertCircle className="w-6 h-6 text-yellow-500" />
            </div>

            <div className={`p-6 rounded-xl border-2 border-dashed mb-6 text-center ${isLightTheme ? 'border-slate-300' : 'border-white/20'}`}>
              <PenTool className="w-12 h-12 mx-auto mb-3" style={{ color: config.primaryColor }} />
              <p className={`font-semibold ${themeConfig.textPrimary}`}>Zone de signature</p>
              <p className={`text-sm ${themeConfig.textSecondary}`}>Cliquez ou dessinez votre signature ici</p>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1 h-14 text-white font-bold" style={{ backgroundColor: config.primaryColor }}>
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Signer le document
              </Button>
              <Button variant="outline" className="h-14 px-6" style={{ borderColor: config.primaryColor, color: config.primaryColor }}>
                Refuser
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════
// ONBOARDING AUTOMATISÉ
// ═══════════════════════════════════════════════════════════════
export const OnboardingSection = ({ config, themeConfig, isLightTheme }: ModuleSectionProps) => {
  const steps = [
    { title: 'Bienvenue', description: 'Découvrez votre espace', completed: true },
    { title: 'Profil', description: 'Complétez vos informations', completed: true },
    { title: 'Équipe', description: 'Invitez vos collaborateurs', completed: false },
    { title: 'Configuration', description: 'Personnalisez votre compte', completed: false },
  ];

  return (
    <section 
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: isLightTheme ? 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)' : themeConfig.sectionBg }}
    >
      <GradientBackground color={config.primaryColor} isLight={isLightTheme} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 font-bold text-sm tracking-wide uppercase"
              style={{ backgroundColor: `${config.primaryColor}15`, color: config.primaryColor }}
            >
              <UserPlus className="w-4 h-4" />
              <span>Onboarding</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary} mb-2`}>
              Démarrez rapidement
            </h2>
            <h3 className="text-3xl md:text-4xl font-black" style={{ color: config.primaryColor }}>
              en 4 étapes
            </h3>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className={`p-6 rounded-2xl text-center ${
                  step.completed 
                    ? '' 
                    : isLightTheme ? 'bg-white shadow-lg' : 'bg-white/5 border border-white/10'
                }`}
                style={step.completed ? { backgroundColor: `${config.primaryColor}10` } : {}}
                >
                  <div 
                    className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center text-xl font-bold mb-4 ${
                      step.completed ? 'text-white' : ''
                    }`}
                    style={{ backgroundColor: step.completed ? config.primaryColor : `${config.primaryColor}15`, color: step.completed ? 'white' : config.primaryColor }}
                  >
                    {step.completed ? <CheckCircle2 className="w-7 h-7" /> : i + 1}
                  </div>
                  <p className={`font-bold ${themeConfig.textPrimary}`}>{step.title}</p>
                  <p className={`text-sm ${themeConfig.textSecondary}`}>{step.description}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5" style={{ backgroundColor: step.completed ? config.primaryColor : '#e2e8f0' }} />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button className="h-14 px-8 text-white font-bold text-lg" style={{ backgroundColor: config.primaryColor }}>
              Continuer l'onboarding
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
