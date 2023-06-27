import { NavbarProps, useWorkspace } from 'sanity';

import { Card, Stack, Text, Flex } from '@sanity/ui';

export default function CustomNavbar(props: NavbarProps) {
  const { dataset } = useWorkspace();

  return (
    <Stack>
      <Card padding={3} tone="primary">
        <Flex justify="space-between">
          <Text size={1}>
            Using the <b>{dataset}</b> dataset
          </Text>
          <Text size={1} as="a" href={'/'}>
            Back to site &rarr;
          </Text>
        </Flex>
      </Card>
      {props.renderDefault(props)} {/* Render the default navbar */}
    </Stack>
  );
}
