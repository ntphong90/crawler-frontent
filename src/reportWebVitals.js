const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
      onINP(onPerfEntry); // Use onINP instead of getINP
      onFCP(onPerfEntry);
    });
  }
};
export default reportWebVitals;
