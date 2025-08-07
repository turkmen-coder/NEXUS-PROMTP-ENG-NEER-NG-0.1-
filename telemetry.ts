export const telemetry = {
  startup: () => console.log('📊 Telemetry system started'),
  span: (name: string, fn: () => Promise<any>) => {
    const start = Date.now();
    return fn().finally(() => {
      const dur = Date.now() - start;
      console.log(`⏱️ ${name} completed in ${dur}ms`);
    });
  },
  record: (data: Record<string, any>) => console.log('📈 Metrics:', data)
};
