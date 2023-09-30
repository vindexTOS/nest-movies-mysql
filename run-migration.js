const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function runMigrations() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nest',
  });

  try {
    const migrationsDir = path.join(__dirname, 'migrations');
    const migrationFiles = fs.readdirSync(migrationsDir);

    for (const migrationFile of migrationFiles) {
      const migrationFilePath = path.join(migrationsDir, migrationFile);
      const migrationSQL = fs.readFileSync(migrationFilePath, 'utf8');

      console.log(`Running migration: ${migrationFile}`);
      await connection.query(migrationSQL);
      console.log(`Migration completed: ${migrationFile}`);
    }
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    connection.end();
  }
}

runMigrations();
