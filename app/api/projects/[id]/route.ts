import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

// GET single project by ID or slug
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    
    const isNumeric = /^\d+$/.test(id)
    
    const query = isNumeric
      ? 'SELECT * FROM projects WHERE id = $1'
      : 'SELECT * FROM projects WHERE slug = $1'
    
    const result = await pool.query(query, [isNumeric ? parseInt(id) : id])
    
    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Project not found'
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch project'
    }, { status: 500 })
  }
}

// PUT update project
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
    
    const fields = [
      'title', 'slug', 'description', 'content', 'client', 
      'image', 'tech', 'features', 'results', 'live_url', 'status', 'project_date'
    ]
    
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
      UPDATE projects
      SET ${updates.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `
    
    const result = await pool.query(query, values)
    
    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Project not found'
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'Project updated successfully'
    })
  } catch (error: any) {
    console.error('Error updating project:', error)
    
    if (error.code === '23505') {
      return NextResponse.json({
        success: false,
        error: 'A project with this slug already exists'
      }, { status: 409 })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to update project'
    }, { status: 500 })
  }
}

// DELETE project
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    
    const result = await pool.query(
      'DELETE FROM projects WHERE id = $1 RETURNING *',
      [parseInt(id)]
    )
    
    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Project not found'
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully',
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to delete project'
    }, { status: 500 })
  }
}
