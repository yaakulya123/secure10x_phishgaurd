'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Mail, MailOpen, MousePointerClick, UserCheck, AlertTriangle, BarChart3, Eye, FileDown, Trash2 } from 'lucide-react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { mockCampaigns, mockChartData } from '@/lib/mockData';
import { format } from 'date-fns';

export default function DashboardPage() {
  // Calculate total metrics from all campaigns
  const totalMetrics = mockCampaigns.reduce(
    (acc, campaign) => ({
      sent: acc.sent + campaign.emailSent,
      opened: acc.opened + campaign.emailOpened,
      clicked: acc.clicked + campaign.clickedLink,
      submitted: acc.submitted + campaign.submittedData,
      reported: acc.reported + campaign.emailReported,
    }),
    { sent: 0, opened: 0, clicked: 0, submitted: 0, reported: 0 },
  );

  const metrics = [
    {
      title: 'Email Sent',
      value: totalMetrics.sent,
      icon: Mail,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      progress: 100,
    },
    {
      title: 'Email Opened',
      value: totalMetrics.opened,
      icon: MailOpen,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      progress: totalMetrics.sent > 0 ? (totalMetrics.opened / totalMetrics.sent) * 100 : 0,
    },
    {
      title: 'Clicked Link',
      value: totalMetrics.clicked,
      icon: MousePointerClick,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      progress: totalMetrics.sent > 0 ? (totalMetrics.clicked / totalMetrics.sent) * 100 : 0,
    },
    {
      title: 'Submitted Data',
      value: totalMetrics.submitted,
      icon: UserCheck,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      progress: totalMetrics.sent > 0 ? (totalMetrics.submitted / totalMetrics.sent) * 100 : 0,
    },
    {
      title: 'Email Reported',
      value: totalMetrics.reported,
      icon: AlertTriangle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      progress: totalMetrics.sent > 0 ? (totalMetrics.reported / totalMetrics.sent) * 100 : 0,
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'inProgress' | 'completed' | 'scheduled' | 'cancelled'> = {
      in_progress: 'inProgress',
      completed: 'completed',
      scheduled: 'scheduled',
      cancelled: 'cancelled',
    };

    const labels: Record<string, string> = {
      in_progress: 'In progress',
      completed: 'Completed',
      scheduled: 'Scheduled',
      cancelled: 'Cancelled',
    };

    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  // Get recent campaigns (limit to 5 for dashboard)
  const recentCampaigns = mockCampaigns.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600">Phishing Success Overview</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const percentage = Math.round(metric.progress);

          return (
            <Card key={metric.title} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {metric.title}
                </CardTitle>
                <div className={`rounded-full p-2 ${metric.bgColor}`}>
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-3xl font-bold text-slate-900">{metric.value}</div>
                    <p className="text-xs text-slate-500 mt-1">{percentage}% of total</p>
                  </div>
                  {/* Circular Progress Indicator */}
                  <div className="relative h-16 w-16">
                    <svg className="h-16 w-16 -rotate-90 transform">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-slate-200"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - percentage / 100)}`}
                        className={metric.color}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-xs font-semibold ${metric.color}`}>{percentage}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Phishing Success Over Time</CardTitle>
            <p className="text-sm text-slate-600 mt-1">Campaign performance trends</p>
          </div>
          <BarChart3 className="h-5 w-5 text-slate-400" />
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="date"
                  stroke="#64748b"
                  fontSize={12}
                  tickFormatter={(value) => format(new Date(value), 'MMM d')}
                />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}
                  labelFormatter={(value) => format(new Date(value), 'MMM d, yyyy')}
                />
                <Legend
                  wrapperStyle={{ fontSize: '12px' }}
                  iconType="circle"
                />
                <Line
                  type="monotone"
                  dataKey="sent"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Sent"
                  dot={{ fill: '#10b981', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="opened"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  name="Opened"
                  dot={{ fill: '#f59e0b', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="clicked"
                  stroke="#f97316"
                  strokeWidth={2}
                  name="Clicked"
                  dot={{ fill: '#f97316', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="submitted"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Submitted"
                  dot={{ fill: '#ef4444', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Campaigns Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Campaigns</CardTitle>
            <Link href="/campaigns">
              <Button size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead className="text-center">
                    <Mail className="inline h-4 w-4" />
                  </TableHead>
                  <TableHead className="text-center">
                    <MailOpen className="inline h-4 w-4" />
                  </TableHead>
                  <TableHead className="text-center">
                    <MousePointerClick className="inline h-4 w-4" />
                  </TableHead>
                  <TableHead className="text-center">
                    <UserCheck className="inline h-4 w-4" />
                  </TableHead>
                  <TableHead className="text-center">
                    <AlertTriangle className="inline h-4 w-4" />
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell className="text-slate-600">
                      {format(campaign.createdDate, 'MMMM do yyyy, h:mm:ss a')}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-semibold text-emerald-600">{campaign.emailSent}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-semibold text-yellow-600">{campaign.emailOpened}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-semibold text-orange-600">{campaign.clickedLink}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-semibold text-red-600">{campaign.submittedData}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-semibold text-blue-600">{campaign.emailReported}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-center text-sm text-slate-600">
            Showing {recentCampaigns.length} of {mockCampaigns.length} campaigns
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
