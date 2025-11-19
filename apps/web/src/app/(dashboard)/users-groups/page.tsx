'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DataTable } from '@/components/ui/data-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Upload, Download, Pencil, Trash2 } from 'lucide-react';
import { mockGroups, mockGroupMembers } from '@/lib/mockData';
import { format } from 'date-fns';

export default function UsersGroupsPage() {
  const [isNewGroupOpen, setIsNewGroupOpen] = React.useState(false);
  const [groupName, setGroupName] = React.useState('');
  const [members, setMembers] = React.useState<
    Array<{ firstName: string; lastName: string; email: string; position: string }>
  >([]);
  const [newMember, setNewMember] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
  });

  const handleAddMember = () => {
    if (newMember.firstName && newMember.lastName && newMember.email) {
      setMembers([...members, newMember]);
      setNewMember({ firstName: '', lastName: '', email: '', position: '' });
    }
  };

  const handleRemoveMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleBulkImport = () => {
    // In a real app, this would open a file picker
    alert('CSV import functionality - Choose a CSV file with columns: First Name, Last Name, Email, Position');
  };

  const handleDownloadTemplate = () => {
    // In a real app, this would download a CSV template
    alert('Downloading CSV template...');
  };

  const handleSaveGroup = () => {
    console.log('Saving group:', { name: groupName, members });
    setIsNewGroupOpen(false);
    // Reset form
    setGroupName('');
    setMembers([]);
  };

  const groupColumns = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
    },
    {
      key: 'memberCount',
      header: '# of Members',
      sortable: true,
    },
    {
      key: 'modifiedDate',
      header: 'Modified Date',
      sortable: true,
      render: (group: any) => format(group.modifiedDate, 'MMMM do yyyy, h:mm:ss a'),
    },
  ];

  const renderActions = (group: any) => (
    <div className="flex items-center justify-end gap-2">
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Users & Groups</h1>
          <p className="text-slate-600">Manage target groups and members for campaigns</p>
        </div>

        <Dialog open={isNewGroupOpen} onOpenChange={setIsNewGroupOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" />
              New Group
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>New Group</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Group Name */}
              <div className="space-y-2">
                <Label htmlFor="groupName">Name:</Label>
                <Input
                  id="groupName"
                  placeholder="Group name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>

              {/* Bulk Import Section */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleBulkImport}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Bulk Import Users
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDownloadTemplate}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download CSV Template
                </Button>
              </div>

              {/* Add Member Form */}
              <div className="rounded-md border p-4 space-y-4 bg-slate-50">
                <h3 className="font-medium text-sm">Add Member Manually</h3>
                <div className="grid grid-cols-4 gap-3">
                  <Input
                    placeholder="First Name"
                    value={newMember.firstName}
                    onChange={(e) =>
                      setNewMember({ ...newMember, firstName: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Last Name"
                    value={newMember.lastName}
                    onChange={(e) =>
                      setNewMember({ ...newMember, lastName: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={newMember.email}
                    onChange={(e) =>
                      setNewMember({ ...newMember, email: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Position"
                    value={newMember.position}
                    onChange={(e) =>
                      setNewMember({ ...newMember, position: e.target.value })
                    }
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleAddMember}
                  size="sm"
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>

              {/* Members Table */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Members ({members.length})</Label>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <span>Show</span>
                    <select className="rounded-md border border-slate-200 px-2 py-1 text-sm">
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                    </select>
                    <span>entries</span>
                  </div>
                </div>

                {members.length === 0 ? (
                  <div className="rounded-md border p-8 text-center text-slate-500">
                    No data available in table
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>First Name</TableHead>
                          <TableHead>Last Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Position</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {members.map((member, index) => (
                          <TableRow key={index}>
                            <TableCell>{member.firstName}</TableCell>
                            <TableCell>{member.lastName}</TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>{member.position || '-'}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveMember(index)}
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

                <div className="text-sm text-slate-600">
                  Showing 0 to {members.length} of {members.length} entries
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline" onClick={() => setIsNewGroupOpen(false)}>
                Close
              </Button>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={handleSaveGroup}
                disabled={!groupName || members.length === 0}
              >
                Save changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Groups Table */}
      <Card>
        <CardContent className="pt-6">
          <DataTable
            data={mockGroups}
            columns={groupColumns}
            searchable
            searchPlaceholder="Search groups..."
            actions={renderActions}
            emptyMessage="No groups found"
          />
        </CardContent>
      </Card>
    </div>
  );
}
