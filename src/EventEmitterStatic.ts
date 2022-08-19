export abstract class EventEmitterStatic {
  protected static events: {
    [key in string]?: ((data: any) => void)[];
  } = {};

  private static attachEvent(event: string, callback: (data: any) => void) {
    if (this.events[event]?.push(callback) === undefined) {
      this.events[event] = [callback];
    }
  }

  public static on(event: string, callback: (data: any) => void) {
    this.attachEvent(event, callback);
  }

  public static off(event: string, callback: (data: any) => void) {
    if (this.events[event]) {
      this.events[event] = this.events[event]?.filter((c) => c !== callback);
    }
  }

  public static once(event: string, callback: (data: any) => void) {
    const onceHandler = (data: any) => {
      this.off(event, onceHandler);
      callback(data);
    };

    this.attachEvent(event, onceHandler);
  }

  public static dispatch(event: string, data: any) {
    this.events[event]?.forEach((callback) => {
      callback(data);
    });
  }
}
