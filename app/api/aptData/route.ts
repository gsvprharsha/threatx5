import { NextRequest, NextResponse } from 'next/server'; 
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or key is not defined in environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const name = searchParams.get('name');

    if (!category || !name) {
      return NextResponse.json({ message: 'Category and name are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('aptData')
      .select('name, status, category, threatLevel, toolsUsed, notableIncidents, x5Code, aptLogo, dateDiscovered')
      .eq('category', category)
      .eq('name', name);

    if (error) {
      console.error('Supabase error:', error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      console.log('No data found for the given category and name');  // Debug message
      return NextResponse.json({ message: 'No matching data found' }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    console.error('Error querying Supabase:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}