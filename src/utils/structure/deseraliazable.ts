export interface Deserializable<T> {
  serialize?: () => T;
  deserialize(input: T): this;
}
