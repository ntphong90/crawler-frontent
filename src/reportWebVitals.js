const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
      onINP(onPerfEntry); // Use onINP instead of getINP
      onFCP(onPerfEntry);
      onLCP(onPerfEntry);
      onCLS(onPerfEntry);
      onTTFB(onPerfEntry);
    });
  }
};
export default reportWebVitals;
