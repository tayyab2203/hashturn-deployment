import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

// GET single testimonial
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    
    const result = await pool.query(
      'SELECT * FROM testimonials WHERE id = $1',
      [parseInt(id)]
    )
    
    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Testimonial not found'
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error fetching testimonial:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch testimonial'
    }, { status: 500 })
  }
}

// PUT update testimonial
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await request.json()
    
    const updates: string[] = []
    const values: any[] = []
    let paramCount = 1
    
    const fields = ['name', 'position', 'company', 'content', 'rating', 'image', 'status']
    
    fields.forEach(field => {
      if (body[field] !== undefined) {
        updates.push(`${field} = $${paramCount++}`)
        values.push(body[field])
      }
    })
    
    if (updates.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No fields to update'
      }, { status: 400 })
    }
    
    values.push(parseInt(id))
    
    const query = `
      UPDATE testimonials
      SET ${updates.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `
    
    const result = await pool.query(query, values)
    
    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Testimonial not found'
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'Testimonial updated successfully'
    })
  } catch (error) {
    console.error('Error updating testimonial:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to update testimonial'
    }, { status: 500 })
  }
}

// DELETE testimonial
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    
    const result = await pool.query(
      'DELETE FROM testimonials WHERE id = $1 RETURNING *',
      [parseInt(id)]
    )
    
    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Testimonial not found'
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: true,
      message: 'Testimonial deleted successfully',
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to delete testimonial'
    }, { status: 500 })
  }
}
