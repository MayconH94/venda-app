export interface LashService {
  id: string;
  name: string;
  category: string;
  duration: string;
  price: number;
  description: string;
  badge?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceAnnualMonthly: number;
  popular?: boolean;
  features: string[];
  whiteLabelHighlighted?: boolean;
  ctaText: string;
}

export interface RoutineDiagnosisData {
  weeklyClients: number;
  dailyChatHours: number;
  monthlyNoShows: number;
  averageTicket: number;
  studioName?: string;
  designerName?: string;
  whatsapp?: string;
  instagram?: string;
  email?: string;
  biggestPainPoint?: string;
}

export interface CapturedLead extends RoutineDiagnosisData {
  id: string;
  createdAt: string;
  calculatedTimeSavedMonthlyHours: number;
  calculatedRevenueRecoveredMonthly: number;
}

export interface TrialFormData {
  designerName: string;
  studioName: string;
  whatsapp: string;
  instagram: string;
  email: string;
  planChoice: string;
  billingCycle: 'monthly' | 'annual';
  createdAt: string;
}
