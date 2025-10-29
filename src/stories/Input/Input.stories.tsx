import type { Meta, StoryObj } from '@storybook/react';
import Input from '../../components/Input/Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'number'],
      description: 'The type of input field',
    },
    clearable: {
      control: 'boolean',
      description: 'Whether the input has a clear button',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    type: 'text',
    clearable: false,
  },
};

export const TextClearable: Story = {
  args: {
    type: 'text',
    clearable: true,
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    clearable: false,
  },
};

export const PasswordClearable: Story = {
  args: {
    type: 'password',
    clearable: true,
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    clearable: false,
  },
};

export const NumberClearable: Story = {
  args: {
    type: 'number',
    clearable: true,
  },
};

