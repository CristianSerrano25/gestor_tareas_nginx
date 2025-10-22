declare const process: any;

declare module 'pg' {
  export class Pool {
    constructor(config: any);
    query(sql: string, values?: any[]): Promise<any>;
    query<T = any>(sql: string, values?: any[]): Promise<{ rows: T[]; rowCount: number | null }>;
    end(): Promise<void>;
  }
}

declare module 'dotenv' {
  export function config(): void;
}

declare module 'cors';

declare module 'express' {
  export interface Request {
    body: any;
    params: any;
    query: any;
  }
  export interface Response {
    json(data: any): Response;
    status(code: number): Response;
    send(data?: any): Response;
  }
  export interface Application {
    use(...args: any[]): Application;
    get(path: string, ...handlers: any[]): Application;
    post(path: string, ...handlers: any[]): Application;
    put(path: string, ...handlers: any[]): Application;
    delete(path: string, ...handlers: any[]): Application;
    listen(port: number, callback?: () => void): any;
  }
  export interface Router {
    get(path: string, ...handlers: any[]): Router;
    post(path: string, ...handlers: any[]): Router;
    put(path: string, ...handlers: any[]): Router;
    delete(path: string, ...handlers: any[]): Router;
  }
  export function Router(): Router;
  
  interface Express extends Application {
    json(): any;
    urlencoded(options: any): any;
  }
  
  function express(): Express;
  export default express;
}
