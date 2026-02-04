-- Enable RLS for storage.objects (usually enabled by default)
-- But we need policies for the bucket 'player-images'

-- 1. Allow Public Read Access
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'player-images' );

-- 2. Allow Authenticated Uploads
create policy "Authenticated Uploads"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'player-images' );

-- 3. Allow Authenticated Updates
create policy "Authenticated Updates"
on storage.objects for update
to authenticated
using ( bucket_id = 'player-images' );

-- 4. Allow Authenticated Deletes
create policy "Authenticated Deletes"
on storage.objects for delete
to authenticated
using ( bucket_id = 'player-images' );
