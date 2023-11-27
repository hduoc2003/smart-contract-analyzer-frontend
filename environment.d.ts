declare global {
    namespace NodeJS {
      interface ProcessEnv {
        SERVER_BASE_API: string
        SERVER_BASE_URL: string
      }
    }
  }
