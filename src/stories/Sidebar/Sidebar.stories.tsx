import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Sidebar, { type SidebarItem } from '../../components/Sidebar/Sidebar';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the sidebar is open',
    },
    title: {
      control: 'text',
      description: 'Title text displayed in the sidebar header',
    },
    onClose: {
      action: 'closed',
      description: 'Callback function when sidebar is closed',
    },
    providedItems: {
      control: 'object',
      description: 'Custom menu items array',
    },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component to handle state
const SidebarWrapper = (args: { isOpen: boolean; title?: string; providedItems?: SidebarItem[] }) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);
  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        style={{ padding: '10px', margin: '20px', cursor: 'pointer' }}
      >
        Open Sidebar
      </button>
      <Sidebar 
        {...args} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
};

export const Default: Story = {
  render: (args) => <SidebarWrapper {...args} isOpen={true} />,
  args: {
    isOpen: true,
    title: 'Menu',
    onClose: () => {},
  },
};
