// Notification service for push notifications
export class NotificationService {
  private static instance: NotificationService;
  private isSupported: boolean = false;
  private isEnabled: boolean = false;

  private constructor() {
    this.isSupported = "Notification" in window && "serviceWorker" in navigator;
    this.checkPermission();
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private checkPermission(): void {
    if (this.isSupported) {
      this.isEnabled = Notification.permission === "granted";
    }
  }

  public async requestPermission(): Promise<boolean> {
    if (!this.isSupported) {
      throw new Error("Notifications are not supported in this browser");
    }

    if (Notification.permission === "granted") {
      this.isEnabled = true;
      return true;
    }

    if (Notification.permission === "denied") {
      return false;
    }

    const permission = await Notification.requestPermission();
    this.isEnabled = permission === "granted";
    return this.isEnabled;
  }

  public async sendNotification(
    title: string,
    options?: NotificationOptions,
  ): Promise<void> {
    if (!this.isEnabled) {
      throw new Error("Notifications are not enabled");
    }

    const defaultOptions: NotificationOptions = {
      icon: "/icon.svg",
      badge: "/icon.svg",
      vibrate: [200, 100, 200],
      ...options,
    };

    new Notification(title, defaultOptions);
  }

  public async sendTestNotification(): Promise<void> {
    await this.sendNotification("Trace", {
      body: "Push notifications are working! 🎉",
      icon: "/icon.svg",
      tag: "test-notification",
    });
  }

  public isNotificationSupported(): boolean {
    return this.isSupported;
  }

  public isNotificationEnabled(): boolean {
    return this.isEnabled;
  }

  public getPermissionStatus(): NotificationPermission {
    return Notification.permission;
  }
}

export const notificationService = NotificationService.getInstance();
