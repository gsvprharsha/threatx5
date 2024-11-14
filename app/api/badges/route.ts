import { NextResponse } from 'next/server'; 
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!; 

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or key is not defined in environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    const { data, error } = await supabase.from('badges').select('text, urls');

    if (error) {
      console.error('Supabase error:', error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ message: 'No badges found' }, { status: 404 });
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