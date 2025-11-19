'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '@/components/ui/data-table';
import { Plus, Pencil, Trash2, UserX } from 'lucide-react';
import { mockUsers } from '@/lib/mockData';
import { format } from 'date-fns';

export default function UserManagementPage() {
  const [isNewUserOpen, setIsNewUserOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });

  const handleSaveUser = () => {
    console.log('Saving user:', formData);
    setIsNewUserOpen(false);
    setFormData({ username: '', email: '', password: '', role: 'user' });
  };

  const userColumns = [
    {
      key: 'username',
      header: 'Username',
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true,
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (user: any) => (
        <Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'}>
          {user.role.toUpperCase()}
        </Badge>
      ),
    },
    {
      key: 'createdDate',
      header: 'Created',
      sortable: true,
      render: (user: any) => format(user.createdDate, 'MMM d, yyyy'),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (user: any) => (
        <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
          {user.status}
        </Badge>
      ),
    },
  ];

  const renderActions = (user: any) => (
    <div className="flex items-center justify-end gap-2">
      <Button variant="ghost" size="sm" title="Edit">
        <Pencil className="h-4 w-4 text-emerald-600" />
      </Button>
      <Button variant="ghost" size="sm" title="Disable">
        <UserX className="h-4 w-4 text-orange-600" />
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
          <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-600">Manage system users and permissions</p>
        </div>

        <Dialog open={isNewUserOpen} onOpenChange={setIsNewUserOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline" onClick={() => setIsNewUserOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={handleSaveUser}
                disabled={!formData.username || !formData.email || !formData.password}
              >
                Add User
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataTable
            data={mockUsers}
            columns={userColumns}
            searchable
            searchPlaceholder="Search users..."
            actions={renderActions}
            emptyMessage="No users found"
          />
        </CardContent>
      </Card>
    </div>
  );
}
