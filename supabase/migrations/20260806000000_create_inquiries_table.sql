-- Create inquiries table for TAEMUN DEV STUDIO (taemun.net)
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  services TEXT[] NOT NULL,
  budget TEXT NOT NULL,
  timeline TEXT NOT NULL,
  client_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  reference_url TEXT,
  details TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit an inquiry
CREATE POLICY "Anyone can insert inquiry" ON public.inquiries
  FOR INSERT TO authenticated, anon
  WITH CHECK (true);

-- Allow admins/service role to select inquiries
CREATE POLICY "Service role full access on inquiries" ON public.inquiries
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);
