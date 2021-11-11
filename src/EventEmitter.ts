import { EventEmitterStatic } from "./EventEmitterStatic";

export class EventEmitter<
  EventType extends string,
  EventData = void,
> extends EventEmitterStatic {
  protected events: {
    [key in EventType]?: ((data: EventData) => void)[];
  } = {};

  private attachEvent(event: EventType, callback: (data: EventData) => void) {
    if (this.events[event]?.push(callback) === undefined) {
      this.events[event] = [callback];
    }
  }

  public on(event: EventType, callback: (data: EventData) => void) {
    this.attachEvent(event, callback);
  }

  public off(event: EventType, callback: (data: EventData) => void) {
    if (this.events[event]) {
      this.events[event] = this.events[event]?.filter((c) => c !== callback);
    }
  }

  public once(event: EventType, callback: (data: EventData) => void) {
    const onceHandler = (data: EventData) => {
      this.off(event, onceHandler);
      callback(data);
    };

    this.attachEvent(event, onceHandler);
  }

  public dispatch(event: EventType, data: EventData) {
    this.events[event]?.forEach((callback) => {
      callback(data);
    });
  }
}
