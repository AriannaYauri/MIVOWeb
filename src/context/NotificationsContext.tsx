import React, { createContext, useContext, useState, useEffect } from 'react';

interface Notification {
  id: number;
  type: 'danger' | 'warning';
  title: string;
  message: string;
  time: string;
}

interface NotificationsContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: number) => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  useEffect(() => {
    // Simular notificaciones periódicas
    const interval = setInterval(() => {
      const random = Math.random();
      if (random > 0.7) {
        addNotification({
          type: 'warning',
          title: 'Nueva alerta climática',
          message: 'Se pronostican lluvias intensas en tu zona',
          time: 'ahora'
        });
      }
    }, 300000); // Cada 5 minutos

    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
}