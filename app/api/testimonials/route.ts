import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

// GET all testimonials
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') // 'approved', 'pending', or null for all
    
    let query = 'SELECT * FROM testimonials'
    const params: string[] = []
    
    if (status && status !== 'all') {
      query += ' WHERE status = $1'
      params.push(status)
    }
    
    query += ' ORDER BY created_at DESC'
    
    const result = await pool.query(query, params)
    
    return NextResponse.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch testimonials'
    }, { status: 500 })
  }
}

// POST new testimonial
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      name, 
      position, 
      company, 
      content, 
      rating, 
      image, 
      status = 'pending' 
    } = body
    
    // Validation
    if (!name || !content) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: name, content'
      }, { status: 400 })
    }
    
    if (rating && (rating < 1 || rating > 5)) {
      return NextResponse.json({
        success: false,
        error: 'Rating must be between 1 and 5'
      }, { status: 400 })
    }
    
    const query = `
      INSERT INTO testimonials (name, position, company, content, rating, image, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `
    
    const result = await pool.query(query, [
      name,
      position || null,
      company || null,
      content,
      rating || 5,
      image || null,
      status
    ])
    
    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'Testimonial created successfully'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create testimonial'
    }, { status: 500 })
  }
}
