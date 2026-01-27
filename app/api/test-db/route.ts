import { NextResponse } from 'next/server'
import pool from '@/lib/db'

// Test database connection
export async function GET() {
  try {
    const result = await pool.query('SELECT NOW() as time, version() as version')
    
    // Test if tables exist
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `)
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful!',
      data: {
        time: result.rows[0].time,
        version: result.rows[0].version,
        tables: tablesResult.rows.map(row => row.table_name)
      }
    })
  } catch (error: any) {
    console.error('Database connection error:', error)
    return NextResponse.json({
      success: false,
      error: 'Database connection failed',
      details: error.message
    }, { status: 500 })
  }
}
