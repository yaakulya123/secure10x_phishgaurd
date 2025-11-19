// Mock Data for PhishGuard Platform

export type CampaignStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
export type UserRole = 'admin' | 'user';

export interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  createdDate: Date;
  launchDate: Date;
  emailSent: number;
  emailOpened: number;
  clickedLink: number;
  submittedData: number;
  emailReported: number;
  templateId: string;
  landingPageId: string;
  groupId: string;
}

export interface Group {
  id: string;
  name: string;
  memberCount: number;
  modifiedDate: Date;
}

export interface GroupMember {
  id: string;
  groupId: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  envelopeSender?: string;
  hasTrackingImage: boolean;
  createdDate: Date;
}

export interface LandingPage {
  id: string;
  name: string;
  captureData: boolean;
  captureCredentials: boolean;
  createdDate: Date;
}

export interface SendingProfile {
  id: string;
  name: string;
  host: string;
  fromAddress: string;
  createdDate: Date;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdDate: Date;
  status: 'active' | 'inactive';
}

export interface Webhook {
  id: string;
  name: string;
  url: string;
  isActive: boolean;
  createdDate: Date;
}

export interface ChartDataPoint {
  date: string;
  sent: number;
  opened: number;
  clicked: number;
  submitted: number;
}

// Generate mock campaigns
export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Testing Reset Options',
    status: 'in_progress',
    createdDate: new Date('2025-06-04T19:04:28'),
    launchDate: new Date('2025-06-04T19:04:28'),
    emailSent: 2,
    emailOpened: 1,
    clickedLink: 1,
    submittedData: 0,
    emailReported: 0,
    templateId: '1',
    landingPageId: '1',
    groupId: '1',
  },
  {
    id: '2',
    name: 'Office 365 Security Alert',
    status: 'completed',
    createdDate: new Date('2025-05-15T10:30:00'),
    launchDate: new Date('2025-05-16T09:00:00'),
    emailSent: 45,
    emailOpened: 32,
    clickedLink: 18,
    submittedData: 8,
    emailReported: 3,
    templateId: '1',
    landingPageId: '1',
    groupId: '1',
  },
  {
    id: '3',
    name: 'PayPal Account Verification',
    status: 'completed',
    createdDate: new Date('2025-04-20T14:20:00'),
    launchDate: new Date('2025-04-22T08:00:00'),
    emailSent: 38,
    emailOpened: 28,
    clickedLink: 15,
    submittedData: 6,
    emailReported: 5,
    templateId: '3',
    landingPageId: '3',
    groupId: '2',
  },
  {
    id: '4',
    name: 'IT Department Password Reset',
    status: 'completed',
    createdDate: new Date('2025-03-10T11:15:00'),
    launchDate: new Date('2025-03-12T13:00:00'),
    emailSent: 52,
    emailOpened: 40,
    clickedLink: 25,
    submittedData: 12,
    emailReported: 2,
    templateId: '2',
    landingPageId: '2',
    groupId: '1',
  },
  {
    id: '5',
    name: 'LinkedIn Connection Request',
    status: 'scheduled',
    createdDate: new Date('2025-06-10T16:00:00'),
    launchDate: new Date('2025-06-15T10:00:00'),
    emailSent: 0,
    emailOpened: 0,
    clickedLink: 0,
    submittedData: 0,
    emailReported: 0,
    templateId: '4',
    landingPageId: '4',
    groupId: '3',
  },
];

// Generate mock groups
export const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Phishing Email Testing',
    memberCount: 2,
    modifiedDate: new Date('2025-06-04T19:03:29'),
  },
  {
    id: '2',
    name: 'Marketing Department',
    memberCount: 15,
    modifiedDate: new Date('2025-05-28T14:20:00'),
  },
  {
    id: '3',
    name: 'Engineering Team',
    memberCount: 28,
    modifiedDate: new Date('2025-05-30T09:15:00'),
  },
  {
    id: '4',
    name: 'Executive Leadership',
    memberCount: 8,
    modifiedDate: new Date('2025-06-01T11:45:00'),
  },
  {
    id: '5',
    name: 'Customer Support',
    memberCount: 12,
    modifiedDate: new Date('2025-05-25T13:30:00'),
  },
];

// Generate mock group members
export const mockGroupMembers: GroupMember[] = [
  {
    id: '1',
    groupId: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    position: 'Software Engineer',
  },
  {
    id: '2',
    groupId: '1',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    position: 'Product Manager',
  },
];

// Generate mock email templates
export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'office-365 - Reset',
    subject: 'Password Reset Required',
    envelopeSender: 'security@microsoft.com',
    hasTrackingImage: true,
    createdDate: new Date('2025-05-01T10:00:00'),
  },
  {
    id: '2',
    name: 'IT Department - Urgent',
    subject: 'Immediate Action Required: Password Expiration',
    envelopeSender: 'it-support@company.com',
    hasTrackingImage: true,
    createdDate: new Date('2025-04-15T14:30:00'),
  },
  {
    id: '3',
    name: 'PayPal - Account Alert',
    subject: 'Verify Your PayPal Account',
    envelopeSender: 'service@paypal.com',
    hasTrackingImage: true,
    createdDate: new Date('2025-04-10T09:20:00'),
  },
  {
    id: '4',
    name: 'LinkedIn - Connection',
    subject: 'You have a new connection request',
    envelopeSender: 'messages@linkedin.com',
    hasTrackingImage: true,
    createdDate: new Date('2025-05-20T11:45:00'),
  },
  {
    id: '5',
    name: 'Google Drive - Shared Document',
    subject: 'New document shared with you',
    envelopeSender: 'drive-shares-noreply@google.com',
    hasTrackingImage: true,
    createdDate: new Date('2025-05-10T16:15:00'),
  },
  {
    id: '6',
    name: 'Bank Alert - Suspicious Activity',
    subject: 'Unusual Activity Detected',
    envelopeSender: 'alerts@bankofamerica.com',
    hasTrackingImage: true,
    createdDate: new Date('2025-04-25T13:00:00'),
  },
];

