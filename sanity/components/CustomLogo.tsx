import { defineConfig, LogoProps } from 'sanity';
import { Text } from '@sanity/ui';
// import { SiteLogo } from '@svg';
import styles from '@styles/studio/components/CustomLogo.module.css';

export default function CustomLogo(props: LogoProps) {
  return (
    <>
      <Text>{props.title}</Text>
      {/* <Text className="visually-hidden">{props.title}</Text> */}
      {/* <SiteLogo styles={{
        height: '25px',
        fill: 'var(--card-fg-color)'
      }} /> */}
    </>
  );
}
