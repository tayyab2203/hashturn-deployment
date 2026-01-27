-- Check what columns actually exist in testimonials table

SELECT 
  column_name, 
  data_type,
  character_maximum_length,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'testimonials' 
ORDER BY ordinal_position;
