import siteInfo from '@lib/siteInfo';
import { NavItem } from '@components/nav';

const NavList = ({ className, itemClassName }) => {
  return (
    <ol className={className}>
      {siteInfo.nav.map((item, index) => {
        return (
          <NavItem path={item.path} className={itemClassName} key={`nav-item-${index}`}>
            {item.label}
          </NavItem>
        );
      })}
    </ol>
  );
};

export default NavList;
