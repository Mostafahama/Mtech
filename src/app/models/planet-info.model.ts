export interface Planet {
  id: string;                    // 'techno' | 'online' | 'code' | 'msquare' | 'digital'
  name: string;                  // 'Techno Square', 'Online Platform', etc.
  logo: string;                  // Path to brand logo: 'assets/Techno.jpeg'
  color: string;                 // Hex color: '#0066FF'
  angle: number;                 // Current rotation angle (0-360)
  distance: number;              // Distance from center (250-320px)
  speed: number;                 // Orbital speed multiplier (0.5-1.2)
  size: number;                  // Planet radius (58-62px)
  description: string;           // Brand description (50-100 chars)
  established: string;           // Year established
  stats: {
    students?: number;
    projects?: number;
    clients?: number;
    conferences?: number;
    campaigns?: number;
  };
  cta: {
    primary: string;             // 'Learn More', 'View Portfolio', etc.
    secondary: string;           // 'Contact Us', 'Explore', etc.
  };
}

export interface OrbitalConfig {
  centerX: number;               // 600 (SVG center)
  centerY: number;               // 600 (SVG center)
  orbitRadius1: number;          // 250px (Inner orbit)
  orbitRadius2: number;          // 310px (Middle orbit)
  orbitRadius3: number;          // 320px (Outer orbit)
  animationSpeed: number;        // Multiplier (0.1-2.0)
  isAnimating: boolean;          // Play/pause state
}
