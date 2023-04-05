export const gtagEvent = (eventName: string, eventParams?: object = {}) => {
  if (typeof gtag === 'function') {
    gtag('event', eventName, eventParams);
  }
};
