import { createCustomEvent } from '.';

describe('createCustomEvent', () => {
  it('should create a CustomEvent with the given event type', () => {
    const eventType = 'test-event';
    const event = createCustomEvent(eventType);

    expect(event).toBeInstanceOf(CustomEvent);
    expect(event.type).toBe(eventType);
  });
});
