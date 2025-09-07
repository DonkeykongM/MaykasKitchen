import React, { useEffect, useState } from 'react';

// Mobile-specific optimizations and features
export const MobileViewportFix: React.FC = () => {
  useEffect(() => {
    // Fix viewport height on mobile devices
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight, { passive: true });
    window.addEventListener('orientationchange', setViewportHeight, { passive: true });

    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);

  return null;
};

// Touch gesture optimization for mobile
export const TouchOptimizations: React.FC = () => {
  useEffect(() => {
    // Improve touch scrolling performance
    const preventPinchZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Add touch-action CSS for better scrolling
    document.body.style.touchAction = 'pan-y';
    
    // Prevent accidental zoom on double-tap
    let lastTouchEnd = 0;
    const preventZoom = (e: TouchEvent) => {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    document.addEventListener('touchend', preventZoom, { passive: false });
    document.addEventListener('touchstart', preventPinchZoom, { passive: false });

    return () => {
      document.removeEventListener('touchend', preventZoom);
      document.removeEventListener('touchstart', preventPinchZoom);
    };
  }, []);

  return null;
};

// Mobile performance monitor
export const MobilePerformanceMonitor: React.FC = () => {
  const [connectionType, setConnectionType] = useState<string>('unknown');

  useEffect(() => {
    // Monitor network connection
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      setConnectionType(connection.effectiveType || 'unknown');

      const updateConnectionInfo = () => {
        setConnectionType(connection.effectiveType || 'unknown');
        
        // Adjust quality based on connection
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
          // Reduce image quality and disable non-essential animations
          document.body.classList.add('low-bandwidth');
        } else {
          document.body.classList.remove('low-bandwidth');
        }
      };

      connection.addEventListener('change', updateConnectionInfo);
      updateConnectionInfo();

      return () => {
        connection.removeEventListener('change', updateConnectionInfo);
      };
    }
  }, []);

  // Battery API optimization
  useEffect(() => {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBatteryStatus = () => {
          if (battery.level < 0.2) {
            // Reduce animations and effects when battery is low
            document.body.classList.add('low-battery');
          } else {
            document.body.classList.remove('low-battery');
          }
        };

        battery.addEventListener('levelchange', updateBatteryStatus);
        updateBatteryStatus();
      });
    }
  }, []);

  return null;
};

// Combine all mobile optimizations
export const MobileOptimizations: React.FC = () => {
  return (
    <>
      <MobileViewportFix />
      <TouchOptimizations />
      <MobilePerformanceMonitor />
    </>
  );
};