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

    // Handle short threat strings separately (e.g., 1-2 characters)
    const threatLength = threat.length;
    let queryCondition = `name.ilike.%${threat}%,description.ilike.%${threat}%`;

    if (threatLength <= 2) {
      // For short strings, do an exact match search first
      queryCondition = `name.ilike.%${threat}%`;
      console.log(queryCondition)
    }

    // Exact Match Query
    const { data: exactMatchData, error: exactMatchError } = await supabase
      .from('aptData')
      .select('name, description, category')
      .or(queryCondition);

    if (exactMatchError) {
      console.error('Supabase error (exact match):', exactMatchError.message);
      return NextResponse.json({ message: exactMatchError.message }, { status: 500 });
    }

    // Other Results Query
    const { data: otherResultsData, error: otherResultsError } = await supabase
      .from('aptData')
      .select('name, description, category')
      .limit(10);

    if (otherResultsError) {
      console.error('Supabase error (other results):', otherResultsError.message);
      return NextResponse.json({ message: otherResultsError.message }, { status: 500 });
    }

    // Filter Results
    const filteredOtherResults = exactMatchData && exactMatchData.length > 0 
      ? otherResultsData?.filter((item) => item.name !== exactMatchData[0]?.name)
      : otherResultsData;

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
