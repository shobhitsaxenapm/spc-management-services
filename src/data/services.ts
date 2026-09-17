import { Users, ShieldCheck, BrainCircuit, Globe, Landmark, Heart, Building2 } from 'lucide-react';

export const services = [
  {
    id: 'recruitment',
    icon: Users, color: 'blue', title: 'Recruitment & Staffing', desc: 'Large-scale recruitment for government programs, public health missions, NGOs, and corporate organizations.',
    features: ['Large-scale program recruitment', 'Specialist talent sourcing', 'Pan-India hiring capability', 'Public recruitment management'],
    bestSuitedFor: [{ icon: Landmark, text: 'Government health programs' }, { icon: Globe, text: 'NGO and INGO programs' }, { icon: Building2, text: 'Corporate hiring at scale' }]
  },
  {
    id: 'outsourcing',
    icon: ShieldCheck, color: 'emerald', title: 'HR Outsourcing', desc: 'Compliant workforce deployment, payroll management, and end-to-end HR operations support.',
    features: ['Recruitment Process Outsourcing', 'Payroll & compliance management', 'Workforce administration', 'Contract staffing'],
    bestSuitedFor: [{ icon: Building2, text: 'Mid-size and large enterprises' }, { icon: Landmark, text: 'Government contract staffing' }, { icon: Globe, text: 'Multi-location organizations' }]
  },
  {
    id: 'consulting',
    icon: BrainCircuit, color: 'purple', title: 'Management Consulting', desc: 'Strategic advisory in human resources, organizational development, and operational planning.',
    features: ['HR strategy and design', 'Organizational restructuring', 'Operational planning for scale', 'Change management'],
    bestSuitedFor: [{ icon: Building2, text: 'Scaling corporate enterprises' }, { icon: Globe, text: 'Expanding INGOs' }]
  },
  {
    id: 'technical',
    icon: Globe, color: 'amber', title: 'Technical Assistance', desc: 'Management support for UN, INGO, and government programs across HR, finance, and logistics.',
    features: ['UN and INGO program support', 'Finance and logistics management', 'Program coordination', 'Capacity building'],
    bestSuitedFor: [{ icon: Globe, text: 'UN and INGO programs' }, { icon: Landmark, text: 'Government health missions' }, { icon: Users, text: 'Development sector initiatives' }]
  },
  {
    id: 'project',
    icon: Landmark, color: 'slate', title: 'Project Management Support', desc: 'Implementation and management support for large-scale government and development sector projects.',
    features: ['Large-scale project implementation', 'Monitoring and evaluation', 'Operations management', 'Stakeholder coordination'],
    bestSuitedFor: [{ icon: Landmark, text: 'Government initiatives' }, { icon: Globe, text: 'Development sector projects' }]
  },
  {
    id: 'csr',
    icon: Heart, color: 'rose', title: 'CSR Advisory', desc: 'Consulting and advisory for corporate and PSU clients on CSR strategy, compliance, and program design.',
    features: ['CSR strategy development', 'Compliance and reporting', 'Impact assessment', 'Program design'],
    bestSuitedFor: [{ icon: Building2, text: 'Corporate enterprises' }, { icon: Landmark, text: 'Public Sector Undertakings (PSUs)' }]
  },
];
