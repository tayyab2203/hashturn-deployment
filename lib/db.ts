import { Pool } from 'pg'

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Alternative: use individual environment variables
  // user: process.env.POSTGRES_USER,
  // password: process.env.POSTGRES_PASSWORD,
  // host: process.env.POSTGRES_HOST,
  // port: parseInt(process.env.POSTGRES_PORT || '5432'),
  // database: process.env.POSTGRES_DATABASE,
})

// Test connection on startup
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database')
})

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err)
  process.exit(-1)
})

export default pool
