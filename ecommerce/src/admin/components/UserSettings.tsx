import React, { useState, useEffect } from 'react';
import { useCurrentAdmin } from 'adminjs';
import { Box, H2, H5, Text, Input, Button, FormGroup, Label, MessageBox } from '@adminjs/design-system';

const UserSettings: React.FC = () => {
  const [currentAdmin] = useCurrentAdmin();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (currentAdmin) {
      setName(currentAdmin.name || '');
      setEmail(currentAdmin.email || '');
    }
  }, [currentAdmin]);

  const handleSaveProfile = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const updateData: any = { name, email };

      // Add password change if provided
      if (newPassword) {
        if (newPassword !== confirmPassword) {
          setError('New passwords do not match');
          setSaving(false);
          return;
        }
        if (!currentPassword) {
          setError('Current password is required to set a new password');
          setSaving(false);
          return;
        }
        updateData.currentPassword = currentPassword;
        updateData.newPassword = newPassword;
      }

      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Use AdminJS session cookies
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      setSuccess('Profile updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (!currentAdmin) {
    return (
      <Box padding="xxl">
        <Text>Not authenticated</Text>
      </Box>
    );
  }

  return (
    <Box padding="xxl">
      <H2 marginBottom="xl">Account Settings</H2>

      {error && (
        <MessageBox message={error} variant="danger" onClose={() => setError(null)} />
      )}

      {success && (
        <MessageBox message={success} variant="success" onClose={() => setSuccess(null)} />
      )}

      {/* Profile Information */}
      <Box bg="white" border="default" borderRadius="default" padding="xxl" marginBottom="xxl" style={{ maxWidth: '600px' }}>
        <H5 marginBottom="lg">Profile Information</H5>

        <FormGroup marginBottom="lg">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
        </FormGroup>

        <FormGroup marginBottom="lg">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </FormGroup>

        <Box marginTop="xl">
          <Button variant="primary" onClick={handleSaveProfile} disabled={saving}>
            {saving ? 'Saving...' : 'Save Profile'}
          </Button>
        </Box>
      </Box>

      {/* Change Password */}
      <Box bg="white" border="default" borderRadius="default" padding="xxl" style={{ maxWidth: '600px' }}>
        <H5 marginBottom="lg">Change Password</H5>
        <Text fontSize="sm" color="grey60" marginBottom="lg">
          Leave blank if you don't want to change your password
        </Text>

        <FormGroup marginBottom="lg">
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
          />
        </FormGroup>

        <FormGroup marginBottom="lg">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </FormGroup>

        <FormGroup marginBottom="lg">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
        </FormGroup>

        <Box marginTop="xl">
          <Button variant="primary" onClick={handleSaveProfile} disabled={saving}>
            {saving ? 'Updating...' : 'Update Password'}
          </Button>
        </Box>
      </Box>

      {/* Info Box */}
      <Box marginTop="xxl">
        <Box bg="info" border="default" borderRadius="default" padding="lg" style={{ backgroundColor: '#e6f7ff', borderColor: '#91d5ff', maxWidth: '600px' }}>
          <Text fontWeight="bold" marginBottom="sm">ℹ️ Note</Text>
          <Text fontSize="sm" color="grey80">
            To use the full shopping features, you need to authenticate via the REST API using <code>/api/auth/login</code> endpoint and save the JWT token.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default UserSettings;
