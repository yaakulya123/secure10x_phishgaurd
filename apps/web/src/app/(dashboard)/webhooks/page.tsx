'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { DataTable } from '@/components/ui/data-table';
import { Plus, Send, Pencil, Trash2 } from 'lucide-react';
import { mockWebhooks } from '@/lib/mockData';

export default function WebhooksPage() {
  const [isNewWebhookOpen, setIsNewWebhookOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    url: '',
    secret: '',
    isActive: true,
  });

  const handleTestWebhook = () => {
    alert('Sending test webhook...');
  };

  const handleSaveWebhook = () => {
    console.log('Saving webhook:', formData);
    setIsNewWebhookOpen(false);
    setFormData({ name: '', url: '', secret: '', isActive: true });
  };

  const webhookColumns = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
    },
    {
      key: 'url',
      header: 'URL',
      sortable: true,
      render: (webhook: any) => (
        <span className="text-sm font-mono text-slate-600">{webhook.url}</span>
      ),
    },
    {
      key: 'isActive',
      header: 'Status',
      sortable: true,
      render: (webhook: any) => (
        <Badge variant={webhook.isActive ? 'success' : 'secondary'}>
          {webhook.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
  ];

  const renderActions = (webhook: any) => (
    <div className="flex items-center justify-end gap-2">
      <Button variant="ghost" size="sm" title="Test">
        <Send className="h-4 w-4 text-blue-600" />
      </Button>
      <Button variant="ghost" size="sm" title="Edit">
        <Pencil className="h-4 w-4 text-emerald-600" />
      </Button>
      <Button variant="ghost" size="sm" title="Delete">
        <Trash2 className="h-4 w-4 text-red-600" />
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Webhooks</h1>
          <p className="text-slate-600">Configure webhooks for event notifications</p>
        </div>

        <Dialog open={isNewWebhookOpen} onOpenChange={setIsNewWebhookOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" />
              New Webhook
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Webhook</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="webhookName">Name</Label>
                <Input
                  id="webhookName"
                  placeholder="Slack Notifications"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhookUrl">URL</Label>
                <Input
                  id="webhookUrl"
                  placeholder="https://hooks.slack.com/services/..."
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhookSecret">Secret (Optional)</Label>
                <Input
                  id="webhookSecret"
                  type="password"
                  placeholder="Webhook signing secret"
                  value={formData.secret}
                  onChange={(e) => setFormData({ ...formData, secret: e.target.value })}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label>Active</Label>
                  <p className="text-sm text-slate-500">Enable this webhook</p>
                </div>
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleTestWebhook}
                className="w-full"
                disabled={!formData.url}
              >
                <Send className="mr-2 h-4 w-4" />
                Send Test Event
              </Button>
            </div>

            <div className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline" onClick={() => setIsNewWebhookOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={handleSaveWebhook}
                disabled={!formData.name || !formData.url}
              >
                Save Webhook
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataTable
            data={mockWebhooks}
            columns={webhookColumns}
            searchable
            searchPlaceholder="Search webhooks..."
            actions={renderActions}
            emptyMessage="No webhooks configured"
          />
        </CardContent>
      </Card>
    </div>
  );
}
