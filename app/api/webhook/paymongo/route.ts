import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

export async function POST(req: Request) {
  const body = await req.text()
  const payload = JSON.parse(body)

  const eventType = payload.data?.attributes?.type
  console.log('Webhook event:', eventType)

  if (
    eventType === 'link.payment.paid' ||
    eventType === 'payment.paid'
  ) {
    const metadata = payload.data?.attributes?.data?.attributes?.metadata
    const userId = metadata?.user_id

    console.log('Upgrading user:', userId)

    if (userId) {
      const { error } = await supabase
        .from('profiles')
        .update({ plan: 'pro' })
        .eq('id', userId)

      console.log('Upgrade result:', error)
    }
  }

  return NextResponse.json({ received: true })
}
