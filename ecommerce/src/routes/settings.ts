import { Router, Request, Response } from 'express';
import { Setting } from '../db/index.js';

const router = Router();

/**
 * GET /api/settings
 * Get all settings
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const settings = await Setting.findAll({
      attributes: ['id', 'key', 'value', 'description'],
    });

    res.json({
      success: true,
      data: settings.map((setting) => setting.toJSON()),
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch settings',
    });
  }
});

/**
 * GET /api/settings/:key
 * Get a specific setting by key
 */
router.get('/:key', async (req: Request, res: Response): Promise<void> => {
  try {
    const { key } = req.params;

    const setting = await Setting.findOne({
      where: { key },
    });

    if (!setting) {
      res.status(404).json({
        success: false,
        message: 'Setting not found',
      });
      return;
    }

    res.json({
      success: true,
      data: setting.toJSON(),
    });
  } catch (error) {
    console.error('Error fetching setting:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch setting',
    });
  }
});

/**
 * PUT /api/settings
 * Update multiple settings
 */
router.put('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { settings } = req.body;

    if (!settings || typeof settings !== 'object') {
      res.status(400).json({
        success: false,
        message: 'Invalid settings data',
      });
      return;
    }

    // Update or create each setting
    const promises = Object.entries(settings).map(async ([key, value]) => {
      const [setting, created] = await Setting.findOrCreate({
        where: { key },
        defaults: {
          key,
          value: String(value),
        },
      });

      if (!created) {
        await setting.update({ value: String(value) });
      }

      return setting;
    });

    await Promise.all(promises);

    res.json({
      success: true,
      message: 'Settings updated successfully',
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update settings',
    });
  }
});

/**
 * PUT /api/settings/:key
 * Update a specific setting
 */
router.put('/:key', async (req: Request, res: Response): Promise<void> => {
  try {
    const { key } = req.params;
    const { value, description } = req.body;

    if (!value) {
      res.status(400).json({
        success: false,
        message: 'Value is required',
      });
      return;
    }

    const [setting, created] = await Setting.findOrCreate({
      where: { key },
      defaults: {
        key,
        value: String(value),
        description,
      },
    });

    if (!created) {
      await setting.update({
        value: String(value),
        ...(description && { description }),
      });
    }

    res.json({
      success: true,
      data: setting.toJSON(),
      message: created ? 'Setting created successfully' : 'Setting updated successfully',
    });
  } catch (error) {
    console.error('Error updating setting:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update setting',
    });
  }
});

/**
 * DELETE /api/settings/:key
 * Delete a specific setting
 */
router.delete('/:key', async (req: Request, res: Response): Promise<void> => {
  try {
    const { key } = req.params;

    const setting = await Setting.findOne({
      where: { key },
    });

    if (!setting) {
      res.status(404).json({
        success: false,
        message: 'Setting not found',
      });
      return;
    }

    await setting.destroy();

    res.json({
      success: true,
      message: 'Setting deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting setting:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete setting',
    });
  }
});

export default router;
