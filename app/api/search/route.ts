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
    const threat = searchParams.get('threat'); 

    if (!threat) {
      return NextResponse.json({ message: 'No threat parameter provided' }, { status: 400 });
    }

    const { data: exactMatchData, error: exactMatchError } = await supabase
      .from('aptData')
      .select('name, description, category')
      .ilike('name', `%${threat}%`)
      .ilike('description', `%${threat}%`);

    if (exactMatchError) {
      console.error('Supabase error (exact match):', exactMatchError.message);
      return NextResponse.json({ message: exactMatchError.message }, { status: 500 });
    }

    const { data: otherResultsData, error: otherResultsError } = await supabase
      .from('aptData')
      .select('name, description, category') 
      .limit(10);

    if (otherResultsError) {
      console.error('Supabase error (other results):', otherResultsError.message);
      return NextResponse.json({ message: otherResultsError.message }, { status: 500 });
    }

    if (!exactMatchData || exactMatchData.length === 0) {
      console.log('No exact match found, but returning partial results');
    }

    const filteredOtherResults = otherResultsData?.filter((item) => {
      return item.name !== exactMatchData[0]?.name;
    });


    if (!filteredOtherResults || filteredOtherResults.length === 0) {
      console.log('No other results available');
    }

    const results = {
      exactMatch: exactMatchData || [],
      otherResults: filteredOtherResults || []
    };

    return NextResponse.json(results, { status: 200 });
  } catch (error: unknown) {
    console.error('Error querying Supabase:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}
