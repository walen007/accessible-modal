import { cleanup, render } from '@testing-library/react';
import { afterEach } from 'vitest';

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

afterEach(() => {
  cleanup();
});

function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    wrapper: ({ children }) => children,
    ...options,
  });
}

// override render export
export { customRender as render };
