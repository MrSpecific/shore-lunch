import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { useAppContext } from '@lib/context/app';

const useNav = () => {
  const { navIsActive, setNavIsActive } = useAppContext();

  if (!document) return {};

  const bodyScrollTarget = document.body;

  const toggleNav = () => {
    setNavIsActive(!navIsActive);
    navIsActive ? enableBodyScroll(bodyScrollTarget) : disableBodyScroll(bodyScrollTarget);
  };

  const openNav = () => {
    setNavIsActive(true);
    enableBodyScroll(bodyScrollTarget);
  };

  const closeNav = () => {
    setNavIsActive(false);
    disableBodyScroll(bodyScrollTarget);
    clearAllBodyScrollLocks();
  };

  return {
    navIsActive,
    setNavIsActive,
    toggleNav,
    openNav,
    closeNav,
  };
};

export default useNav;
