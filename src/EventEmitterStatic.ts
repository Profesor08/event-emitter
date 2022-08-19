export class EventEmitterStatic {
  protected static events: {
    [key in string]?: ((data: void) => void)[];
  } = {};

  private static attachEvent(event: string, callback: (data: void) => void) {
    if (this.events[event]?.push(callback) === undefined) {
      this.events[event] = [callback];
    }
  }

  public static on(event: string, callback: (data: void) => void) {
    this.attachEvent(event, callback);
  }

  public static off(event: string, callback: (data: void) => void) {
    if (this.events[event]) {
      this.events[event] = this.events[event]?.filter((c) => c !== callback);
    }
  }

  public static once(event: string, callback: (data: void) => void) {
    const onceHandler = (data: void) => {
      this.off(event, onceHandler);
      callback(data);
    };

    this.attachEvent(event, onceHandler);
  }

  public static dispatch(event: string, data: void) {
    this.events[event]?.forEach((callback) => {
      callback(data);
    });
  }
}
