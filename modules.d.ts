declare namespace NodeJS {
  export interface ProcessEnv {
    JWT_SECRET: string;
    DATABASE_URL: string;
  }
}
