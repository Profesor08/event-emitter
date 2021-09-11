# EventEmitter

Helper class for easy events management

## Examples

```typescript
class MyClass extends EventEmitter<"open"> {}
```

```typescript
class MyClass extends EventEmitter<"open" | "close", MyClass> {
  constructor() {
    super();
  }

  open() {
    this.dispatch("open", this);
  }

  close() {
    this.dispatch("close", this);
  }
}

const obj = new MyClass();

const onOpen = () => {
  obj.off("open", onOpen);
};

obj.on("open", onOpen);

obj.once("close", () => {});
```
