'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DataTable } from '@/components/ui/data-table';
import { Plus, BarChart3, Copy, Trash2, Send } from 'lucide-react';
import { mockCampaigns, mockEmailTemplates, mockLandingPages, mockSendingProfiles, mockGroups } from '@/lib/mockData';
import { format } from 'date-fns';

export default function CampaignsPage() {
  const [isNewCampaignOpen, setIsNewCampaignOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    emailTemplate: '',
    landingPage: '',
    url: '',
    launchDate: '',
    sendByDate: '',
    sendingProfile: '',
    groups: '',
  });

  const activeCampaigns = mockCampaigns.filter(
    (c) => c.status === 'in_progress' || c.status === 'scheduled',
  );
  const archivedCampaigns = mockCampaigns.filter(
    (c) => c.status === 'completed' || c.status === 'cancelled',
  );

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

  const handleLaunchCampaign = () => {
    console.log('Launching campaign:', formData);
    setIsNewCampaignOpen(false);
    // Reset form
    setFormData({
      name: '',
      emailTemplate: '',
      landingPage: '',
      url: '',
      launchDate: '',
      sendByDate: '',
      sendingProfile: '',
      groups: '',
    });
  };

  const campaignColumns = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
    },
    {
      key: 'createdDate',
      header: 'Created Date',
      sortable: true,
      render: (campaign: any) => format(campaign.createdDate, 'MMMM do yyyy, h:mm:ss a'),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (campaign: any) => getStatusBadge(campaign.status),
    },
  ];

  const renderActions = (campaign: any) => (
    <div className="flex items-center justify-end gap-2">
      <Button variant="ghost" size="sm" title="View Stats">
        <BarChart3 className="h-4 w-4 text-emerald-600" />
      </Button>
      <Button variant="ghost" size="sm" title="Copy">
        <Copy className="h-4 w-4 text-blue-600" />
      </Button>
      <Button variant="ghost" size="sm" title="Delete">
        <Trash2 className="h-4 w-4 text-red-600" />
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Campaigns</h1>
          <p className="text-slate-600">Manage and track your phishing campaigns</p>
        </div>

        <Dialog open={isNewCampaignOpen} onOpenChange={setIsNewCampaignOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>New Campaign</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Campaign Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Name:</Label>
                <Input
                  id="name"
                  placeholder="Campaign name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* Email Template */}
              <div className="space-y-2">
                <Label htmlFor="template">Email Template:</Label>
                <Select value={formData.emailTemplate} onValueChange={(value) => setFormData({ ...formData, emailTemplate: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockEmailTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Landing Page */}
              <div className="space-y-2">
                <Label htmlFor="landingPage">Landing Page:</Label>
                <Select value={formData.landingPage} onValueChange={(value) => setFormData({ ...formData, landingPage: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select landing page" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockLandingPages.map((page) => (
                      <SelectItem key={page.id} value={page.id}>
                        {page.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* URL */}
              <div className="space-y-2">
                <Label htmlFor="url">
                  URL: <span className="text-slate-500 text-xs">(Base URL for tracking links)</span>
                </Label>
                <Input
                  id="url"
                  placeholder="http://192.168.1.1"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                />
              </div>

              {/* Launch Date and Send By Date */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="launchDate">Launch Date</Label>
                  <Input
                    id="launchDate"
                    type="datetime-local"
                    value={formData.launchDate}
                    onChange={(e) => setFormData({ ...formData, launchDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sendByDate">
                    Send Emails By (Optional) <span className="text-slate-500 text-xs">(Spread over time)</span>
                  </Label>
                  <Input
                    id="sendByDate"
                    type="datetime-local"
                    value={formData.sendByDate}
                    onChange={(e) => setFormData({ ...formData, sendByDate: e.target.value })}
                  />
                </div>
              </div>

              {/* Sending Profile */}
              <div className="space-y-2">
                <Label htmlFor="sendingProfile">Sending Profile:</Label>
                <div className="flex gap-2">
                  <Select value={formData.sendingProfile} onValueChange={(value) => setFormData({ ...formData, sendingProfile: value })} className="flex-1">
                    <SelectTrigger>
                      <SelectValue placeholder="Select sending profile" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockSendingProfiles.map((profile) => (
                        <SelectItem key={profile.id} value={profile.id}>
                          {profile.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Send className="mr-2 h-4 w-4" />
                    Send Test Email
                  </Button>
                </div>
              </div>

              {/* Groups */}
              <div className="space-y-2">
                <Label htmlFor="groups">Groups:</Label>
                <Select value={formData.groups} onValueChange={(value) => setFormData({ ...formData, groups: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Group" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockGroups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsNewCampaignOpen(false)}>
                Close
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleLaunchCampaign}>
                <Plus className="mr-2 h-4 w-4" />
                Launch Campaign
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Campaigns Tabs */}
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="active" className="space-y-4">
            <TabsList>
              <TabsTrigger value="active">Active Campaigns</TabsTrigger>
              <TabsTrigger value="archived">Archived Campaigns</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <DataTable
                data={activeCampaigns}
                columns={campaignColumns}
                searchable
                searchPlaceholder="Search campaigns..."
                actions={renderActions}
                emptyMessage="No active campaigns found"
              />
            </TabsContent>

            <TabsContent value="archived" className="space-y-4">
              <DataTable
                data={archivedCampaigns}
                columns={campaignColumns}
                searchable
                searchPlaceholder="Search campaigns..."
                actions={renderActions}
                emptyMessage="No archived campaigns found"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
