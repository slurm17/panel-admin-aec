// global.d.ts o en src/custom.d.ts
interface Window {
  api: {
    getHelloMessage: () => Promise<{ message: string }>;
  };
}
