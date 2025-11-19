'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/data-table';
import { Plus, Send, Pencil, Trash2 } from 'lucide-react';
import { mockSendingProfiles } from '@/lib/mockData';

export default function SendingProfilesPage() {
  const [isNewProfileOpen, setIsNewProfileOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    host: '',
    port: '587',
    username: '',
    password: '',
    fromAddress: '',
    ignoreCertErrors: false,
  });

  const handleTestConnection = () => {
    alert('Testing SMTP connection...');
  };

  const handleSaveProfile = () => {
    console.log('Saving sending profile:', formData);
    setIsNewProfileOpen(false);
    setFormData({
      name: '',
      host: '',
      port: '587',
      username: '',
      password: '',
      fromAddress: '',
      ignoreCertErrors: false,
    });
  };

  const profileColumns = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
    },
    {
      key: 'host',
      header: 'Host',
      sortable: true,
    },
    {
      key: 'fromAddress',
      header: 'From Address',
      sortable: true,
    },
  ];

  const renderActions = (profile: any) => (
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
          <h1 className="text-3xl font-bold text-slate-900">Sending Profiles</h1>
          <p className="text-slate-600">Configure SMTP settings for email campaigns</p>
        </div>

        <Dialog open={isNewProfileOpen} onOpenChange={setIsNewProfileOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" />
              New Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>New Sending Profile</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="profileName">Profile Name:</Label>
                <Input
                  id="profileName"
                  placeholder="My SMTP Server"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="host">SMTP Host:</Label>
                  <Input
                    id="host"
                    placeholder="smtp.example.com"
                    value={formData.host}
                    onChange={(e) => setFormData({ ...formData, host: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="port">Port:</Label>
                  <Input
                    id="port"
                    placeholder="587"
                    value={formData.port}
                    onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username:</Label>
                <Input
                  id="username"
                  placeholder="user@example.com"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password:</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fromAddress">From Address:</Label>
                <Input
                  id="fromAddress"
                  placeholder="noreply@example.com"
                  value={formData.fromAddress}
                  onChange={(e) => setFormData({ ...formData, fromAddress: e.target.value })}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ignoreCertErrors"
                  checked={formData.ignoreCertErrors}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, ignoreCertErrors: checked as boolean })
                  }
                />
                <Label htmlFor="ignoreCertErrors" className="cursor-pointer">
                  Ignore Certificate Errors
                </Label>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleTestConnection}
                className="w-full"
              >
                <Send className="mr-2 h-4 w-4" />
                Test Connection
              </Button>
            </div>

            <div className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline" onClick={() => setIsNewProfileOpen(false)}>
                Close
              </Button>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={handleSaveProfile}
                disabled={!formData.name || !formData.host}
              >
                Save Profile
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataTable
            data={mockSendingProfiles}
            columns={profileColumns}
            searchable
            searchPlaceholder="Search profiles..."
            actions={renderActions}
            emptyMessage="No sending profiles found"
          />
        </CardContent>
      </Card>
    </div>
  );
}
