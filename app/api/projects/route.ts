import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

// GET all projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') // 'active', 'archived', or null for all
    
    let query = 'SELECT * FROM projects'
    const params: string[] = []
    
    if (status && status !== 'all') {
      query += ' WHERE status = $1'
      params.push(status)
    }
    
    query += ' ORDER BY project_date DESC NULLS LAST, created_at DESC'
    
    const result = await pool.query(query, params)
    
    return NextResponse.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch projects'
    }, { status: 500 })
  }
}

// POST new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      title, 
      slug, 
      description, 
      content,
      client, 
      image, 
      tech, 
      features,
      results,
      live_url,
      status = 'active',
      project_date 
    } = body
    
    // Validation
    if (!title || !slug || !description) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: title, slug, description'
      }, { status: 400 })
    }
    
    const query = `
      INSERT INTO projects (
        title, slug, description, content, client, image, tech, 
        features, results, live_url, status, project_date
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `
    
    const result = await pool.query(query, [
      title,
      slug,
      description,
      content || null,
      client || null,
      image || null,
      tech || null,
      features || null,
      results || null,
      live_url || null,
      status,
      project_date || null
    ])
    
    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'Project created successfully'
    }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating project:', error)
    
    if (error.code === '23505') {
      return NextResponse.json({
        success: false,
        error: 'A project with this slug already exists'
      }, { status: 409 })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to create project'
    }, { status: 500 })
  }
}
