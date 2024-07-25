import { Driver as DriverType } from '@/app/types';

export function isValidDriver(driver: Partial<DriverType>): string | null {
  if (!driver.name || typeof driver.name !== 'string') {
    return 'Invalid or missing name';
  }

  if (!driver.route || typeof driver.route !== 'string') {
    return 'Invalid or missing route';
  }

  if (!driver.shuttle_number || typeof driver.shuttle_number !== 'string') {
    return 'Invalid or missing shuttle_number';
  }

  if (driver.shift_start && typeof driver.shift_start !== 'string') {
    return 'Invalid shift_start';
  }

  if (driver.shift_end && typeof driver.shift_end !== 'string') {
    return 'Invalid shift_end';
  }

  if (driver.location) {
    if (typeof driver.location !== 'object') {
      return 'Invalid location data';
    }
    if (typeof driver.location.lat !== 'number' || typeof driver.location.lng !== 'number') {
      return 'Invalid latitude or longitude';
    }
  }

  return null;
}
