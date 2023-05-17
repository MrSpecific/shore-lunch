import { useState } from 'react';
import { definePlugin, ToolMenuProps, ToolLink } from 'sanity';
import { Button, Flex, Card, Stack, Text } from '@sanity/ui';
import { DownloadIcon } from '@sanity/icons';
import syncProductsToSanity from '@lib/stripe/syncProductsToSanity';

const SyncButton = (props) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await fetch('/api/sync_products');
    setLoading(false);
  };

  return (
    <Card padding={4}>
      <Button onClick={handleClick}>{loading ? 'Syncing...' : `Sync products from Stripe`}</Button>
    </Card>
  );
};

const syncButtonTool = () => {
  return {
    title: 'Sync',
    name: 'sync',
    icon: DownloadIcon,
    component: SyncButton,
  };
};

export const syncButton = definePlugin({
  tools: [syncButtonTool()],
});
