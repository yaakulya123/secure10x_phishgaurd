'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/data-table';
import { Plus, Eye, Pencil, Copy, Trash2 } from 'lucide-react';
import { mockLandingPages } from '@/lib/mockData';

export default function LandingPagesPage() {
  const [isNewPageOpen, setIsNewPageOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    htmlContent: '',
    captureData: true,
    captureCredentials: true,
    redirectUrl: '',
  });

  const handleSavePage = () => {
    console.log('Saving landing page:', formData);
    setIsNewPageOpen(false);
    setFormData({
      name: '',
      htmlContent: '',
      captureData: true,
      captureCredentials: true,
      redirectUrl: '',
    });
  };

  const pageColumns = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
    },
  ];

  const renderActions = (page: any) => (
    <div className="flex items-center justify-end gap-2">
      <Button variant="ghost" size="sm" title="Preview">
        <Eye className="h-4 w-4 text-purple-600" />
      </Button>
      <Button variant="ghost" size="sm" title="Edit">
        <Pencil className="h-4 w-4 text-emerald-600" />
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Landing Pages</h1>
          <p className="text-slate-600">Create and manage phishing landing pages</p>
        </div>

        <Dialog open={isNewPageOpen} onOpenChange={setIsNewPageOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" />
              New Landing Page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>New Landing Page</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="pageName">Page Name:</Label>
                <Input
                  id="pageName"
                  placeholder="Landing page name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="htmlContent">HTML Content:</Label>
                <Textarea
                  id="htmlContent"
                  placeholder="<!DOCTYPE html>&#10;<html>&#10;<body>&#10;  <!-- Your landing page HTML -->&#10;</body>&#10;</html>"
                  value={formData.htmlContent}
                  onChange={(e) => setFormData({ ...formData, htmlContent: e.target.value })}
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="captureData"
                    checked={formData.captureData}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, captureData: checked as boolean })
                    }
                  />
                  <Label htmlFor="captureData" className="cursor-pointer">
                    Capture Submitted Data
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="captureCredentials"
                    checked={formData.captureCredentials}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, captureCredentials: checked as boolean })
                    }
                  />
                  <Label htmlFor="captureCredentials" className="cursor-pointer">
                    Capture Passwords
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="redirectUrl">Redirect URL (Optional):</Label>
                <Input
                  id="redirectUrl"
                  placeholder="https://example.com"
                  value={formData.redirectUrl}
                  onChange={(e) => setFormData({ ...formData, redirectUrl: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline" onClick={() => setIsNewPageOpen(false)}>
                Close
              </Button>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={handleSavePage}
                disabled={!formData.name}
              >
                Save Page
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataTable
            data={mockLandingPages}
            columns={pageColumns}
            searchable
            searchPlaceholder="Search pages..."
            actions={renderActions}
            emptyMessage="No landing pages found"
          />
        </CardContent>
      </Card>
    </div>
  );
}
