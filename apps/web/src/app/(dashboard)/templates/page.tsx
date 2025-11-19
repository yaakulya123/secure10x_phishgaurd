'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/ui/data-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Upload, Pencil, Copy, Trash2, Mail, Info } from 'lucide-react';
import { mockEmailTemplates } from '@/lib/mockData';

export default function EmailTemplatesPage() {
  const [isNewTemplateOpen, setIsNewTemplateOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    envelopeSender: '',
    subject: '',
    textContent: '',
    htmlContent: '',
    addTrackingImage: true,
  });
  const [attachments, setAttachments] = React.useState<Array<{ name: string }>>([]);

  const handleImportEmail = () => {
    alert('Import Email functionality - This would allow importing an .eml file');
  };

  const handleAddAttachment = () => {
    // In a real app, this would open a file picker
    const fileName = prompt('Enter attachment filename (demo):');
    if (fileName) {
      setAttachments([...attachments, { name: fileName }]);
    }
  };

  const handleSaveTemplate = () => {
    console.log('Saving template:', formData, attachments);
    setIsNewTemplateOpen(false);
    // Reset form
    setFormData({
      name: '',
      envelopeSender: '',
      subject: '',
      textContent: '',
      htmlContent: '',
      addTrackingImage: true,
    });
    setAttachments([]);
  };

  const templateColumns = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
    },
  ];

  const renderActions = (template: any) => (
    <div className="flex items-center justify-end gap-2">
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Email Templates</h1>
          <p className="text-slate-600">Create and manage phishing email templates</p>
        </div>

        <Dialog open={isNewTemplateOpen} onOpenChange={setIsNewTemplateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" />
              New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>New Template</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Template Name */}
              <div className="space-y-2">
                <Label htmlFor="templateName">Name:</Label>
                <Input
                  id="templateName"
                  placeholder="Template name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* Import Email Button */}
              <Button
                type="button"
                variant="destructive"
                onClick={handleImportEmail}
                className="bg-red-600 hover:bg-red-700"
              >
                <Mail className="mr-2 h-4 w-4" />
                Import Email
              </Button>

              {/* Envelope Sender */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="envelopeSender">Envelope Sender:</Label>
                  <Info className="h-4 w-4 text-slate-400" title="The sender address shown in the email header" />
                </div>
                <Input
                  id="envelopeSender"
                  placeholder="First Last <test@example.com>"
                  value={formData.envelopeSender}
                  onChange={(e) => setFormData({ ...formData, envelopeSender: e.target.value })}
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject">Subject:</Label>
                <Input
                  id="subject"
                  placeholder="Email Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              {/* Email Content Tabs */}
              <div className="space-y-2">
                <Tabs defaultValue="text" className="w-full">
                  <TabsList>
                    <TabsTrigger value="text">Text</TabsTrigger>
                    <TabsTrigger value="html">HTML</TabsTrigger>
                  </TabsList>
                  <TabsContent value="text" className="space-y-2">
                    <Textarea
                      placeholder="Plaintext email content..."
                      value={formData.textContent}
                      onChange={(e) => setFormData({ ...formData, textContent: e.target.value })}
                      rows={10}
                      className="font-mono text-sm"
                    />
                  </TabsContent>
                  <TabsContent value="html" className="space-y-2">
                    <Textarea
                      placeholder="<html><body>HTML email content...</body></html>"
                      value={formData.htmlContent}
                      onChange={(e) => setFormData({ ...formData, htmlContent: e.target.value })}
                      rows={10}
                      className="font-mono text-sm"
                    />
                  </TabsContent>
                </Tabs>
              </div>

              {/* Add Tracking Image */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="trackingImage"
                  checked={formData.addTrackingImage}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, addTrackingImage: checked as boolean })
                  }
                />
                <Label htmlFor="trackingImage" className="cursor-pointer">
                  Add Tracking Image
                </Label>
              </div>

              {/* Add Files (Attachments) */}
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleAddAttachment}
                  size="sm"
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Files
                </Button>

                {/* Attachments List */}
                {attachments.length > 0 && (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {attachments.map((attachment, index) => (
                          <TableRow key={index}>
                            <TableCell>{attachment.name}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  setAttachments(attachments.filter((_, i) => i !== index))
                                }
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {attachments.length === 0 && (
                  <div className="text-sm text-slate-500">
                    Showing 0 to 0 of 0 entries
                  </div>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline" onClick={() => setIsNewTemplateOpen(false)}>
                Close
              </Button>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={handleSaveTemplate}
                disabled={!formData.name || !formData.subject}
              >
                Save Template
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Templates Table */}
      <Card>
        <CardContent className="pt-6">
          <DataTable
            data={mockEmailTemplates}
            columns={templateColumns}
            searchable
            searchPlaceholder="Search templates..."
            actions={renderActions}
            emptyMessage="No templates found"
          />
        </CardContent>
      </Card>
    </div>
  );
}
