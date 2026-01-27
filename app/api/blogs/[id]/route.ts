import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

// GET single blog by ID or slug
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    
    // Check if id is numeric (ID) or string (slug)
    const isNumeric = /^\d+$/.test(id)
    
    const query = isNumeric
      ? 'SELECT * FROM blogs WHERE id = $1'
      : 'SELECT * FROM blogs WHERE slug = $1'
    
    const result = await pool.query(query, [isNumeric ? parseInt(id) : id])
    
    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Blog not found'
      }, { status: 404 })
    }
    
    // Increment view count
    if (!isNumeric) {
      await pool.query('UPDATE blogs SET views = views + 1 WHERE slug = $1', [id])
    }
    
    return NextResponse.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error fetching blog:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch blog'
    }, { status: 500 })
  }
}

// PUT update blog
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const { title, slug, excerpt, content, author, status, image, tags } = body
    
    // Build dynamic update query
    const updates: string[] = []
    const values: any[] = []
    let paramCount = 1
    
    if (title !== undefined) {
      updates.push(`title = $${paramCount++}`)
      values.push(title)
    }
    if (slug !== undefined) {
      updates.push(`slug = $${paramCount++}`)
      values.push(slug)
    }
    if (excerpt !== undefined) {
      updates.push(`excerpt = $${paramCount++}`)
      values.push(excerpt)
    }
    if (content !== undefined) {
      updates.push(`content = $${paramCount++}`)
      values.push(content)
    }
    if (author !== undefined) {
      updates.push(`author = $${paramCount++}`)
      values.push(author)
    }
    if (status !== undefined) {
      updates.push(`status = $${paramCount++}`)
      values.push(status)
    }
    if (image !== undefined) {
      updates.push(`image = $${paramCount++}`)
      values.push(image)
    }
    if (tags !== undefined) {
      updates.push(`tags = $${paramCount++}`)
      values.push(tags)
    }
    
    if (updates.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No fields to update'
      }, { status: 400 })
    }
    
    values.push(parseInt(id))
    
    const query = `
      UPDATE blogs
      SET ${updates.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `
    
    const result = await pool.query(query, values)
    
    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Blog not found'
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'Blog updated successfully'
    })
  } catch (error: any) {
    console.error('Error updating blog:', error)
    
    if (error.code === '23505') {
      return NextResponse.json({
        success: false,
        error: 'A blog with this slug already exists'
      }, { status: 409 })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to update blog'
    }, { status: 500 })
  }
}

// DELETE blog
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    
    const result = await pool.query(
      'DELETE FROM blogs WHERE id = $1 RETURNING *',
      [parseInt(id)]
    )
    
    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Blog not found'
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully',
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error deleting blog:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to delete blog'
    }, { status: 500 })
  }
}
