import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrbitalService {
  /**
   * Calculate planet X position on orbit
   * @param centerX - SVG center X coordinate
   * @param distance - Distance from center
   * @param angle - Current angle in degrees
   */
  calculatePlanetX(centerX: number, distance: number, angle: number): number {
    return centerX + distance * Math.cos((angle * Math.PI) / 180);
  }

  /**
   * Calculate planet Y position on orbit
   * @param centerY - SVG center Y coordinate
   * @param distance - Distance from center
   * @param angle - Current angle in degrees
   */
  calculatePlanetY(centerY: number, distance: number, angle: number): number {
    return centerY + distance * Math.sin((angle * Math.PI) / 180);
  }

  /**
   * Calculate new angle based on elapsed time and speed
   * @param elapsedTime - Time in milliseconds
   * @param speed - Speed multiplier (0.5-1.2)
   */
  calculateAngle(elapsedTime: number, speed: number): number {
    // Formula: 360 degrees per ~50 seconds at speed 1.0
    // Adjusted for different speeds
    return ((elapsedTime / (1000 / speed)) % 360);
  }

  /**
   * Get distance between two points
   */
  getDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  /**
   * Get angle between two points
   */
  getAngleBetweenPoints(x1: number, y1: number, x2: number, y2: number): number {
    return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  }
}
