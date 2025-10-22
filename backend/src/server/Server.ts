import express, { Application } from 'express';
import cors from 'cors';
import Database from '../database/Database';
import taskRoutes from '../routes/taskRoutes';
import { config } from '../config';

class Server {
  private app: Application;
  private port: number;
  private database: Database;

  constructor() {
    this.app = express();
    this.port = config.server.port;
    this.database = Database.getInstance();
    
    this.configureMiddlewares();
    this.configureRoutes();
  }

  private configureMiddlewares(): void {
    this.app.use(cors());
    this.app.use((express as any).json());
    this.app.use((express as any).urlencoded({ extended: true }));
  }

  private configureRoutes(): void {
    this.app.use('/api', taskRoutes);
    
    // Health check endpoint
    this.app.get('/health', (req: any, res: any) => {
      res.json({ status: 'OK', timestamp: new Date().toISOString() });
    });
  }

  private async initializeDatabase(): Promise<void> {
    await this.database.ensureTablesExist();
    console.log('✓ Base de datos inicializada');
  }

  public async start(): Promise<void> {
    try {
      await this.initializeDatabase();
      
      this.app.listen(this.port, () => {
        console.log(`✓ Servidor corriendo en puerto ${this.port}`);
        console.log(`✓ Entorno: ${config.server.nodeEnv}`);
      });
    } catch (error) {
      console.error('Error al iniciar el servidor:', error);
      process.exit(1);
    }
  }

  public getApp(): Application {
    return this.app;
  }
}

export default Server;
