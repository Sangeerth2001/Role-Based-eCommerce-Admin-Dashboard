import React, { useEffect, useState } from 'react';
import { Box, H2, H5, Text, Input, Button, FormGroup, Label, MessageBox } from '@adminjs/design-system';

interface SettingItem {
  id: number;
  key: string;
  value: string;
  description?: string;
}

interface SettingsData {
  [key: string]: string;
}

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SettingsData>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Define the settings we want to manage
  const settingsConfig = [
    { key: 'site_name', label: 'Site Name', description: 'The name of your eCommerce store' },
    { key: 'currency', label: 'Currency', description: 'Default currency (e.g., USD, EUR, GBP)' },
    { key: 'tax_rate', label: 'Tax Rate (%)', description: 'Default tax rate percentage' },
    { key: 'shipping_cost', label: 'Shipping Cost', description: 'Default shipping cost' },
    { key: 'contact_email', label: 'Contact Email', description: 'Customer support email address' },
    { key: 'min_order_amount', label: 'Minimum Order Amount', description: 'Minimum order amount for checkout' },
  ];

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }

      const result = await response.json();
      const settingsMap: SettingsData = {};

      result.data.forEach((setting: SettingItem) => {
        settingsMap[setting.key] = setting.value;
      });

      setSettings(settingsMap);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching settings:', err);
      setError('Failed to load settings');
      setLoading(false);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ settings }),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      setSuccess('Settings saved successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
      setError('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box padding="xxl">
        <Text>Loading settings...</Text>
      </Box>
    );
  }

  return (
    <Box padding="xxl">
      <H2 marginBottom="xl">Settings</H2>

      {error && (
        <MessageBox message={error} variant="danger" onClose={() => setError(null)} />
      )}

      {success && (
        <MessageBox message={success} variant="success" onClose={() => setSuccess(null)} />
      )}

      <Box
        bg="white"
        border="default"
        borderRadius="default"
        padding="xxl"
        style={{ maxWidth: '800px' }}
      >
        {settingsConfig.map((config) => (
          <FormGroup key={config.key} marginBottom="lg">
            <Label htmlFor={config.key}>{config.label}</Label>
            {config.description && (
              <Text fontSize="sm" color="grey60" marginBottom="sm">
                {config.description}
              </Text>
            )}
            <Input
              id={config.key}
              value={settings[config.key] || ''}
              onChange={(e) => handleInputChange(config.key, e.target.value)}
              placeholder={`Enter ${config.label.toLowerCase()}`}
            />
          </FormGroup>
        ))}

        <Box marginTop="xxl" display="flex" justifyContent="flex-end">
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </Box>
      </Box>

      <Box marginTop="xxl">
        <H5 marginBottom="lg">Current Settings Summary</H5>
        <Box bg="grey20" border="default" borderRadius="default" padding="lg">
          {settingsConfig.map((config) => (
            <Box key={config.key} marginBottom="sm">
              <Text fontWeight="bold">{config.label}:</Text>{' '}
              <Text color="grey80">{settings[config.key] || 'Not set'}</Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsPage;
