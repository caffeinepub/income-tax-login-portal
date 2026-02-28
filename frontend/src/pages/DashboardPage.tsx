import React, { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  FileText, Eye, Download, User, Bell, HelpCircle,
  LogOut, ChevronRight, Calendar, Shield, TrendingUp, Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useActor } from '../hooks/useActor';
import { useLogoutUser } from '../hooks/useQueries';
import { clearAuthSession, getAuthUserId } from '../components/AuthGuard';

const QUICK_LINKS = [
  {
    icon: FileText,
    title: 'File Returns',
    description: 'File your Income Tax Return (ITR)',
    badge: 'Due: 31 Jul',
    badgeVariant: 'destructive' as const,
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600',
  },
  {
    icon: Eye,
    title: 'View Status',
    description: 'Check your ITR filing status',
    badge: 'Active',
    badgeVariant: 'default' as const,
    color: 'bg-green-50 border-green-200',
    iconColor: 'text-green-600',
  },
  {
    icon: Download,
    title: 'Form 26AS',
    description: 'Download Annual Tax Statement',
    badge: 'Available',
    badgeVariant: 'secondary' as const,
    color: 'bg-purple-50 border-purple-200',
    iconColor: 'text-purple-600',
  },
  {
    icon: User,
    title: 'Profile Settings',
    description: 'Update your personal information',
    badge: null,
    badgeVariant: 'default' as const,
    color: 'bg-orange-50 border-orange-200',
    iconColor: 'text-orange-600',
  },
  {
    icon: TrendingUp,
    title: 'Tax Calculator',
    description: 'Calculate your tax liability',
    badge: 'New',
    badgeVariant: 'default' as const,
    color: 'bg-teal-50 border-teal-200',
    iconColor: 'text-teal-600',
  },
  {
    icon: Bell,
    title: 'Notices & Orders',
    description: 'View notices from the department',
    badge: null,
    badgeVariant: 'default' as const,
    color: 'bg-red-50 border-red-200',
    iconColor: 'text-red-600',
  },
  {
    icon: Shield,
    title: 'Grievances',
    description: 'Submit or track grievances',
    badge: null,
    badgeVariant: 'default' as const,
    color: 'bg-indigo-50 border-indigo-200',
    iconColor: 'text-indigo-600',
  },
  {
    icon: HelpCircle,
    title: 'Help & Support',
    description: 'FAQs and contact support',
    badge: null,
    badgeVariant: 'default' as const,
    color: 'bg-gray-50 border-gray-200',
    iconColor: 'text-gray-600',
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { actor, isFetching: actorFetching } = useActor();
  const logoutMutation = useLogoutUser();
  const [profile, setProfile] = React.useState<{ fullName: string; panNumber: string; userId: string } | null>(null);
  const [profileLoading, setProfileLoading] = React.useState(true);

  const currentUserId = getAuthUserId();

  useEffect(() => {
    if (!actor || actorFetching) return;

    const fetchProfile = async () => {
      try {
        const p = await actor.getCallerUserProfile();
        if (p) {
          setProfile({ fullName: p.fullName, panNumber: p.panNumber, userId: p.userId });
        } else {
          // Profile not found via actor (anonymous), use stored userId
          setProfile({ fullName: currentUserId || 'User', panNumber: '**********', userId: currentUserId || '' });
        }
      } catch {
        setProfile({ fullName: currentUserId || 'User', panNumber: '**********', userId: currentUserId || '' });
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, [actor, actorFetching, currentUserId]);

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    clearAuthSession();
    toast.success('You have been logged out successfully.');
    navigate({ to: '/login' });
  };

  const maskedPAN = profile?.panNumber
    ? profile.panNumber.slice(0, 2) + '***' + profile.panNumber.slice(5, 7) + '***' + profile.panNumber.slice(-1)
    : '**********';

  const currentYear = new Date().getFullYear();
  const assessmentYear = `${currentYear - 1}-${String(currentYear).slice(-2)}`;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-navy rounded-lg p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-white/60 text-sm">Welcome back,</p>
            {profileLoading ? (
              <Skeleton className="h-8 w-48 bg-white/20 mt-1" />
            ) : (
              <h1 className="text-2xl font-bold text-white mt-1">
                {profile?.fullName || currentUserId || 'User'}
              </h1>
            )}
            <div className="flex flex-wrap gap-4 mt-3">
              <div className="flex items-center gap-2 bg-white/10 rounded px-3 py-1.5">
                <span className="text-white/60 text-xs">PAN:</span>
                {profileLoading ? (
                  <Skeleton className="h-4 w-24 bg-white/20" />
                ) : (
                  <span className="text-saffron font-mono font-bold text-sm">{maskedPAN}</span>
                )}
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded px-3 py-1.5">
                <Calendar className="h-3.5 w-3.5 text-white/60" />
                <span className="text-white/60 text-xs">AY:</span>
                <span className="text-saffron font-bold text-sm">{assessmentYear}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded px-3 py-1.5">
                <Clock className="h-3.5 w-3.5 text-white/60" />
                <span className="text-white/60 text-xs">Last Login:</span>
                <span className="text-white text-sm">{new Date().toLocaleDateString('en-IN')}</span>
              </div>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent shrink-0"
          >
            {logoutMutation.isPending ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Logging out...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-saffron/30 bg-saffron/5">
          <CardContent className="pt-4 pb-4">
            <p className="text-navy/60 text-xs uppercase tracking-wide">Filing Status</p>
            <p className="text-navy font-bold text-lg mt-1">Pending</p>
            <p className="text-navy/50 text-xs mt-1">ITR for AY {assessmentYear}</p>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-4 pb-4">
            <p className="text-navy/60 text-xs uppercase tracking-wide">Refund Status</p>
            <p className="text-navy font-bold text-lg mt-1">Not Initiated</p>
            <p className="text-navy/50 text-xs mt-1">No pending refunds</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-4 pb-4">
            <p className="text-navy/60 text-xs uppercase tracking-wide">Outstanding Demand</p>
            <p className="text-navy font-bold text-lg mt-1">₹ 0</p>
            <p className="text-navy/50 text-xs mt-1">No outstanding demand</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <Card className="border-navy/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-navy text-lg font-bold flex items-center gap-2">
            <span className="w-1 h-5 bg-saffron rounded-full inline-block" />
            Quick Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {QUICK_LINKS.map((link) => (
              <button
                key={link.title}
                className={`flex items-start gap-3 p-4 rounded-lg border text-left transition-all hover:shadow-md hover:-translate-y-0.5 ${link.color}`}
                onClick={() => toast.info(`${link.title} feature coming soon!`)}
              >
                <div className={`p-2 rounded-lg bg-white shadow-xs shrink-0`}>
                  <link.icon className={`h-5 w-5 ${link.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-navy font-semibold text-sm">{link.title}</span>
                    {link.badge && (
                      <Badge variant={link.badgeVariant} className="text-xs py-0 px-1.5 h-4">
                        {link.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-navy/50 text-xs mt-0.5 leading-tight">{link.description}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-navy/30 shrink-0 mt-0.5" />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Important Dates */}
      <Card className="border-navy/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-navy text-lg font-bold flex items-center gap-2">
            <span className="w-1 h-5 bg-saffron rounded-full inline-block" />
            Important Due Dates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { date: '31 Jul 2025', event: 'Last date to file ITR for AY 2024-25 (Non-Audit)', status: 'upcoming' },
              { date: '31 Oct 2025', event: 'Last date to file ITR for AY 2024-25 (Audit)', status: 'upcoming' },
              { date: '15 Mar 2025', event: 'Advance Tax - 4th Installment', status: 'past' },
              { date: '15 Jun 2025', event: 'Advance Tax - 1st Installment for AY 2025-26', status: 'upcoming' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 py-2 border-b border-navy/10 last:border-0">
                <div className={`text-xs font-mono font-bold px-2 py-1 rounded ${
                  item.status === 'past' ? 'bg-gray-100 text-gray-500' : 'bg-saffron/20 text-navy'
                }`}>
                  {item.date}
                </div>
                <span className={`text-sm flex-1 ${item.status === 'past' ? 'text-navy/40 line-through' : 'text-navy/80'}`}>
                  {item.event}
                </span>
                <Badge variant={item.status === 'past' ? 'secondary' : 'outline'} className="text-xs shrink-0">
                  {item.status === 'past' ? 'Passed' : 'Upcoming'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
