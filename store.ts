export class Store {
  private data: Record<string, any> = {};

  storeValue(key: string, value: any): void {
    if (!this.isSerializable(value)) {
      throw new Error('Value not serializable');
    }

    const keys = key.split('.');
    let currentObject = this.data;

    for (let i = 0; i < keys.length - 1; i++) {
      const nestedKey = keys[i];
      if (!currentObject[nestedKey]) {
        currentObject[nestedKey] = {};
      }
      currentObject = currentObject[nestedKey];
    }

    const finalKey = keys[keys.length - 1];
    currentObject[finalKey] = value;
  }

  getValue(key: string): any {
    const keys = key.split('.');
    let currentObject = this.data;

    for (const nestedKey of keys) {
      if (!currentObject) {
        return undefined;
      }
      currentObject = currentObject[nestedKey];
    }

    return currentObject;
  }

  listEntries(): Record<string, any> {
    return this.data;
  }

  toJSON(): string {
    return JSON.stringify(this.data);
  }

  private isSerializable(value: any): boolean {
    try {
      JSON.stringify(value);
      return true;
    } catch {
      return false;
    }
  }
}

