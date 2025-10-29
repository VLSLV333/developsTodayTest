import type { Meta, StoryObj } from '@storybook/react';
import Toast from '../../components/Toast/Toast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'The text content displayed in the toast',
    },
    fadeTimeSec: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Time in seconds before the toast starts to fade out',
    },
    type: {
      control: 'select',
      options: ['fade', 'slide'],
      description: 'Animation type for toast appearance and disappearance',
    },
    closeBtn: {
      control: 'boolean',
      description: 'Whether to show a close button',
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FadeDefault: Story = {
  args: {
    text: 'This is a default fade toast message',
    fadeTimeSec: 2,
    type: 'fade',
    closeBtn: false,
    color: 'notification'
  },
};

export const FadeWithCloseButton: Story = {
  args: {
    text: 'Fade toast with close button',
    fadeTimeSec: 5,
    type: 'fade',
    closeBtn: true,
    color: 'notification'
  },
};

export const FadeShortDuration: Story = {
  args: {
    text: 'Quick fade notification',
    fadeTimeSec: 1,
    type: 'fade',
    closeBtn: false,
    color: 'error'
  },
};

export const FadeLongDuration: Story = {
  args: {
    text: 'This message will stay visible for a longer time',
    fadeTimeSec: 10,
    type: 'fade',
    closeBtn: true,
    color: 'error'
  },
};

export const SlideDefault: Story = {
  args: {
    text: 'This is a slide animation toast',
    fadeTimeSec: 2,
    type: 'slide',
    closeBtn: false,
    color: 'success'
  },
};

export const SlideWithCloseButton: Story = {
  args: {
    text: 'Slide toast with close button',
    fadeTimeSec: 5,
    type: 'slide',
    closeBtn: true,
    color: 'success'
  },
};

export const SlideShortDuration: Story = {
  args: {
    text: 'Quick slide notification',
    fadeTimeSec: 1,
    type: 'slide',
    closeBtn: false,
    color: 'success'
  },
};

export const SlideLongDuration: Story = {
  args: {
    text: 'Long-lasting slide notification',
    fadeTimeSec: 10,
    type: 'slide',
    closeBtn: true,
    color: 'notification'
  },
};

export const SuccessMessage: Story = {
  args: {
    text: '✓ Success! Your changes have been saved.',
    fadeTimeSec: 2,
    type: 'fade',
    closeBtn: true,
    color: 'success'
  },
};

export const ErrorMessage: Story = {
  args: {
    text: '✗ Error: Something went wrong. Please try again.',
    fadeTimeSec: 2,
    type: 'slide',
    closeBtn: true,
    color: 'error'
  },
};

export const NotificationMessage: Story = {
  args: {
    text: 'Please, login to view that content',
    fadeTimeSec: 2,
    type: 'slide',
    closeBtn: true,
    color: 'notification'
  },
};

