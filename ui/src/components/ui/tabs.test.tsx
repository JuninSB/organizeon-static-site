import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

describe('Tabs motion state', () => {
  it('moves the active state and mounts the panel animation hook on selection', async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="overview">
        <TabsList aria-label="Sections">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Overview panel</TabsContent>
        <TabsContent value="settings">Settings panel</TabsContent>
      </Tabs>,
    );

    const overviewTab = screen.getByRole('tab', { name: 'Overview' });
    const settingsTab = screen.getByRole('tab', { name: 'Settings' });
    expect(overviewTab).toHaveAttribute('data-active');
    expect(overviewTab).toHaveAttribute('aria-selected', 'true');

    await user.click(settingsTab);
    expect(settingsTab).toHaveAttribute('data-active');
    expect(settingsTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Settings panel').closest('[data-slot="tabs-content"]')).toHaveClass('d3-tabs-panel');
  });
});