// Generate mock landing pages
export const mockLandingPages: LandingPage[] = [
  {
    id: '1',
    name: 'Office 365 Reset',
    captureData: true,
    captureCredentials: true,
    createdDate: new Date('2025-05-01T10:15:00'),
  },
  {
    id: '2',
    name: 'IT Support Portal',
    captureData: true,
    captureCredentials: true,
    createdDate: new Date('2025-04-15T14:45:00'),
  },
  {
    id: '3',
    name: 'PayPal Login',
    captureData: true,
    captureCredentials: true,
    createdDate: new Date('2025-04-10T09:35:00'),
  },
  {
    id: '4',
    name: 'LinkedIn Profile Update',
    captureData: true,
    captureCredentials: false,
    createdDate: new Date('2025-05-20T12:00:00'),
  },
  {
    id: '5',
    name: 'Google Drive Access',
    captureData: true,
    captureCredentials: true,
    createdDate: new Date('2025-05-10T16:30:00'),
  },
];

// Generate mock sending profiles
export const mockSendingProfiles: SendingProfile[] = [
  {
    id: '1',
    name: 'Dummy Tester',
    host: 'localhost',
    fromAddress: 'test@localhost',
    createdDate: new Date('2025-04-01T08:00:00'),
  },
  {
    id: '2',
    name: 'AWS SES Production',
    host: 'email-smtp.us-east-1.amazonaws.com',
    fromAddress: 'noreply@phishguard.com',
    createdDate: new Date('2025-04-05T10:30:00'),
  },
  {
    id: '3',
    name: 'SendGrid Production',
    host: 'smtp.sendgrid.net',
    fromAddress: 'security-training@company.com',
    createdDate: new Date('2025-04-10T14:15:00'),
  },
  {
    id: '4',
    name: 'Mailgun Testing',
    host: 'smtp.mailgun.org',
    fromAddress: 'test@sandbox.mailgun.org',
    createdDate: new Date('2025-04-20T11:00:00'),
  },
];

// Generate mock users
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@phishguard.local',
    role: 'admin',
    createdDate: new Date('2025-01-01T00:00:00'),
    status: 'active',
  },
  {
    id: '2',
    username: 'jdoe',
    email: 'john.doe@company.com',
    role: 'user',
    createdDate: new Date('2025-02-15T10:30:00'),
    status: 'active',
  },
  {
    id: '3',
    username: 'jsmith',
    email: 'jane.smith@company.com',
    role: 'user',
    createdDate: new Date('2025-03-20T14:45:00'),
    status: 'active',
  },
  {
    id: '4',
    username: 'mjohnson',
    email: 'mike.johnson@company.com',
    role: 'admin',
    createdDate: new Date('2025-01-10T09:00:00'),
    status: 'active',
  },
  {
    id: '5',
    username: 'sbrown',
    email: 'sarah.brown@company.com',
    role: 'user',
    createdDate: new Date('2025-04-05T11:20:00'),
    status: 'inactive',
  },
];

// Generate mock webhooks
export const mockWebhooks: Webhook[] = [
  {
    id: '1',
    name: 'Slack Notifications',
    url: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXX',
    isActive: true,
    createdDate: new Date('2025-03-15T10:00:00'),
  },
  {
    id: '2',
    name: 'Teams Integration',
    url: 'https://company.webhook.office.com/webhookb2/xxxx-yyyy',
    isActive: true,
    createdDate: new Date('2025-03-20T14:30:00'),
  },
  {
    id: '3',
    name: 'Custom Analytics',
    url: 'https://analytics.company.com/api/webhook/phishguard',
    isActive: false,
    createdDate: new Date('2025-04-01T09:15:00'),
  },
  {
    id: '4',
    name: 'SIEM Integration',
    url: 'https://siem.company.com/api/v1/events',
    isActive: true,
    createdDate: new Date('2025-04-10T11:45:00'),
  },
];

// Generate chart data for dashboard
export const mockChartData: ChartDataPoint[] = [
  { date: '2025-01-01', sent: 0, opened: 0, clicked: 0, submitted: 0 },
  { date: '2025-02-01', sent: 0, opened: 0, clicked: 0, submitted: 0 },
  { date: '2025-03-12', sent: 52, opened: 40, clicked: 25, submitted: 12 },
  { date: '2025-04-22', sent: 38, opened: 28, clicked: 15, submitted: 6 },
  { date: '2025-05-16', sent: 45, opened: 32, clicked: 18, submitted: 8 },
  { date: '2025-06-04', sent: 2, opened: 1, clicked: 1, submitted: 0 },
];
