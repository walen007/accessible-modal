export interface IEvent {
  data: unknown;
}

export const createCustomEvent = (customEvent: string): CustomEvent => {
  return new CustomEvent(customEvent);
};
