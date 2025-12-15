-- Add new columns to the items table
ALTER TABLE public.items
ADD COLUMN IF NOT EXISTS default_quantity integer DEFAULT 1;

ALTER TABLE public.items
ADD COLUMN IF NOT EXISTS units VARCHAR(50);

ALTER TABLE public.items
ADD COLUMN IF NOT EXISTS price numeric(10,2);

ALTER TABLE public.items
ADD COLUMN IF NOT EXISTS image text;

-- Add units column to pooja_items table
ALTER TABLE public.pooja_items
ADD COLUMN IF NOT EXISTS units VARCHAR(50);